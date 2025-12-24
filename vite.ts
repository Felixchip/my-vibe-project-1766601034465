991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768697071727374757677787980818283848586import express, { type Express } from "express";import fs from "fs";import path from "path";import { createServer as createViteServer, createLogger } from "vite";import { type Server } from "http";import viteConfig from "../vite.config";import { nanoid } from "nanoid";const viteLogger = createLogger();export function log(message: string, source = "express") {  const formattedTime = new Date().toLocaleTimeString("en-US", {    hour: "numeric",    minute: "2-digit",    second: "2-digit",    hour12: true,  });  console.log(`${formattedTime} [${source}] ${message}`);}export async function setupVite(app: Express, server: Server) {  const serverOptions = {    middlewareMode: true,    hmr: { server },    allowedHosts: true as const,  };  const vite = await createViteServer({    ...viteConfig,    configFile: false,    customLogger: {      ...viteLogger,      error: (msg, options) => {        viteLogger.error(msg, options);        process.exit(1);      },    },    server: serverOptions,    appType: "custom",  });  app.use(vite.middlewares);  app.use("*", async (req, res, next) => {    const url = req.originalUrl;    try {      const clientTemplate = path.resolve(        import.meta.dirname,        "..",        "client",        "index.html",      );      // always reload the index.html file from disk incase it changes      let template = await fs.promises.readFile(clientTemplate, "utf-8");      template = template.replace(        `src="/src/main.tsx"`,        `src="/src/main.tsx?v=${nanoid()}"`,      );      const page = await vite.transformIndexHtml(url, template);      res.status(200).set({ "Content-Type": "text/html" }).end(page);    } catch (e) {      vite.ssrFixStacktrace(e as Error);      next(e);    }  });}export function serveStatic(app: Express) {  const distPath = path.resolve(import.meta.dirname, "public");  if (!fs.existsSync(distPath)) {    throw new Error(      `Could not find the build directory: ${distPath}, make sure to build the client first`,    );  }  app.use(express.static(distPath));  // fall through to index.html if the file doesn't exist  app.use("*", (_req, res) => {    res.sendFile(path.resolve(distPath, "index.html"));  });} Project Planner Prompt Library
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
991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768697071727374757677787980818283848586
import express, { type Express } from "express";import fs from "fs";import path from "path";import { createServer as createViteServer, createLogger } from "vite";import { type Server } from "http";import viteConfig from "../vite.config";import { nanoid } from "nanoid";const viteLogger = createLogger();export function log(message: string, source = "express") {  const formattedTime = new Date().toLocaleTimeString("en-US", {    hour: "numeric",    minute: "2-digit",    second: "2-digit",    hour12: true,  });  console.log(`${formattedTime} [${source}] ${message}`);}export async function setupVite(app: Express, server: Server) {  const serverOptions = {    middlewareMode: true,    hmr: { server },    allowedHosts: true as const,  };  const vite = await createViteServer({    ...viteConfig,    configFile: false,    customLogger: {      ...viteLogger,      error: (msg, options) => {        viteLogger.error(msg, options);        process.exit(1);      },    },    server: serverOptions,    appType: "custom",  });  app.use(vite.middlewares);  app.use("*", async (req, res, next) => {    const url = req.originalUrl;    try {      const clientTemplate = path.resolve(        import.meta.dirname,        "..",        "client",        "index.html",      );      // always reload the index.html file from disk incase it changes      let template = await fs.promises.readFile(clientTemplate, "utf-8");      template = template.replace(        `src="/src/main.tsx"`,        `src="/src/main.tsx?v=${nanoid()}"`,      );      const page = await vite.transformIndexHtml(url, template);      res.status(200).set({ "Content-Type": "text/html" }).end(page);    } catch (e) {      vite.ssrFixStacktrace(e as Error);      next(e);    }  });}export function serveStatic(app: Express) {  const distPath = path.resolve(import.meta.dirname, "public");  if (!fs.existsSync(distPath)) {    throw new Error(      `Could not find the build directory: ${distPath}, make sure to build the client first`,    );  }  app.use(express.static(distPath));  // fall through to index.html if the file doesn't exist  app.use("*", (_req, res) => {    res.sendFile(path.resolve(distPath, "index.html"));  });}
import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
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