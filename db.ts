991234567891011121314151617181920212223242526272829303132333435363738import { Pool, neonConfig } from '@neondatabase/serverless';import { drizzle } from 'drizzle-orm/neon-serverless';import ws from "ws";import * as schema from "@shared/schema";neonConfig.webSocketConstructor = ws;// Build DATABASE_URL from individual PG env vars if DATABASE_URL points to old Supabase connectionfunction getDatabaseUrl(): string {  const dbUrl = process.env.DATABASE_URL;    // If DATABASE_URL points to Supabase pooler, construct from individual PG vars  if (dbUrl?.includes('supabase.com')) {    const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;        if (!PGHOST || !PGPORT || !PGUSER || !PGPASSWORD || !PGDATABASE) {      throw new Error(        'PostgreSQL environment variables (PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE) must be set'      );    }        const newUrl = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require`;    console.log('✓ Constructed DATABASE_URL from PG environment variables');    return newUrl;  }    if (!dbUrl) {    throw new Error(      "DATABASE_URL must be set. Did you forget to provision a database?",    );  }    return dbUrl;}const connectionString = getDatabaseUrl();export const pool = new Pool({ connectionString });export const db = drizzle({ client: pool, schema }); Project Planner Prompt Library
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
991234567891011121314151617181920212223242526272829303132333435363738
import { Pool, neonConfig } from '@neondatabase/serverless';import { drizzle } from 'drizzle-orm/neon-serverless';import ws from "ws";import * as schema from "@shared/schema";neonConfig.webSocketConstructor = ws;// Build DATABASE_URL from individual PG env vars if DATABASE_URL points to old Supabase connectionfunction getDatabaseUrl(): string {  const dbUrl = process.env.DATABASE_URL;    // If DATABASE_URL points to Supabase pooler, construct from individual PG vars  if (dbUrl?.includes('supabase.com')) {    const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;        if (!PGHOST || !PGPORT || !PGUSER || !PGPASSWORD || !PGDATABASE) {      throw new Error(        'PostgreSQL environment variables (PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE) must be set'      );    }        const newUrl = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require`;    console.log('✓ Constructed DATABASE_URL from PG environment variables');    return newUrl;  }    if (!dbUrl) {    throw new Error(      "DATABASE_URL must be set. Did you forget to provision a database?",    );  }    return dbUrl;}const connectionString = getDatabaseUrl();export const pool = new Pool({ connectionString });export const db = drizzle({ client: pool, schema });
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Build DATABASE_URL from individual PG env vars if DATABASE_URL points to old Supabase connection
function getDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL;
  
  // If DATABASE_URL points to Supabase pooler, construct from individual PG vars
  if (dbUrl?.includes('supabase.com')) {
    const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;
    
    if (!PGHOST || !PGPORT || !PGUSER || !PGPASSWORD || !PGDATABASE) {
      throw new Error(
        'PostgreSQL environment variables (PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE) must be set'
      );
    }
    
    const newUrl = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require`;
    console.log('✓ Constructed DATABASE_URL from PG environment variables');
    return newUrl;
  }
  
  if (!dbUrl) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
  
  return dbUrl;
}

const connectionString = getDatabaseUrl();
export const pool = new Pool({ connectionString });
export const db = drizzle({ client: pool, schema });


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