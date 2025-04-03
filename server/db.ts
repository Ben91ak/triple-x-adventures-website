import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { sql } from "drizzle-orm";

// Create a postgres client
const connectionString = process.env.DATABASE_URL!;
console.log("Connecting to database with URL:", connectionString ? "URL exists" : "URL missing");

// For migrations and queries
const migrationClient = postgres(connectionString, { max: 1 });

// For queries
const queryClient = postgres(connectionString);

// Create the Drizzle ORM instance
export const db = drizzle(queryClient);

// Function to run migrations
export async function runMigrations() {
  try {
    console.log("Running database migrations...");
    
    // This path is relative to where the code is executed, typically the project root
    await migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" });
    
    console.log("Migrations completed successfully");
    return true;
  } catch (error) {
    console.error("Error running migrations:", error);
    return false;
  } finally {
    // Close the migration client when done
    await migrationClient.end();
  }
}

// Export a helper function to initialize tables if needed
export async function initializeTables() {
  try {
    console.log("Checking database tables...");
    
    // Use raw SQL to query tables without relying on schema import
    const tablesResult = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = tablesResult.map(row => row.table_name);
    console.log("Database tables:", tables.join(", "));
    
    if (tables.includes('users') && 
        tables.includes('contact_submissions') && 
        tables.includes('adventure_submissions')) {
      console.log("All required tables exist");
      return true;
    } else {
      console.log("Some tables are missing. Running migrations...");
      return await runMigrations();
    }
  } catch (error) {
    console.error("Error checking database tables:", error);
    console.log("Attempting to run migrations...");
    return await runMigrations();
  }
}