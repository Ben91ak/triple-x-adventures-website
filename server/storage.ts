import { users, contactSubmissions, adventureSubmissions, type User, type InsertUser, type Contact, type InsertContact, type Adventure, type InsertAdventure } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmissions(): Promise<Contact[]>;
  createAdventureSubmission(adventure: InsertAdventure): Promise<Adventure>;
  getAdventureSubmissions(): Promise<Adventure[]>;
}

/**
 * PostgreSQL database storage implementation using Drizzle ORM
 */
export class DbStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return results[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contactSubmissions).values({
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone || null,
      visitDate: insertContact.visitDate || null,
      interests: insertContact.interests || [],
      message: insertContact.message || null,
    }).returning();
    
    return result[0];
  }

  async getContactSubmissions(): Promise<Contact[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.submittedAt);
  }

  async createAdventureSubmission(insertAdventure: InsertAdventure): Promise<Adventure> {
    const result = await db.insert(adventureSubmissions).values({
      firstName: insertAdventure.firstName,
      lastName: insertAdventure.lastName,
      email: insertAdventure.email,
      phone: insertAdventure.phone || null,
      startDate: insertAdventure.startDate || null,
      endDate: insertAdventure.endDate || null,
      departureAirport: insertAdventure.departureAirport,
      groupSize: insertAdventure.groupSize,
      selectedPackages: insertAdventure.selectedPackages || [],
      selectedAccommodations: insertAdventure.selectedAccommodations || [],
      selectedActivities: insertAdventure.selectedActivities || [],
      additionalRequests: insertAdventure.additionalRequests || null,
      preferredLanguage: insertAdventure.preferredLanguage,
    }).returning();
    
    const adventure = result[0];
    
    // Log the submission for easier tracking
    console.log('New Adventure Submission:', {
      name: `${adventure.firstName} ${adventure.lastName}`,
      email: adventure.email,
      phone: adventure.phone,
      departureAirport: adventure.departureAirport,
      groupSize: adventure.groupSize,
      dates: `${adventure.startDate || 'Not specified'} - ${adventure.endDate || 'Not specified'}`,
      language: adventure.preferredLanguage
    });
    
    return adventure;
  }

  async getAdventureSubmissions(): Promise<Adventure[]> {
    return await db.select().from(adventureSubmissions).orderBy(adventureSubmissions.submittedAt);
  }
}

// Create a fallback memory storage for development/testing purposes
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, Contact>;
  private adventureSubmissions: Map<number, Adventure>;
  userCurrentId: number;
  contactCurrentId: number;
  adventureCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.adventureSubmissions = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.adventureCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const submittedAt = new Date();
    
    // Ensure all fields have the correct types
    const contact: Contact = {
      id,
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone ?? null,
      visitDate: insertContact.visitDate ?? null,
      interests: insertContact.interests ?? [],
      message: insertContact.message ?? null,
      submittedAt
    };
    
    this.contactSubmissions.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<Contact[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async createAdventureSubmission(insertAdventure: InsertAdventure): Promise<Adventure> {
    const id = this.adventureCurrentId++;
    const submittedAt = new Date();
    
    // Ensure all fields have the correct types
    const adventure: Adventure = {
      id,
      firstName: insertAdventure.firstName,
      lastName: insertAdventure.lastName,
      email: insertAdventure.email,
      phone: insertAdventure.phone ?? null,
      startDate: insertAdventure.startDate ?? null,
      endDate: insertAdventure.endDate ?? null,
      departureAirport: insertAdventure.departureAirport,
      groupSize: insertAdventure.groupSize,
      selectedPackages: insertAdventure.selectedPackages ?? [],
      selectedAccommodations: insertAdventure.selectedAccommodations ?? [],
      selectedActivities: insertAdventure.selectedActivities ?? [],
      additionalRequests: insertAdventure.additionalRequests ?? null,
      preferredLanguage: insertAdventure.preferredLanguage,
      submittedAt
    };
    
    this.adventureSubmissions.set(id, adventure);
    
    // Log the submission for easier tracking
    console.log('New Adventure Submission:', {
      name: `${adventure.firstName} ${adventure.lastName}`,
      email: adventure.email,
      phone: adventure.phone,
      departureAirport: adventure.departureAirport,
      groupSize: adventure.groupSize,
      dates: `${adventure.startDate || 'Not specified'} - ${adventure.endDate || 'Not specified'}`,
      language: adventure.preferredLanguage
    });
    
    return adventure;
  }

  async getAdventureSubmissions(): Promise<Adventure[]> {
    return Array.from(this.adventureSubmissions.values());
  }
}

// Use the database storage implementation, falling back to memory storage if there's an issue
let storageImpl: IStorage;

try {
  storageImpl = new DbStorage();
  console.log("Using PostgreSQL database storage");
} catch (error) {
  console.warn("Failed to initialize database storage, falling back to memory storage:", error);
  storageImpl = new MemStorage();
}

export const storage = storageImpl;
