999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132import express, { type Request, Response, NextFunction } from "express";import { registerRoutes } from "./routes";import { setupVite, serveStatic, log } from "./vite";const app = express();// Stripe webhook needs raw body for signature verificationapp.post('/api/webhooks/stripe', express.raw({type: 'application/json'}));app.use(express.json());app.use(express.urlencoded({ extended: false }));app.use((req, res, next) => {  const start = Date.now();  const path = req.path;  let capturedJsonResponse: Record<string, any> | undefined = undefined;  const originalResJson = res.json;  res.json = function (bodyJson, ...args) {    capturedJsonResponse = bodyJson;    return originalResJson.apply(res, [bodyJson, ...args]);  };  res.on("finish", () => {    const duration = Date.now() - start;    if (path.startsWith("/api")) {      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;      if (capturedJsonResponse) {        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;      }      if (logLine.length > 80) {        logLine = logLine.slice(0, 79) + "…";      }      log(logLine);    }  });  next();});(async () => {  try {    log('Starting server initialization...');        const server = await registerRoutes(app);    log('Routes registered successfully');    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {      const status = err.status || err.statusCode || 500;      const message = err.message || "Internal Server Error";      log(`Error: ${status} - ${message}`);      res.status(status).json({ message });    });    // importantly only setup vite in development and after    // setting up all the other routes so the catch-all route    // doesn't interfere with the other routes    if (app.get("env") === "development") {      log('Setting up Vite development server...');      await setupVite(app, server);    } else {      log('Setting up static file serving for production...');      serveStatic(app);    }    // ALWAYS serve the app on the port specified in the environment variable PORT    // Other ports are firewalled. Default to 5000 if not specified.    // this serves both the API and the client.    // It is the only port that is not firewalled.    const PORT = process.env.PORT || '5000';    const port = parseInt(PORT, 10);        if (isNaN(port)) {      throw new Error(`Invalid PORT value: ${PORT}`);    }    log(`Attempting to bind to 0.0.0.0:${port}...`);    server.listen({      port,      host: "0.0.0.0",      reusePort: true,    }, () => {      log(`✓ Server successfully started on 0.0.0.0:${port}`);      log(`Environment: ${app.get("env")}`);    });    // Handle server errors    server.on('error', (error: NodeJS.ErrnoException) => {      if (error.code === 'EADDRINUSE') {        log(`ERROR: Port ${port} is already in use`);      } else if (error.code === 'EACCES') {        log(`ERROR: Permission denied to bind to port ${port}`);      } else {        log(`ERROR: Server error - ${error.message}`);      }      console.error('Server error details:', error);      process.exit(1);    });    // Handle process termination gracefully    process.on('SIGTERM', () => {      log('SIGTERM received, shutting down gracefully...');      server.close(() => {        log('Server closed');        process.exit(0);      });    });    process.on('SIGINT', () => {      log('SIGINT received, shutting down gracefully...');      server.close(() => {        log('Server closed');        process.exit(0);      });    });  } catch (error) {    console.error('FATAL ERROR during server initialization:', error);    if (error instanceof Error) {      console.error('Error stack:', error.stack);    }    process.exit(1);  }})().catch((error) => {  console.error('Unhandled error in server startup:', error);  process.exit(1);}); Project Planner Prompt Library
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
999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132
import express, { type Request, Response, NextFunction } from "express";import { registerRoutes } from "./routes";import { setupVite, serveStatic, log } from "./vite";const app = express();// Stripe webhook needs raw body for signature verificationapp.post('/api/webhooks/stripe', express.raw({type: 'application/json'}));app.use(express.json());app.use(express.urlencoded({ extended: false }));app.use((req, res, next) => {  const start = Date.now();  const path = req.path;  let capturedJsonResponse: Record<string, any> | undefined = undefined;  const originalResJson = res.json;  res.json = function (bodyJson, ...args) {    capturedJsonResponse = bodyJson;    return originalResJson.apply(res, [bodyJson, ...args]);  };  res.on("finish", () => {    const duration = Date.now() - start;    if (path.startsWith("/api")) {      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;      if (capturedJsonResponse) {        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;      }      if (logLine.length > 80) {        logLine = logLine.slice(0, 79) + "…";      }      log(logLine);    }  });  next();});(async () => {  try {    log('Starting server initialization...');        const server = await registerRoutes(app);    log('Routes registered successfully');    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {      const status = err.status || err.statusCode || 500;      const message = err.message || "Internal Server Error";      log(`Error: ${status} - ${message}`);      res.status(status).json({ message });    });    // importantly only setup vite in development and after    // setting up all the other routes so the catch-all route    // doesn't interfere with the other routes    if (app.get("env") === "development") {      log('Setting up Vite development server...');      await setupVite(app, server);    } else {      log('Setting up static file serving for production...');      serveStatic(app);    }    // ALWAYS serve the app on the port specified in the environment variable PORT    // Other ports are firewalled. Default to 5000 if not specified.    // this serves both the API and the client.    // It is the only port that is not firewalled.    const PORT = process.env.PORT || '5000';    const port = parseInt(PORT, 10);        if (isNaN(port)) {      throw new Error(`Invalid PORT value: ${PORT}`);    }    log(`Attempting to bind to 0.0.0.0:${port}...`);    server.listen({      port,      host: "0.0.0.0",      reusePort: true,    }, () => {      log(`✓ Server successfully started on 0.0.0.0:${port}`);      log(`Environment: ${app.get("env")}`);    });    // Handle server errors    server.on('error', (error: NodeJS.ErrnoException) => {      if (error.code === 'EADDRINUSE') {        log(`ERROR: Port ${port} is already in use`);      } else if (error.code === 'EACCES') {        log(`ERROR: Permission denied to bind to port ${port}`);      } else {        log(`ERROR: Server error - ${error.message}`);      }      console.error('Server error details:', error);      process.exit(1);    });    // Handle process termination gracefully    process.on('SIGTERM', () => {      log('SIGTERM received, shutting down gracefully...');      server.close(() => {        log('Server closed');        process.exit(0);      });    });    process.on('SIGINT', () => {      log('SIGINT received, shutting down gracefully...');      server.close(() => {        log('Server closed');        process.exit(0);      });    });  } catch (error) {    console.error('FATAL ERROR during server initialization:', error);    if (error instanceof Error) {      console.error('Error stack:', error.stack);    }    process.exit(1);  }})().catch((error) => {  console.error('Unhandled error in server startup:', error);  process.exit(1);});
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Stripe webhook needs raw body for signature verification
app.post('/api/webhooks/stripe', express.raw({type: 'application/json'}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    log('Starting server initialization...');
    
    const server = await registerRoutes(app);
    log('Routes registered successfully');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      log(`Error: ${status} - ${message}`);
      res.status(status).json({ message });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      log('Setting up Vite development server...');
      await setupVite(app, server);
    } else {
      log('Setting up static file serving for production...');
      serveStatic(app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const PORT = process.env.PORT || '5000';
    const port = parseInt(PORT, 10);
    
    if (isNaN(port)) {
      throw new Error(`Invalid PORT value: ${PORT}`);
    }

    log(`Attempting to bind to 0.0.0.0:${port}...`);

    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`✓ Server successfully started on 0.0.0.0:${port}`);
      log(`Environment: ${app.get("env")}`);
    });

    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        log(`ERROR: Port ${port} is already in use`);
      } else if (error.code === 'EACCES') {
        log(`ERROR: Permission denied to bind to port ${port}`);
      } else {
        log(`ERROR: Server error - ${error.message}`);
      }
      console.error('Server error details:', error);
      process.exit(1);
    });

    // Handle process termination gracefully
    process.on('SIGTERM', () => {
      log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      log('SIGINT received, shutting down gracefully...');
      server.close(() => {
        log('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('FATAL ERROR during server initialization:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
})().catch((error) => {
  console.error('Unhandled error in server startup:', error);
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