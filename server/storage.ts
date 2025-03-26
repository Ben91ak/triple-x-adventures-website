import { users, type User, type InsertUser, type Contact, type InsertContact, type Adventure, type InsertAdventure } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmissions(): Promise<Contact[]>;
  createAdventureSubmission(adventure: InsertAdventure): Promise<Adventure>;
  getAdventureSubmissions(): Promise<Adventure[]>;
}

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
      interests: insertContact.interests ?? null,
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
      selectedPackages: insertAdventure.selectedPackages ?? null,
      selectedAccommodations: insertAdventure.selectedAccommodations ?? null,
      selectedActivities: insertAdventure.selectedActivities ?? null,
      additionalRequests: insertAdventure.additionalRequests ?? null,
      preferredLanguage: insertAdventure.preferredLanguage,
      submittedAt
    };
    
    this.adventureSubmissions.set(id, adventure);
    
    // Log the submission for easier tracking (in a real app, this would send an email notification)
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

export const storage = new MemStorage();
