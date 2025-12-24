9912345678910111213141516171819202122232425262728293031323334353637383940414243import { sql } from 'drizzle-orm';import { db, pool } from './db';async function resetAndMigrate() {  try {    console.log('🗑️  Dropping all existing tables...\n');        // Drop all tables in correct order (respecting foreign keys)    const tables = [      'tasks',      'task_groups',       'mind_maps',      'project_versions',      'projects',      'templates',      'users',      'sessions',      '__drizzle_migrations'    ];        for (const table of tables) {      try {        await db.execute(sql`DROP TABLE IF EXISTS ${sql.identifier(table)} CASCADE`);        console.log(`  ✓ Dropped ${table}`);      } catch (error: any) {        console.log(`  ⚠️  ${table} doesn't exist`);      }    }        console.log('\n✅ All tables dropped. Now run: tsx server/apply-migrations.ts');    console.log('   Then run: tsx server/fix-templates.ts to restore templates\n');        process.exit(0);  } catch (error) {    console.error('❌ Error:', error);    process.exit(1);  } finally {    await pool.end();  }}resetAndMigrate(); Project Planner Prompt Library
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
9912345678910111213141516171819202122232425262728293031323334353637383940414243
import { sql } from 'drizzle-orm';import { db, pool } from './db';async function resetAndMigrate() {  try {    console.log('🗑️  Dropping all existing tables...\n');        // Drop all tables in correct order (respecting foreign keys)    const tables = [      'tasks',      'task_groups',       'mind_maps',      'project_versions',      'projects',      'templates',      'users',      'sessions',      '__drizzle_migrations'    ];        for (const table of tables) {      try {        await db.execute(sql`DROP TABLE IF EXISTS ${sql.identifier(table)} CASCADE`);        console.log(`  ✓ Dropped ${table}`);      } catch (error: any) {        console.log(`  ⚠️  ${table} doesn't exist`);      }    }        console.log('\n✅ All tables dropped. Now run: tsx server/apply-migrations.ts');    console.log('   Then run: tsx server/fix-templates.ts to restore templates\n');        process.exit(0);  } catch (error) {    console.error('❌ Error:', error);    process.exit(1);  } finally {    await pool.end();  }}resetAndMigrate();
import { sql } from 'drizzle-orm';
import { db, pool } from './db';

async function resetAndMigrate() {
  try {
    console.log('🗑️  Dropping all existing tables...\n');
    
    // Drop all tables in correct order (respecting foreign keys)
    const tables = [
      'tasks',
      'task_groups', 
      'mind_maps',
      'project_versions',
      'projects',
      'templates',
      'users',
      'sessions',
      '__drizzle_migrations'
    ];
    
    for (const table of tables) {
      try {
        await db.execute(sql`DROP TABLE IF EXISTS ${sql.identifier(table)} CASCADE`);
        console.log(`  ✓ Dropped ${table}`);
      } catch (error: any) {
        console.log(`  ⚠️  ${table} doesn't exist`);
      }
    }
    
    console.log('\n✅ All tables dropped. Now run: tsx server/apply-migrations.ts');
    console.log('   Then run: tsx server/fix-templates.ts to restore templates\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

resetAndMigrate();



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