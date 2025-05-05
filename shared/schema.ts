import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enhanced user schema with roles and security features
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default('user'),
  email: text("email").unique(),
  lastLogin: timestamp("last_login"),
  failedLoginAttempts: integer("failed_login_attempts").default(0),
  accountLocked: boolean("account_locked").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  email: true,
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
  firstName: z.string().min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "First name can only contain letters, spaces, hyphens and apostrophes"),
  lastName: z.string().min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  email: z.string().email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
  phone: z.string().optional()
    .transform(val => val ? val.replace(/[^\d+\-\s()]/g, '') : val), // Sanitize phone number
  visitDate: z.string().optional()
    .transform(val => val ? val.trim() : val),
  interests: z.array(z.string()
    .max(100, "Interest cannot exceed 100 characters")
    .transform(val => val.trim())).optional(),
  message: z.string().optional()
    .transform(val => val ? val.trim() : val)
    .pipe(z.string().max(2000, "Message cannot exceed 2000 characters").optional()),
  // Add CSRF token validation
  _csrf: z.string().optional(),
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
  firstName: z.string().min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "First name can only contain letters, spaces, hyphens and apostrophes"),
  lastName: z.string().min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  email: z.string().email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
  phone: z.string().optional()
    .transform(val => val ? val.replace(/[^\d+\-\s()]/g, '') : val), // Sanitize phone number
  startDate: z.string().optional()
    .transform(val => val ? val.trim() : val),
  endDate: z.string().optional()
    .transform(val => val ? val.trim() : val),
  departureAirport: z.string().min(1, "Departure airport is required")
    .max(100, "Departure airport cannot exceed 100 characters")
    .transform(val => val.trim()),
  groupSize: z.number().min(1, "Group size must be at least 1")
    .max(50, "Group size cannot exceed 50")
    .int("Group size must be a whole number"),
  selectedPackages: z.array(z.string()
    .max(100, "Package name cannot exceed 100 characters")
    .transform(val => val.trim())).optional(),
  selectedAccommodations: z.array(z.string()
    .max(100, "Accommodation name cannot exceed 100 characters")
    .transform(val => val.trim())).optional(),
  selectedActivities: z.array(z.string()
    .max(100, "Activity name cannot exceed 100 characters")
    .transform(val => val.trim())).optional(),
  additionalRequests: z.string().optional()
    .transform(val => val ? val.trim() : val)
    .pipe(z.string().max(2000, "Additional requests cannot exceed 2000 characters").optional()),
  preferredLanguage: z.string().min(1, "Preferred language is required")
    .max(50, "Preferred language cannot exceed 50 characters")
    .transform(val => val.trim()),
  // Add CSRF token validation
  _csrf: z.string().optional(),
});

export type InsertAdventure = z.infer<typeof insertAdventureSchema>;
export type Adventure = typeof adventureSubmissions.$inferSelect;
