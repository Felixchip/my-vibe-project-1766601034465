9991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768import * as client from "openid-client";import { Strategy, type VerifyFunction } from "openid-client/passport";import passport from "passport";import session from "express-session";import type { Express, RequestHandler } from "express";import memoize from "memoizee";import connectPg from "connect-pg-simple";import createMemoryStore from "memorystore";import { storage } from "./storage";if (!process.env.REPLIT_DOMAINS) {  throw new Error("Environment variable REPLIT_DOMAINS not provided");}const getOidcConfig = memoize(  async () => {    return await client.discovery(      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),      process.env.REPL_ID!    );  },  { maxAge: 3600 * 1000 });export function getSession() {  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week    // Use the session store from storage (will be PostgreSQL if DB is connected, memory otherwise)  return session({    secret: process.env.SESSION_SECRET!,    store: storage.sessionStore,    resave: false,    saveUninitialized: false,    cookie: {      httpOnly: true,      secure: true,      maxAge: sessionTtl,    },  });}function updateUserSession(  user: any,  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers) {  user.claims = tokens.claims();  user.access_token = tokens.access_token;  user.refresh_token = tokens.refresh_token;  user.expires_at = user.claims?.exp;}async function upsertUser(  claims: any,) {  return await storage.upsertUser({    id: claims["sub"],    email: claims["email"],    firstName: claims["first_name"],    lastName: claims["last_name"],    profileImageUrl: claims["profile_image_url"],  });}export async function setupAuth(app: Express) {  app.set("trust proxy", 1);  app.use(getSession());  app.use(passport.initialize()); Project Planner Prompt Library
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
9991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768
import * as client from "openid-client";import { Strategy, type VerifyFunction } from "openid-client/passport";import passport from "passport";import session from "express-session";import type { Express, RequestHandler } from "express";import memoize from "memoizee";import connectPg from "connect-pg-simple";import createMemoryStore from "memorystore";import { storage } from "./storage";if (!process.env.REPLIT_DOMAINS) {  throw new Error("Environment variable REPLIT_DOMAINS not provided");}const getOidcConfig = memoize(  async () => {    return await client.discovery(      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),      process.env.REPL_ID!    );  },  { maxAge: 3600 * 1000 });export function getSession() {  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week    // Use the session store from storage (will be PostgreSQL if DB is connected, memory otherwise)  return session({    secret: process.env.SESSION_SECRET!,    store: storage.sessionStore,    resave: false,    saveUninitialized: false,    cookie: {      httpOnly: true,      secure: true,      maxAge: sessionTtl,    },  });}function updateUserSession(  user: any,  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers) {  user.claims = tokens.claims();  user.access_token = tokens.access_token;  user.refresh_token = tokens.refresh_token;  user.expires_at = user.claims?.exp;}async function upsertUser(  claims: any,) {  return await storage.upsertUser({    id: claims["sub"],    email: claims["email"],    firstName: claims["first_name"],    lastName: claims["last_name"],    profileImageUrl: claims["profile_image_url"],  });}export async function setupAuth(app: Express) {  app.set("trust proxy", 1);  app.use(getSession());  app.use(passport.initialize());
import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";
import { storage } from "./storage";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  // Use the session store from storage (will be PostgreSQL if DB is connected, memory otherwise)
  return session({
    secret: process.env.SESSION_SECRET!,
    store: storage.sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  return await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());


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