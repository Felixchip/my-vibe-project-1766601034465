99991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162import type { Express, RequestHandler } from "express";import { createServer, type Server } from "http";import session from "express-session";import passport from "passport";import Stripe from "stripe";import { randomUUID } from "crypto";import { storage } from "./storage";import { PersistentFileStorage } from "./persistent-storage";import { setupGoogleAuth } from "./googleAuth";import { generateAllArtifacts, calculateCompletionPercentage, analyzeAndCreateProject } from "./services/generator";import { generateReplitZip, generatePromptPack, generateMarkdownReport, generateModularDocumentExport } from "./services/exporter";import { compileContext } from "./services/compiler";import { getAISuggestions } from "./services/vibe-ai";import { openai } from "./services/openai";import { PromptPDFGenerator } from "./services/pdf-generator";import { jwtService } from "./services/jwt";import { ExtensionAuthService } from "./services/extension-auth";import { insertProjectSchema, contextSchema, type Context } from "@shared/schema";// Initialize Stripelet stripe: Stripe | null = null;if (process.env.STRIPE_SECRET_KEY) {  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {    apiVersion: "2025-10-29.clover",  });}// Authentication middlewareconst isAuthenticated: RequestHandler = (req, res, next) => {  if (req.isAuthenticated()) {    return next();  }  res.status(401).json({ message: "Unauthorized" });};// Authentication middleware that accepts BOTH session cookies AND JWT bearer tokensconst authenticateSessionOrJWT: RequestHandler = (req, res, next) => {  // First try session authentication (cookies)  if (req.isAuthenticated()) {    return next();  }  // Then try JWT bearer token authentication  const authHeader = req.get('authorization');  if (!authHeader) {    return res.status(401).json({ message: "Missing or invalid authorization header" });  }  const [scheme, token] = authHeader.split(' ');  if (scheme !== 'Bearer') {    return res.status(401).json({ message: "Invalid authorization scheme" });  }  try {    const decoded = jwtService.verify(token);    if (!decoded) {      return res.status(401).json({ message: "Invalid or expired token" });    }    (req as any).user = {      id: decoded.userId,      email: decoded.email,      type: decoded.type, Project Planner Prompt Library
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
99991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162
import type { Express, RequestHandler } from "express";import { createServer, type Server } from "http";import session from "express-session";import passport from "passport";import Stripe from "stripe";import { randomUUID } from "crypto";import { storage } from "./storage";import { PersistentFileStorage } from "./persistent-storage";import { setupGoogleAuth } from "./googleAuth";import { generateAllArtifacts, calculateCompletionPercentage, analyzeAndCreateProject } from "./services/generator";import { generateReplitZip, generatePromptPack, generateMarkdownReport, generateModularDocumentExport } from "./services/exporter";import { compileContext } from "./services/compiler";import { getAISuggestions } from "./services/vibe-ai";import { openai } from "./services/openai";import { PromptPDFGenerator } from "./services/pdf-generator";import { jwtService } from "./services/jwt";import { ExtensionAuthService } from "./services/extension-auth";import { insertProjectSchema, contextSchema, type Context } from "@shared/schema";// Initialize Stripelet stripe: Stripe | null = null;if (process.env.STRIPE_SECRET_KEY) {  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {    apiVersion: "2025-10-29.clover",  });}// Authentication middlewareconst isAuthenticated: RequestHandler = (req, res, next) => {  if (req.isAuthenticated()) {    return next();  }  res.status(401).json({ message: "Unauthorized" });};// Authentication middleware that accepts BOTH session cookies AND JWT bearer tokensconst authenticateSessionOrJWT: RequestHandler = (req, res, next) => {  // First try session authentication (cookies)  if (req.isAuthenticated()) {    return next();  }  // Then try JWT bearer token authentication  const authHeader = req.get('authorization');  if (!authHeader) {    return res.status(401).json({ message: "Missing or invalid authorization header" });  }  const [scheme, token] = authHeader.split(' ');  if (scheme !== 'Bearer') {    return res.status(401).json({ message: "Invalid authorization scheme" });  }  try {    const decoded = jwtService.verify(token);    if (!decoded) {      return res.status(401).json({ message: "Invalid or expired token" });    }    (req as any).user = {      id: decoded.userId,      email: decoded.email,      type: decoded.type,
import type { Express, RequestHandler } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import passport from "passport";
import Stripe from "stripe";
import { randomUUID } from "crypto";
import { storage } from "./storage";
import { PersistentFileStorage } from "./persistent-storage";
import { setupGoogleAuth } from "./googleAuth";
import { generateAllArtifacts, calculateCompletionPercentage, analyzeAndCreateProject } from "./services/generator";
import { generateReplitZip, generatePromptPack, generateMarkdownReport, generateModularDocumentExport } from "./services/exporter";
import { compileContext } from "./services/compiler";
import { getAISuggestions } from "./services/vibe-ai";
import { openai } from "./services/openai";
import { PromptPDFGenerator } from "./services/pdf-generator";
import { jwtService } from "./services/jwt";
import { ExtensionAuthService } from "./services/extension-auth";
import { insertProjectSchema, contextSchema, type Context } from "@shared/schema";

// Initialize Stripe
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
  });
}

// Authentication middleware
const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Authentication middleware that accepts BOTH session cookies AND JWT bearer tokens
const authenticateSessionOrJWT: RequestHandler = (req, res, next) => {
  // First try session authentication (cookies)
  if (req.isAuthenticated()) {
    return next();
  }

  // Then try JWT bearer token authentication
  const authHeader = req.get('authorization');
  if (!authHeader) {
    return res.status(401).json({ message: "Missing or invalid authorization header" });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer') {
    return res.status(401).json({ message: "Invalid authorization scheme" });
  }

  try {
    const decoded = jwtService.verify(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    (req as any).user = {
      id: decoded.userId,
      email: decoded.email,
      type: decoded.type,


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