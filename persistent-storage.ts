999912345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152import { type User, type InsertUser, type UpsertUser, type Project, type InsertProject, type ProjectVersion, type InsertProjectVersion, type Template, type InsertTemplate, type Prompt, type InsertPrompt, type TaskGroup, type InsertTaskGroup, type Task, type InsertTask, type Favorite, type InsertFavorite, type PromptHistory, type InsertPromptHistory, type ReferenceCapture, type InsertReferenceCapture, type ConstitutionRule, type InsertConstitutionRule, type GithubToken, type InsertGithubToken } from "@shared/schema";import { randomUUID } from "crypto";import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";import { dirname } from "path";import session from "express-session";import createMemoryStore from "memorystore";import { templateData } from "./data/templates";import { promptsData } from "./data/prompts";const DATA_FILE = './data/storage.json';const SESSIONS_FILE = './data/sessions.json';const MemoryStore = createMemoryStore(session);// File-based session store that persists across server restartsclass FileSessionStore extends session.Store {  private sessions: Record<string, any> = {};  private checkInterval: NodeJS.Timeout;  constructor(options?: { checkPeriod?: number }) {    super();    this.loadSessions();        // Prune expired sessions every 24 hours    const checkPeriod = options?.checkPeriod || 86400000;    this.checkInterval = setInterval(() => this.pruneSessions(), checkPeriod);  }  private loadSessions(): void {    try {      if (existsSync(SESSIONS_FILE)) {        const raw = readFileSync(SESSIONS_FILE, 'utf8');        this.sessions = JSON.parse(raw);        console.log(`✓ Loaded ${Object.keys(this.sessions).length} persisted sessions`);      }    } catch (error) {      console.warn('Failed to load persisted sessions:', error);      this.sessions = {};    }  }  private saveSessions(): void {    try {      mkdirSync(dirname(SESSIONS_FILE), { recursive: true });      writeFileSync(SESSIONS_FILE, JSON.stringify(this.sessions, null, 2), 'utf8');    } catch (error) {      console.error('Failed to save sessions:', error);    }  }  private pruneSessions(): void {    const now = Date.now();    let pruned = 0; Project Planner Prompt Library
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
999912345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152
import { type User, type InsertUser, type UpsertUser, type Project, type InsertProject, type ProjectVersion, type InsertProjectVersion, type Template, type InsertTemplate, type Prompt, type InsertPrompt, type TaskGroup, type InsertTaskGroup, type Task, type InsertTask, type Favorite, type InsertFavorite, type PromptHistory, type InsertPromptHistory, type ReferenceCapture, type InsertReferenceCapture, type ConstitutionRule, type InsertConstitutionRule, type GithubToken, type InsertGithubToken } from "@shared/schema";import { randomUUID } from "crypto";import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";import { dirname } from "path";import session from "express-session";import createMemoryStore from "memorystore";import { templateData } from "./data/templates";import { promptsData } from "./data/prompts";const DATA_FILE = './data/storage.json';const SESSIONS_FILE = './data/sessions.json';const MemoryStore = createMemoryStore(session);// File-based session store that persists across server restartsclass FileSessionStore extends session.Store {  private sessions: Record<string, any> = {};  private checkInterval: NodeJS.Timeout;  constructor(options?: { checkPeriod?: number }) {    super();    this.loadSessions();        // Prune expired sessions every 24 hours    const checkPeriod = options?.checkPeriod || 86400000;    this.checkInterval = setInterval(() => this.pruneSessions(), checkPeriod);  }  private loadSessions(): void {    try {      if (existsSync(SESSIONS_FILE)) {        const raw = readFileSync(SESSIONS_FILE, 'utf8');        this.sessions = JSON.parse(raw);        console.log(`✓ Loaded ${Object.keys(this.sessions).length} persisted sessions`);      }    } catch (error) {      console.warn('Failed to load persisted sessions:', error);      this.sessions = {};    }  }  private saveSessions(): void {    try {      mkdirSync(dirname(SESSIONS_FILE), { recursive: true });      writeFileSync(SESSIONS_FILE, JSON.stringify(this.sessions, null, 2), 'utf8');    } catch (error) {      console.error('Failed to save sessions:', error);    }  }  private pruneSessions(): void {    const now = Date.now();    let pruned = 0;
import { type User, type InsertUser, type UpsertUser, type Project, type InsertProject, type ProjectVersion, type InsertProjectVersion, type Template, type InsertTemplate, type Prompt, type InsertPrompt, type TaskGroup, type InsertTaskGroup, type Task, type InsertTask, type Favorite, type InsertFavorite, type PromptHistory, type InsertPromptHistory, type ReferenceCapture, type InsertReferenceCapture, type ConstitutionRule, type InsertConstitutionRule, type GithubToken, type InsertGithubToken } from "@shared/schema";
import { randomUUID } from "crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import session from "express-session";
import createMemoryStore from "memorystore";
import { templateData } from "./data/templates";
import { promptsData } from "./data/prompts";

const DATA_FILE = './data/storage.json';
const SESSIONS_FILE = './data/sessions.json';
const MemoryStore = createMemoryStore(session);

// File-based session store that persists across server restarts
class FileSessionStore extends session.Store {
  private sessions: Record<string, any> = {};
  private checkInterval: NodeJS.Timeout;

  constructor(options?: { checkPeriod?: number }) {
    super();
    this.loadSessions();
    
    // Prune expired sessions every 24 hours
    const checkPeriod = options?.checkPeriod || 86400000;
    this.checkInterval = setInterval(() => this.pruneSessions(), checkPeriod);
  }

  private loadSessions(): void {
    try {
      if (existsSync(SESSIONS_FILE)) {
        const raw = readFileSync(SESSIONS_FILE, 'utf8');
        this.sessions = JSON.parse(raw);
        console.log(`✓ Loaded ${Object.keys(this.sessions).length} persisted sessions`);
      }
    } catch (error) {
      console.warn('Failed to load persisted sessions:', error);
      this.sessions = {};
    }
  }

  private saveSessions(): void {
    try {
      mkdirSync(dirname(SESSIONS_FILE), { recursive: true });
      writeFileSync(SESSIONS_FILE, JSON.stringify(this.sessions, null, 2), 'utf8');
    } catch (error) {
      console.error('Failed to save sessions:', error);
    }
  }

  private pruneSessions(): void {
    const now = Date.now();
    let pruned = 0;


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