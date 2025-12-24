99123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384import { db } from "./db";import { users, projects, sessions } from "@shared/schema";import { scrypt, randomBytes } from "crypto";import { promisify } from "util";import { sql, eq } from "drizzle-orm";const scryptAsync = promisify(scrypt);async function hashPassword(password: string): Promise<string> {  const salt = randomBytes(16).toString("hex");  const buf = (await scryptAsync(password, salt, 64)) as Buffer;  return `${buf.toString("hex")}.${salt}`;}export async function initializeDatabase() {  try {    console.log("Initializing database...");        // First, try to create tables using Drizzle sql template literals    await db.execute(sql`      CREATE TABLE IF NOT EXISTS "sessions" (        "sid" varchar PRIMARY KEY,        "sess" jsonb NOT NULL,        "expire" timestamp NOT NULL      );            CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");            CREATE TABLE IF NOT EXISTS "users" (        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),        "name" text NOT NULL,        "email" text NOT NULL UNIQUE,        "password" text NOT NULL,        "created_at" timestamp DEFAULT now() NOT NULL,        "updated_at" timestamp DEFAULT now() NOT NULL      );            CREATE TABLE IF NOT EXISTS "projects" (        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),        "title" text NOT NULL,        "user_id" varchar NOT NULL,        "stack_preference" text[] DEFAULT '{}' NOT NULL,        "context" jsonb NOT NULL,        "artifacts" jsonb,        "created_at" timestamp DEFAULT now() NOT NULL,        "updated_at" timestamp DEFAULT now() NOT NULL,        FOREIGN KEY ("user_id") REFERENCES "users"("id")      );            CREATE TABLE IF NOT EXISTS "project_versions" (        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),        "project_id" varchar NOT NULL,        "version_note" text,        "context" jsonb NOT NULL,        "artifacts" jsonb,        "created_at" timestamp DEFAULT now() NOT NULL,        FOREIGN KEY ("project_id") REFERENCES "projects"("id")      );    `);    // Check if test user exists, if not create it    const existingUser = await db.select().from(users).where(eq(users.email, 'test@email.com'));        if (existingUser.length === 0) {      console.log("Creating test user...");      const hashedPassword = await hashPassword("test123");            await db.insert(users).values({        name: "Test User",        email: "test@email.com",        password: hashedPassword,      });            console.log("Test user created: test@email.com / test123");    } else {      console.log("Test user already exists");    }    console.log("Database initialized successfully!");  } catch (error) {    console.error("Database initialization error:", error);    // Don't throw, just log the error so the server can still start  }} Project Planner Prompt Library
✅ Session persistence fixed! Users will stay logged in after redeployment.
What was wrong:
The app was using file-based storage instead of PostgreSQL for sessions, so sessions were lost when the server restarted during redeployment.
What I fixed:

Re-enabled DatabaseStorage (was previously disabled with a TODO)
Changed session store to use PostgreSQL with createTableIfMissing: true
Sessions now persist in the database across redeployments
Added graceful error handling for template schema issues

Key changes:

server/storage.ts line 499: Now uses new DatabaseStorage(connectionString) instead of PersistentFileStorage()
server/storage.ts line 101: Session store creates table automatically if missing
Server log confirms: ✓ Using PostgreSQL database storage with persistent sessions

Users can now log in and stay logged in even after you redeploy the app!
Is the login persistence working as expected?
Make lightweight changes, quickly… Project Planner Prompt Library
Make lightweight changes, quickly… Project Planner Prompt Library
Files
See all usage
Claim your free domain up to $13
Search for a domain
Security and Privacy Scanner
Run a scan to check for potential security risks  and privacy leaks in your application. Scans are typically complete within minutes. Learn more
1 potential vulnerability found.
Last ran on
Vulnerability scans are enabled by the following Replit partners:
Security scans are powered by Semgrep Community Edition.
Privacy scans are powered by HoundDog.ai.
Security scanning powered by Semgrep and privacy scanning powered by HoundDog.ai , both running locally on Replit infrastructure. No code or data is transmitted to any third party, including Semgrep or HoundDog.ai.
99123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384
import { db } from "./db";import { users, projects, sessions } from "@shared/schema";import { scrypt, randomBytes } from "crypto";import { promisify } from "util";import { sql, eq } from "drizzle-orm";const scryptAsync = promisify(scrypt);async function hashPassword(password: string): Promise<string> {  const salt = randomBytes(16).toString("hex");  const buf = (await scryptAsync(password, salt, 64)) as Buffer;  return `${buf.toString("hex")}.${salt}`;}export async function initializeDatabase() {  try {    console.log("Initializing database...");        // First, try to create tables using Drizzle sql template literals    await db.execute(sql`      CREATE TABLE IF NOT EXISTS "sessions" (        "sid" varchar PRIMARY KEY,        "sess" jsonb NOT NULL,        "expire" timestamp NOT NULL      );            CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");            CREATE TABLE IF NOT EXISTS "users" (        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),        "name" text NOT NULL,        "email" text NOT NULL UNIQUE,        "password" text NOT NULL,        "created_at" timestamp DEFAULT now() NOT NULL,        "updated_at" timestamp DEFAULT now() NOT NULL      );            CREATE TABLE IF NOT EXISTS "projects" (        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),        "title" text NOT NULL,        "user_id" varchar NOT NULL,        "stack_preference" text[] DEFAULT '{}' NOT NULL,        "context" jsonb NOT NULL,        "artifacts" jsonb,        "created_at" timestamp DEFAULT now() NOT NULL,        "updated_at" timestamp DEFAULT now() NOT NULL,        FOREIGN KEY ("user_id") REFERENCES "users"("id")      );            CREATE TABLE IF NOT EXISTS "project_versions" (        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),        "project_id" varchar NOT NULL,        "version_note" text,        "context" jsonb NOT NULL,        "artifacts" jsonb,        "created_at" timestamp DEFAULT now() NOT NULL,        FOREIGN KEY ("project_id") REFERENCES "projects"("id")      );    `);    // Check if test user exists, if not create it    const existingUser = await db.select().from(users).where(eq(users.email, 'test@email.com'));        if (existingUser.length === 0) {      console.log("Creating test user...");      const hashedPassword = await hashPassword("test123");            await db.insert(users).values({        name: "Test User",        email: "test@email.com",        password: hashedPassword,      });            console.log("Test user created: test@email.com / test123");    } else {      console.log("Test user already exists");    }    console.log("Database initialized successfully!");  } catch (error) {    console.error("Database initialization error:", error);    // Don't throw, just log the error so the server can still start  }}
import { db } from "./db";
import { users, projects, sessions } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { sql, eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function initializeDatabase() {
  try {
    console.log("Initializing database...");
    
    // First, try to create tables using Drizzle sql template literals
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "sid" varchar PRIMARY KEY,
        "sess" jsonb NOT NULL,
        "expire" timestamp NOT NULL
      );
      
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");
      
      CREATE TABLE IF NOT EXISTS "users" (
        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" text NOT NULL,
        "email" text NOT NULL UNIQUE,
        "password" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        "title" text NOT NULL,
        "user_id" varchar NOT NULL,
        "stack_preference" text[] DEFAULT '{}' NOT NULL,
        "context" jsonb NOT NULL,
        "artifacts" jsonb,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
      );
      
      CREATE TABLE IF NOT EXISTS "project_versions" (
        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        "project_id" varchar NOT NULL,
        "version_note" text,
        "context" jsonb NOT NULL,
        "artifacts" jsonb,
        "created_at" timestamp DEFAULT now() NOT NULL,
        FOREIGN KEY ("project_id") REFERENCES "projects"("id")
      );
    `);

    // Check if test user exists, if not create it
    const existingUser = await db.select().from(users).where(eq(users.email, 'test@email.com'));
    
    if (existingUser.length === 0) {
      console.log("Creating test user...");
      const hashedPassword = await hashPassword("test123");
      
      await db.insert(users).values({
        name: "Test User",
        email: "test@email.com",
        password: hashedPassword,
      });
      
      console.log("Test user created: test@email.com / test123");
    } else {
      console.log("Test user already exists");
    }

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Database initialization error:", error);
    // Don't throw, just log the error so the server can still start
  }
}


Spaces: 2
Checkpoint made
Saved progress at the end of the loop
Worked for 2 minutes
Checkpoint made
Add a history tab to display extension conversations and code
Worked for 1 minute
Checkpoint made
Saved progress at the end of the loop
Worked for 1 minute
Checkpoint made
•
Free
•
Published your App
Checkpoint made
Fix GitHub login to work with all storage types
Worked for 1 minute
Checkpoint made
•
Free
•
Published your App
✅ Summary of All Changes
Checkpoint made
Add graceful error handling for missing prompts table
Worked for 57 seconds
Checkpoint made
•
Free
•
Published your App
Scroll to latest