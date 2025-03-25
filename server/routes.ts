import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";

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

  // Weather API endpoint removed as requested

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

  app.use("/api", router);
  return httpServer;
}
