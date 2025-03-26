import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  visitDate: text("visit_date"),
  interests: text("interests").array(),
  message: text("message"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  visitDate: z.string().optional(),
  interests: z.array(z.string()).optional(),
  message: z.string().optional(),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSubmissions.$inferSelect;

// Adventure Package Builder schema
export const adventureSubmissions = pgTable("adventure_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  departureAirport: text("departure_airport").notNull(),
  groupSize: integer("group_size").notNull(),
  selectedPackages: text("selected_packages").array(),
  selectedAccommodations: text("selected_accommodations").array(),
  selectedActivities: text("selected_activities").array(),
  additionalRequests: text("additional_requests"),
  preferredLanguage: text("preferred_language").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertAdventureSchema = createInsertSchema(adventureSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const adventureFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  departureAirport: z.string().min(1, "Departure airport is required"),
  groupSize: z.number().min(1, "Group size must be at least 1"),
  selectedPackages: z.array(z.string()).optional(),
  selectedAccommodations: z.array(z.string()).optional(),
  selectedActivities: z.array(z.string()).optional(),
  additionalRequests: z.string().optional(),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
});

export type InsertAdventure = z.infer<typeof insertAdventureSchema>;
export type Adventure = typeof adventureSubmissions.$inferSelect;
