import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, adventureFormSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { sendContactEmail, sendAdventureEmail } from "./emailService";
import fetch from "node-fetch";
import { authenticate, authorize, login, register, logout } from "./auth";
import csrf from 'csurf';
import { createHash } from 'crypto';
import DOMPurify from 'dompurify';
import rateLimit from "express-rate-limit";

// Weatherstack API response interfaces
interface WeatherstackError {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
}

interface WeatherstackSuccess {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
  };
}

type WeatherstackResponse = WeatherstackSuccess | WeatherstackError;

// Determine if we're in development mode without a database
const isDevelopmentNoDb = process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL;

// Create more specific rate limiters for sensitive endpoints
const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 form submissions per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many form submissions from this IP, please try again after an hour'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

// Helper function to sanitize user input
const sanitizeInput = (input: string): string => {
  if (!input) return input;
  // Remove any potentially dangerous content
  return DOMPurify.sanitize(input).trim();
};

// Helper function to hash API keys for logging
const hashForLogging = (value: string): string => {
  return createHash('sha256').update(value).digest('hex').substring(0, 8) + '...';
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const router = express.Router();
  
  // Setup CSRF protection
  const csrfProtection = csrf({ cookie: true });
  
  // Apply CSRF protection to all routes that need it
  const csrfRoutes = express.Router();
  csrfRoutes.use(csrfProtection);

  // Authentication routes
  router.post("/auth/login", authLimiter, login);
  router.post("/auth/register", authLimiter, register);
  router.post("/auth/logout", logout);
  
  // Get CSRF token
  csrfRoutes.get("/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });
  
  // API endpoints with CSRF protection
  csrfRoutes.post("/contact", formSubmissionLimiter, async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Submit to storage
      const submission = await storage.createContactSubmission({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone || "",
        visitDate: validatedData.visitDate || "",
        interests: validatedData.interests || [],
        message: validatedData.message || "",
      });

      // Send email notification to info@triple-x-adventures.com
      const emailResult = await sendContactEmail(submission);
      
      // Log email status for debugging
      if (emailResult.success) {
        console.log('Contact form email sent successfully');
        if (emailResult.previewUrl) {
          console.log('Email preview URL (for testing):', emailResult.previewUrl);
        }
      } else {
        console.log('Failed to send contact form email:', emailResult.message);
      }

      res.status(201).json({ 
        success: true, 
        message: "Contact submission received", 
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error processing contact submission:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process your request" 
      });
    }
  });

  // Weather API proxy endpoint for Weatherstack
  router.get("/weather", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ 
          success: false, 
          message: "Query parameter is required" 
        });
      }

      // Using the API key from environment variables for better security
      const apiKey = process.env.WEATHERSTACK_API_KEY;
      
      if (!apiKey) {
        console.error("Weatherstack API key not found in environment variables");
        return res.status(500).json({
          success: false,
          message: "API configuration error"
        });
      }
      
      // Log for debugging (only showing that we're using the key, not the key itself)
      console.log("Using Weatherstack API key from environment variables");

      // Sanitize the query parameter
      const sanitizedQuery = encodeURIComponent(sanitizeInput(query as string));
      
      // Log the API request with masked key
      console.log(`Making Weatherstack API request with key ${hashForLogging(apiKey)} for query: ${sanitizedQuery}`);
      
      // Proxy the request to Weatherstack with sanitized parameters
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${sanitizedQuery}&units=m`
      );
      
      const data = await response.json() as WeatherstackResponse;
      
      if ('error' in data) {
        return res.status(400).json({ 
          success: false, 
          message: data.error.info || "Weather API error" 
        });
      }
      
      res.json(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch weather data" 
      });
    }
  });

  // Get all contact submissions (admin only)
  csrfRoutes.get("/contact", authenticate, authorize(['admin']), async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact submissions" 
      });
    }
  });

  // Adventure package builder endpoint
  csrfRoutes.post("/adventure", formSubmissionLimiter, async (req, res) => {
    try {
      // Validate the request body
      const validatedData = adventureFormSchema.parse(req.body);
      
      // Submit to storage
      const submission = await storage.createAdventureSubmission({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone || "",
        startDate: validatedData.startDate || "",
        endDate: validatedData.endDate || "",
        departureAirport: validatedData.departureAirport,
        groupSize: validatedData.groupSize,
        selectedPackages: validatedData.selectedPackages || [],
        selectedAccommodations: validatedData.selectedAccommodations || [],
        selectedActivities: validatedData.selectedActivities || [],
        additionalRequests: validatedData.additionalRequests || "",
        preferredLanguage: validatedData.preferredLanguage,
      });

      // Send email notification to info@triple-x-adventures.com
      const emailResult = await sendAdventureEmail(submission);
      
      // Log email status for debugging
      if (emailResult.success) {
        console.log(`New adventure package request from ${submission.firstName} ${submission.lastName}`);
        console.log('Adventure form email sent successfully');
        if (emailResult.previewUrl) {
          console.log('Email preview URL (for testing):', emailResult.previewUrl);
        }
      } else {
        console.log('Failed to send adventure form email:', emailResult.message);
      }

      res.status(201).json({ 
        success: true, 
        message: "Adventure package request received", 
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error processing adventure submission:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process your adventure request" 
      });
    }
  });

  // Get all adventure submissions (admin only)
  csrfRoutes.get("/adventure", authenticate, authorize(['admin']), async (req, res) => {
    try {
      const submissions = await storage.getAdventureSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching adventure submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch adventure submissions" 
      });
    }
  });

  // Google Reviews API endpoint
  csrfRoutes.get("/google-reviews", async (req, res) => {
    try {
      // Google Places API requires an API key
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'Google Places API key is not configured' 
        });
      }

      // Your Google Place ID - this identifies your business on Google
      const placeId = process.env.GOOGLE_PLACE_ID;
      
      if (!placeId) {
        return res.status(500).json({ 
          error: 'Google Place ID is not configured' 
        });
      }

      // Log the API request with masked key
      console.log(`Making Google Places API request with key ${hashForLogging(apiKey)} for place ID: ${placeId}`);
      
      // Fetch reviews from Google Places API
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,name&key=${apiKey}`;
      
      console.log(`Fetching Google reviews for Place ID: ${placeId}`);
      const response = await fetch(url);
      const data = await response.json() as any;
      
      console.log('Google Places API response:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        throw new Error(`Google API error: ${data.error_message || 'Unknown error'}`);
      }

      // Extract and format the reviews
      const reviews = data.result?.reviews || [];
      
      const formattedReviews = reviews.map((review: any) => ({
        id: review.time, // Using the timestamp as a unique ID
        text: review.text,
        author: review.author_name,
        location: 'Google Review', // Google doesn't provide location in reviews
        rating: review.rating,
        image: review.profile_photo_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(review.author_name),
        language: review.language // Original language of the review
      }));

      return res.status(200).json({ reviews: formattedReviews });
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch Google reviews',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Mount the CSRF protected routes
  router.use(csrfRoutes);
  
  // Mount all routes under /api
  app.use("/api", router);
  
  // Add a catch-all error handler
  app.use((err: any, req: Request, res: Response, next: any) => {
    if (err.code === 'EBADCSRFTOKEN') {
      // Handle CSRF token errors
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired CSRF token. Please refresh the page and try again.'
      });
    }
    
    // Log the error but don't expose details to the client
    console.error('Unhandled error:', err);
    
    // Send a generic error response
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message
    });
  });
  
  return httpServer;
}
