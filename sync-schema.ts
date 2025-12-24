999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101import { sql } from 'drizzle-orm';import { db, pool } from './db';async function syncSchema() {  try {    console.log('Starting schema sync...');        // Fix projects table ID column default    console.log('Checking projects table ID default...');    await db.execute(sql`      ALTER TABLE projects       ALTER COLUMN id SET DEFAULT gen_random_uuid()    `);    console.log('✓ Set default for projects.id');        // Fix other tables' ID defaults    const tables = ['users', 'project_versions', 'templates', 'task_groups', 'tasks', 'mind_maps', 'mind_map_nodes', 'mind_map_edges'];    for (const table of tables) {      try {        await db.execute(sql`          ALTER TABLE ${sql.identifier(table)}           ALTER COLUMN id SET DEFAULT gen_random_uuid()        `);        console.log(`✓ Set default for ${table}.id`);      } catch (error: any) {        if (error.code === '42P01') {          console.log(`  Table ${table} does not exist yet, skipping...`);        } else {          console.log(`  Warning: Could not set default for ${table}.id:`, error.message);        }      }    }        // Remove obsolete type column if it exists    const typeColCheck = await db.execute(sql`      SELECT column_name      FROM information_schema.columns       WHERE table_name = 'projects' AND column_name = 'type'    `);        if (typeColCheck.rows.length > 0) {      console.log('Removing obsolete type column from projects...');      await db.execute(sql`        ALTER TABLE projects         DROP COLUMN IF EXISTS type      `);      console.log('✓ Removed type column');    }        // Remove obsolete version_number column from project_versions if it exists    const versionNumberCheck = await db.execute(sql`      SELECT column_name      FROM information_schema.columns       WHERE table_name = 'project_versions' AND column_name = 'version_number'    `);        if (versionNumberCheck.rows.length > 0) {      console.log('Removing obsolete version_number column from project_versions...');      await db.execute(sql`        ALTER TABLE project_versions         DROP COLUMN IF EXISTS version_number      `);      console.log('✓ Removed version_number column');    }        // Check if stack_preference column exists and fix it    const result = await db.execute(sql`      SELECT column_name, data_type      FROM information_schema.columns       WHERE table_name = 'projects' AND column_name = 'stack_preference'    `);        if (result.rows.length === 0) {      console.log('Adding missing stack_preference column...');      await db.execute(sql`        ALTER TABLE projects         ADD COLUMN stack_preference text[] DEFAULT '{}'::text[] NOT NULL      `);      console.log('✓ Added stack_preference column');    } else {      console.log('✓ stack_preference column exists');      // Make sure it's the right type (array)      await db.execute(sql`        ALTER TABLE projects         ALTER COLUMN stack_preference SET DEFAULT '{}'::text[]      `);      console.log('✓ Set proper default for stack_preference');    }        console.log('\n✅ Schema sync completed successfully!');    process.exit(0);  } catch (error) {    console.error('Error syncing schema:', error);    process.exit(1);  } finally {    await pool.end();  }}syncSchema(); Project Planner Prompt Library
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
999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101
import { sql } from 'drizzle-orm';import { db, pool } from './db';async function syncSchema() {  try {    console.log('Starting schema sync...');        // Fix projects table ID column default    console.log('Checking projects table ID default...');    await db.execute(sql`      ALTER TABLE projects       ALTER COLUMN id SET DEFAULT gen_random_uuid()    `);    console.log('✓ Set default for projects.id');        // Fix other tables' ID defaults    const tables = ['users', 'project_versions', 'templates', 'task_groups', 'tasks', 'mind_maps', 'mind_map_nodes', 'mind_map_edges'];    for (const table of tables) {      try {        await db.execute(sql`          ALTER TABLE ${sql.identifier(table)}           ALTER COLUMN id SET DEFAULT gen_random_uuid()        `);        console.log(`✓ Set default for ${table}.id`);      } catch (error: any) {        if (error.code === '42P01') {          console.log(`  Table ${table} does not exist yet, skipping...`);        } else {          console.log(`  Warning: Could not set default for ${table}.id:`, error.message);        }      }    }        // Remove obsolete type column if it exists    const typeColCheck = await db.execute(sql`      SELECT column_name      FROM information_schema.columns       WHERE table_name = 'projects' AND column_name = 'type'    `);        if (typeColCheck.rows.length > 0) {      console.log('Removing obsolete type column from projects...');      await db.execute(sql`        ALTER TABLE projects         DROP COLUMN IF EXISTS type      `);      console.log('✓ Removed type column');    }        // Remove obsolete version_number column from project_versions if it exists    const versionNumberCheck = await db.execute(sql`      SELECT column_name      FROM information_schema.columns       WHERE table_name = 'project_versions' AND column_name = 'version_number'    `);        if (versionNumberCheck.rows.length > 0) {      console.log('Removing obsolete version_number column from project_versions...');      await db.execute(sql`        ALTER TABLE project_versions         DROP COLUMN IF EXISTS version_number      `);      console.log('✓ Removed version_number column');    }        // Check if stack_preference column exists and fix it    const result = await db.execute(sql`      SELECT column_name, data_type      FROM information_schema.columns       WHERE table_name = 'projects' AND column_name = 'stack_preference'    `);        if (result.rows.length === 0) {      console.log('Adding missing stack_preference column...');      await db.execute(sql`        ALTER TABLE projects         ADD COLUMN stack_preference text[] DEFAULT '{}'::text[] NOT NULL      `);      console.log('✓ Added stack_preference column');    } else {      console.log('✓ stack_preference column exists');      // Make sure it's the right type (array)      await db.execute(sql`        ALTER TABLE projects         ALTER COLUMN stack_preference SET DEFAULT '{}'::text[]      `);      console.log('✓ Set proper default for stack_preference');    }        console.log('\n✅ Schema sync completed successfully!');    process.exit(0);  } catch (error) {    console.error('Error syncing schema:', error);    process.exit(1);  } finally {    await pool.end();  }}syncSchema();
import { sql } from 'drizzle-orm';
import { db, pool } from './db';

async function syncSchema() {
  try {
    console.log('Starting schema sync...');
    
    // Fix projects table ID column default
    console.log('Checking projects table ID default...');
    await db.execute(sql`
      ALTER TABLE projects 
      ALTER COLUMN id SET DEFAULT gen_random_uuid()
    `);
    console.log('✓ Set default for projects.id');
    
    // Fix other tables' ID defaults
    const tables = ['users', 'project_versions', 'templates', 'task_groups', 'tasks', 'mind_maps', 'mind_map_nodes', 'mind_map_edges'];
    for (const table of tables) {
      try {
        await db.execute(sql`
          ALTER TABLE ${sql.identifier(table)} 
          ALTER COLUMN id SET DEFAULT gen_random_uuid()
        `);
        console.log(`✓ Set default for ${table}.id`);
      } catch (error: any) {
        if (error.code === '42P01') {
          console.log(`  Table ${table} does not exist yet, skipping...`);
        } else {
          console.log(`  Warning: Could not set default for ${table}.id:`, error.message);
        }
      }
    }
    
    // Remove obsolete type column if it exists
    const typeColCheck = await db.execute(sql`
      SELECT column_name
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'type'
    `);
    
    if (typeColCheck.rows.length > 0) {
      console.log('Removing obsolete type column from projects...');
      await db.execute(sql`
        ALTER TABLE projects 
        DROP COLUMN IF EXISTS type
      `);
      console.log('✓ Removed type column');
    }
    
    // Remove obsolete version_number column from project_versions if it exists
    const versionNumberCheck = await db.execute(sql`
      SELECT column_name
      FROM information_schema.columns 
      WHERE table_name = 'project_versions' AND column_name = 'version_number'
    `);
    
    if (versionNumberCheck.rows.length > 0) {
      console.log('Removing obsolete version_number column from project_versions...');
      await db.execute(sql`
        ALTER TABLE project_versions 
        DROP COLUMN IF EXISTS version_number
      `);
      console.log('✓ Removed version_number column');
    }
    
    // Check if stack_preference column exists and fix it
    const result = await db.execute(sql`
      SELECT column_name, data_type
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'stack_preference'
    `);
    
    if (result.rows.length === 0) {
      console.log('Adding missing stack_preference column...');
      await db.execute(sql`
        ALTER TABLE projects 
        ADD COLUMN stack_preference text[] DEFAULT '{}'::text[] NOT NULL
      `);
      console.log('✓ Added stack_preference column');
    } else {
      console.log('✓ stack_preference column exists');
      // Make sure it's the right type (array)
      await db.execute(sql`
        ALTER TABLE projects 
        ALTER COLUMN stack_preference SET DEFAULT '{}'::text[]
      `);
      console.log('✓ Set proper default for stack_preference');
    }
    
    console.log('\n✅ Schema sync completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing schema:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

syncSchema();



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