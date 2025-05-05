// Load environment variables from .env file
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

console.log("Loading environment variables from:", envPath);
dotenv.config({ path: envPath });

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeTables } from "./db";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { Server } from "http";

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "*.googleapis.com", "*.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "*.googleapis.com"],
      imgSrc: ["'self'", "data:", "*.googleapis.com", "*.gstatic.com", "*.google.com"],
      connectSrc: ["'self'", "*.googleapis.com"],
      fontSrc: ["'self'", "*.gstatic.com", "*.googleapis.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    }
  },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://triple-x-adventures.com', 'https://www.triple-x-adventures.com'] 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Body parsers
app.use(express.json({ limit: '1mb' })); // Limit request size
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET || 'default-secret-key'));

// Enable GZIP compression for all responses
app.use(compression({
  // Compression level (0-9), 6 is a good balance between compression ratio and CPU usage
  level: 6,
  // Only compress responses larger than 1KB
  threshold: 1024,
  // Don't compress responses that are already compressed
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Add caching headers for static assets
app.use((req, res, next) => {
  const path = req.path;
  
  // For static assets like JavaScript, CSS, and images
  if (path.match(/\.(js|css|png|jpg|jpeg|gif|webp|avif|ico|svg|woff|woff2|ttf|eot)(\?.*)?$/)) {
    // If the asset has a cache-busting query param or hash in filename
    if (path.match(/\.[0-9a-f]{8,}\./) || req.query.v) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    }
  } 
  // For HTML files
  else if (path.match(/\.html$/) || path === '/') {
    res.setHeader('Cache-Control', 'no-cache');
  }
  
  next();
});

// Secure logging middleware - avoid logging sensitive data
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    // Create a sanitized copy of the response for logging
    let sanitizedResponse = { ...bodyJson };
    
    // Remove sensitive fields from logs
    if (sanitizedResponse) {
      // List of fields to redact from logs
      const sensitiveFields = ['password', 'token', 'email', 'phone', 'firstName', 'lastName'];
      
      for (const field of sensitiveFields) {
        if (sanitizedResponse[field]) {
          sanitizedResponse[field] = '[REDACTED]';
        }
      }
    }
    
    capturedJsonResponse = sanitizedResponse;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Only log response data in development environment
      if (process.env.NODE_ENV === 'development' && capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize database and routes
async function initializeApp() {
  try {
    log("Initializing database connection and tables");
    
    // Check if we should skip database initialization in development mode
    const skipDB = process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL;
    
    if (!skipDB) {
      await initializeTables();
      log("Database initialization complete");
    } else {
      log("Skipping database initialization in development mode");
    }

    // Register API routes
    const server = await registerRoutes(app);

    // Setup Vite development server or serve static files
    if (process.env.NODE_ENV === 'production') {
      serveStatic(app);
    } else {
      await setupVite(app, server);
    }

    const port = parseInt(process.env.PORT || '3000', 10);
    server.listen(port, '127.0.0.1', () => {
      log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  
  // Don't expose error details in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : err.message;
    
  res.status(500).json({ 
    success: false, 
    message
  });
});

initializeApp();
