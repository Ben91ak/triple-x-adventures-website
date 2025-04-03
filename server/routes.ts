import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, adventureFormSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { sendContactEmail, sendAdventureEmail } from "./emailService";
import fetch from "node-fetch";

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

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const router = express.Router();

  // API endpoints
  router.post("/contact", async (req, res) => {
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

      // Proxy the request to Weatherstack
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${query}&units=m`
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

  // Get all contact submissions (would be admin only in a real app)
  router.get("/contact", async (req, res) => {
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
  router.post("/adventure", async (req, res) => {
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

  // Get all adventure submissions (would be admin only in a real app)
  router.get("/adventure", async (req, res) => {
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

  app.use("/api", router);
  return httpServer;
}
