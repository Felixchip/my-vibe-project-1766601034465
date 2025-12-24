999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566import { sql } from 'drizzle-orm';import { db, pool } from './db';async function fixAllSchema() {  try {    console.log('🔍 Starting comprehensive schema audit...\n');        // ============================================    // PART 1: Check and fix USERS table    // ============================================    console.log('📋 USERS TABLE:');    const usersColumns = await db.execute(sql`      SELECT column_name, data_type, column_default      FROM information_schema.columns       WHERE table_name = 'users'      ORDER BY ordinal_position    `);        console.log('Current columns:', usersColumns.rows.map((r: any) => r.column_name).join(', '));        // Expected columns in users table    const expectedUsersColumns = ['id', 'email', 'first_name', 'last_name', 'profile_image_url', 'created_at', 'updated_at'];    const actualUsersColumns = usersColumns.rows.map((r: any) => r.column_name);        // Remove obsolete columns    for (const col of actualUsersColumns) {      if (!expectedUsersColumns.includes(col)) {        console.log(`  ❌ Removing obsolete column: users.${col}`);        await db.execute(sql`ALTER TABLE users DROP COLUMN IF EXISTS ${sql.identifier(col)}`);      }    }        // Ensure ID has default    await db.execute(sql`ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid()`);    console.log('  ✓ Users table cleaned\n');        // ============================================    // PART 2: Check and fix PROJECTS table    // ============================================    console.log('📋 PROJECTS TABLE:');    const projectsColumns = await db.execute(sql`      SELECT column_name, data_type, column_default      FROM information_schema.columns       WHERE table_name = 'projects'      ORDER BY ordinal_position    `);        console.log('Current columns:', projectsColumns.rows.map((r: any) => r.column_name).join(', '));        // Expected columns in projects table    const expectedProjectsColumns = ['id', 'title', 'user_id', 'session_id', 'stack_preference', 'context', 'artifacts', 'created_at', 'updated_at'];    const actualProjectsColumns = projectsColumns.rows.map((r: any) => r.column_name);        // Remove obsolete columns    for (const col of actualProjectsColumns) {      if (!expectedProjectsColumns.includes(col)) {        console.log(`  ❌ Removing obsolete column: projects.${col}`);        await db.execute(sql`ALTER TABLE projects DROP COLUMN IF EXISTS ${sql.identifier(col)}`);      }    }        // Ensure ID has default    await db.execute(sql`ALTER TABLE projects ALTER COLUMN id SET DEFAULT gen_random_uuid()`);        // Ensure stack_preference is text array with default    await db.execute(sql`ALTER TABLE projects ALTER COLUMN stack_preference SET DEFAULT '{}'::text[]`); Project Planner Prompt Library
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
999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566
import { sql } from 'drizzle-orm';import { db, pool } from './db';async function fixAllSchema() {  try {    console.log('🔍 Starting comprehensive schema audit...\n');        // ============================================    // PART 1: Check and fix USERS table    // ============================================    console.log('📋 USERS TABLE:');    const usersColumns = await db.execute(sql`      SELECT column_name, data_type, column_default      FROM information_schema.columns       WHERE table_name = 'users'      ORDER BY ordinal_position    `);        console.log('Current columns:', usersColumns.rows.map((r: any) => r.column_name).join(', '));        // Expected columns in users table    const expectedUsersColumns = ['id', 'email', 'first_name', 'last_name', 'profile_image_url', 'created_at', 'updated_at'];    const actualUsersColumns = usersColumns.rows.map((r: any) => r.column_name);        // Remove obsolete columns    for (const col of actualUsersColumns) {      if (!expectedUsersColumns.includes(col)) {        console.log(`  ❌ Removing obsolete column: users.${col}`);        await db.execute(sql`ALTER TABLE users DROP COLUMN IF EXISTS ${sql.identifier(col)}`);      }    }        // Ensure ID has default    await db.execute(sql`ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid()`);    console.log('  ✓ Users table cleaned\n');        // ============================================    // PART 2: Check and fix PROJECTS table    // ============================================    console.log('📋 PROJECTS TABLE:');    const projectsColumns = await db.execute(sql`      SELECT column_name, data_type, column_default      FROM information_schema.columns       WHERE table_name = 'projects'      ORDER BY ordinal_position    `);        console.log('Current columns:', projectsColumns.rows.map((r: any) => r.column_name).join(', '));        // Expected columns in projects table    const expectedProjectsColumns = ['id', 'title', 'user_id', 'session_id', 'stack_preference', 'context', 'artifacts', 'created_at', 'updated_at'];    const actualProjectsColumns = projectsColumns.rows.map((r: any) => r.column_name);        // Remove obsolete columns    for (const col of actualProjectsColumns) {      if (!expectedProjectsColumns.includes(col)) {        console.log(`  ❌ Removing obsolete column: projects.${col}`);        await db.execute(sql`ALTER TABLE projects DROP COLUMN IF EXISTS ${sql.identifier(col)}`);      }    }        // Ensure ID has default    await db.execute(sql`ALTER TABLE projects ALTER COLUMN id SET DEFAULT gen_random_uuid()`);        // Ensure stack_preference is text array with default    await db.execute(sql`ALTER TABLE projects ALTER COLUMN stack_preference SET DEFAULT '{}'::text[]`);
import { sql } from 'drizzle-orm';
import { db, pool } from './db';

async function fixAllSchema() {
  try {
    console.log('🔍 Starting comprehensive schema audit...\n');
    
    // ============================================
    // PART 1: Check and fix USERS table
    // ============================================
    console.log('📋 USERS TABLE:');
    const usersColumns = await db.execute(sql`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);
    
    console.log('Current columns:', usersColumns.rows.map((r: any) => r.column_name).join(', '));
    
    // Expected columns in users table
    const expectedUsersColumns = ['id', 'email', 'first_name', 'last_name', 'profile_image_url', 'created_at', 'updated_at'];
    const actualUsersColumns = usersColumns.rows.map((r: any) => r.column_name);
    
    // Remove obsolete columns
    for (const col of actualUsersColumns) {
      if (!expectedUsersColumns.includes(col)) {
        console.log(`  ❌ Removing obsolete column: users.${col}`);
        await db.execute(sql`ALTER TABLE users DROP COLUMN IF EXISTS ${sql.identifier(col)}`);
      }
    }
    
    // Ensure ID has default
    await db.execute(sql`ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid()`);
    console.log('  ✓ Users table cleaned\n');
    
    // ============================================
    // PART 2: Check and fix PROJECTS table
    // ============================================
    console.log('📋 PROJECTS TABLE:');
    const projectsColumns = await db.execute(sql`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns 
      WHERE table_name = 'projects'
      ORDER BY ordinal_position
    `);
    
    console.log('Current columns:', projectsColumns.rows.map((r: any) => r.column_name).join(', '));
    
    // Expected columns in projects table
    const expectedProjectsColumns = ['id', 'title', 'user_id', 'session_id', 'stack_preference', 'context', 'artifacts', 'created_at', 'updated_at'];
    const actualProjectsColumns = projectsColumns.rows.map((r: any) => r.column_name);
    
    // Remove obsolete columns
    for (const col of actualProjectsColumns) {
      if (!expectedProjectsColumns.includes(col)) {
        console.log(`  ❌ Removing obsolete column: projects.${col}`);
        await db.execute(sql`ALTER TABLE projects DROP COLUMN IF EXISTS ${sql.identifier(col)}`);
      }
    }
    
    // Ensure ID has default
    await db.execute(sql`ALTER TABLE projects ALTER COLUMN id SET DEFAULT gen_random_uuid()`);
    
    // Ensure stack_preference is text array with default
    await db.execute(sql`ALTER TABLE projects ALTER COLUMN stack_preference SET DEFAULT '{}'::text[]`);


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