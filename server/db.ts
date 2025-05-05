import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { sql } from "drizzle-orm";

// Create a postgres client with secure connection handling
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';

// Log database connection without exposing credentials
const logSafeConnectionString = (connString: string): string => {
  try {
    // Create a URL object from the connection string
    const url = new URL(connString);
    // Mask the password
    if (url.password) {
      url.password = '********';
    }
    return url.toString();
  } catch (error) {
    // If parsing fails, return a generic message
    return 'Invalid connection string format';
  }
};

console.log("Connecting to database:", logSafeConnectionString(connectionString));

// Check if we're in development mode with no database URL
const isDevelopmentNoDb = process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL;

// Create the Drizzle ORM instance
let dbInstance: any;

if (!isDevelopmentNoDb) {
  console.log("Using PostgreSQL database storage");

    // Configure connection with security options
  const connectionOptions = {
    max: 10, // Maximum number of connections in pool
    idle_timeout: 30, // Close idle connections after 30 seconds
    connect_timeout: 10, // Timeout after 10 seconds when connecting
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false, // Enforce SSL in production
  };
  
  // For migrations - use a separate connection with limited pool
  const migrationClient = postgres(connectionString, { 
    ...connectionOptions,
    max: 1 // Limit to 1 connection for migrations
  });

  // For queries - use a connection pool
  const queryClient = postgres(connectionString, connectionOptions);
  
  // Add error handling to the connection
  // Note: The postgres client has an 'on' method for events, but TypeScript doesn't recognize it
  // @ts-ignore: postgres client has event handlers
  queryClient.on('error', (err: Error) => {
    console.error('Database connection error:', err);
  });

  // Initialize Drizzle
  dbInstance = drizzle(queryClient);
} else {
  console.log("Development mode with no DATABASE_URL, skipping database initialization");
  // Create a mock db object that will throw errors if used
  dbInstance = {} as any;
}

export const db = dbInstance;

// Function to run migrations
export async function runMigrations() {
  if (isDevelopmentNoDb) {
    console.log("Skipping migrations in development mode with no DATABASE_URL");
    return true;
  }

  try {
    console.log("Running database migrations...");
    
    // Configure migration connection with security options
    const migrationOptions = {
      max: 1, // Limit to 1 connection for migrations
      idle_timeout: 30,
      connect_timeout: 20, // Longer timeout for migrations
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
    };
    
    // This path is relative to where the code is executed, typically the project root
    await migrate(drizzle(postgres(connectionString, migrationOptions)), { 
      migrationsFolder: "./migrations",
      migrationsTable: "drizzle_migrations" // Explicitly name the migrations table
    });
    
    console.log("Migrations completed successfully");
    return true;
  } catch (error) {
    console.error("Error running migrations:", error);
    // Log more details about the error in development
    if (process.env.NODE_ENV !== 'production') {
      console.error("Migration error details:", error);
    }
    return false;
  }
}

// Export a helper function to initialize tables if needed
export async function initializeTables() {
  if (isDevelopmentNoDb) {
    console.log("Skipping table initialization in development mode with no DATABASE_URL");
    return true;
  }

  try {
    console.log("Checking database tables...");
    
    // Use raw SQL to query tables without relying on schema import
    const tablesResult = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = tablesResult.map((row: { table_name: string }) => row.table_name);
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