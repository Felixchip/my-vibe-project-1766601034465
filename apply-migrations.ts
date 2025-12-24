99123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051import { drizzle } from "drizzle-orm/neon-serverless";import { migrate } from "drizzle-orm/neon-serverless/migrator";import { Pool } from "@neondatabase/serverless";import ws from "ws";import { neonConfig } from "@neondatabase/serverless";neonConfig.webSocketConstructor = ws;// Build DATABASE_URL from individual PG env varsfunction getDatabaseUrl(): string {  const dbUrl = process.env.DATABASE_URL;    if (dbUrl?.includes('supabase.com')) {    const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;        if (!PGHOST || !PGPORT || !PGUSER || !PGPASSWORD || !PGDATABASE) {      throw new Error('PostgreSQL environment variables must be set');    }        return `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require`;  }    if (!dbUrl) {    throw new Error("DATABASE_URL must be set");  }    return dbUrl;}async function main() {  const connectionString = getDatabaseUrl();  console.log('✓ Using correct database connection');    const pool = new Pool({ connectionString });  const db = drizzle({ client: pool });    console.log('🚀 Applying migrations...');    await migrate(db, { migrationsFolder: "./migrations" });    console.log('✅ Migrations applied successfully!');    await pool.end();  process.exit(0);}main().catch((err) => {  console.error('❌ Migration failed:', err);  process.exit(1);}); Project Planner Prompt Library
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
99123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051
import { drizzle } from "drizzle-orm/neon-serverless";import { migrate } from "drizzle-orm/neon-serverless/migrator";import { Pool } from "@neondatabase/serverless";import ws from "ws";import { neonConfig } from "@neondatabase/serverless";neonConfig.webSocketConstructor = ws;// Build DATABASE_URL from individual PG env varsfunction getDatabaseUrl(): string {  const dbUrl = process.env.DATABASE_URL;    if (dbUrl?.includes('supabase.com')) {    const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;        if (!PGHOST || !PGPORT || !PGUSER || !PGPASSWORD || !PGDATABASE) {      throw new Error('PostgreSQL environment variables must be set');    }        return `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require`;  }    if (!dbUrl) {    throw new Error("DATABASE_URL must be set");  }    return dbUrl;}async function main() {  const connectionString = getDatabaseUrl();  console.log('✓ Using correct database connection');    const pool = new Pool({ connectionString });  const db = drizzle({ client: pool });    console.log('🚀 Applying migrations...');    await migrate(db, { migrationsFolder: "./migrations" });    console.log('✅ Migrations applied successfully!');    await pool.end();  process.exit(0);}main().catch((err) => {  console.error('❌ Migration failed:', err);  process.exit(1);});
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool } from "@neondatabase/serverless";
import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";

neonConfig.webSocketConstructor = ws;

// Build DATABASE_URL from individual PG env vars
function getDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL;
  
  if (dbUrl?.includes('supabase.com')) {
    const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;
    
    if (!PGHOST || !PGPORT || !PGUSER || !PGPASSWORD || !PGDATABASE) {
      throw new Error('PostgreSQL environment variables must be set');
    }
    
    return `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require`;
  }
  
  if (!dbUrl) {
    throw new Error("DATABASE_URL must be set");
  }
  
  return dbUrl;
}

async function main() {
  const connectionString = getDatabaseUrl();
  console.log('✓ Using correct database connection');
  
  const pool = new Pool({ connectionString });
  const db = drizzle({ client: pool });
  
  console.log('🚀 Applying migrations...');
  
  await migrate(db, { migrationsFolder: "./migrations" });
  
  console.log('✅ Migrations applied successfully!');
  
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});



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