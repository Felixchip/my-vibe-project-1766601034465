999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114import passport from "passport";import { Strategy as GoogleStrategy } from "passport-google-oauth20";import type { Express } from "express";import { storage } from "./storage";export function setupGoogleAuth(app: Express) {  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");  }  // Use custom domain for OAuth callback  const callbackURL = "https://vibekit.cc/auth/google/callback";  console.log(`✓ Setting up Google OAuth with callback: ${callbackURL}`);  // Configure Google OAuth Strategy  passport.use(    new GoogleStrategy(      {        clientID: process.env.GOOGLE_CLIENT_ID,        clientSecret: process.env.GOOGLE_CLIENT_SECRET,        callbackURL,        scope: ["profile", "email"],      },      async (accessToken, refreshToken, profile, done) => {        try {          console.log('Google OAuth callback triggered for user:', profile.id);          console.log('User email:', profile.emails?.[0]?.value);          console.log('User name:', profile.name?.givenName, profile.name?.familyName);                    // Upsert user in database          const user = await storage.upsertUser({            id: profile.id,            email: profile.emails?.[0]?.value ?? null,            firstName: profile.name?.givenName ?? null,            lastName: profile.name?.familyName ?? null,            profileImageUrl: profile.photos?.[0]?.value ?? null,          });          console.log('User successfully upserted:', user.id, user.email);          done(null, user);        } catch (error) {          console.error('Error upserting user in Google OAuth callback:', error);          done(error as Error);        }      }    )  );  // Serialize user to session  passport.serializeUser((user: any, done) => {    done(null, user.id);  });  // Deserialize user from session  passport.deserializeUser(async (id: string, done) => {    try {      const user = await storage.getUser(id);      done(null, user);    } catch (error) {      done(error);    }  });  // Google OAuth routes  app.get(    "/auth/google",    (req, res, next) => {      console.log('Initiating Google OAuth flow...');            // Store the return URL from query parameter      if (req.query.returnTo && typeof req.query.returnTo === 'string') {        (req.session as any).returnTo = req.query.returnTo;      }            passport.authenticate("google", {        scope: ["profile", "email"],        accessType: 'offline',        prompt: 'consent'      })(req, res, next);    }  );  app.get(    "/auth/google/callback",    (req, res, next) => {      console.log('Google OAuth callback received');      console.log('Query params:', req.query);            passport.authenticate("google", {        failureRedirect: "/?error=auth_failed",        failureMessage: true      })(req, res, next);    },    (req, res) => {      console.log('Google OAuth authentication successful');            // Redirect to stored returnTo URL or home      const returnTo = (req.session as any).returnTo || "/";      delete (req.session as any).returnTo; // Clean up            res.redirect(returnTo);    }  );  app.get("/api/logout", (req, res) => {    req.logout(() => {      res.redirect("/");    });  });  console.log("✓ Google OAuth authentication configured");} Project Planner Prompt Library
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
999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114
import passport from "passport";import { Strategy as GoogleStrategy } from "passport-google-oauth20";import type { Express } from "express";import { storage } from "./storage";export function setupGoogleAuth(app: Express) {  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");  }  // Use custom domain for OAuth callback  const callbackURL = "https://vibekit.cc/auth/google/callback";  console.log(`✓ Setting up Google OAuth with callback: ${callbackURL}`);  // Configure Google OAuth Strategy  passport.use(    new GoogleStrategy(      {        clientID: process.env.GOOGLE_CLIENT_ID,        clientSecret: process.env.GOOGLE_CLIENT_SECRET,        callbackURL,        scope: ["profile", "email"],      },      async (accessToken, refreshToken, profile, done) => {        try {          console.log('Google OAuth callback triggered for user:', profile.id);          console.log('User email:', profile.emails?.[0]?.value);          console.log('User name:', profile.name?.givenName, profile.name?.familyName);                    // Upsert user in database          const user = await storage.upsertUser({            id: profile.id,            email: profile.emails?.[0]?.value ?? null,            firstName: profile.name?.givenName ?? null,            lastName: profile.name?.familyName ?? null,            profileImageUrl: profile.photos?.[0]?.value ?? null,          });          console.log('User successfully upserted:', user.id, user.email);          done(null, user);        } catch (error) {          console.error('Error upserting user in Google OAuth callback:', error);          done(error as Error);        }      }    )  );  // Serialize user to session  passport.serializeUser((user: any, done) => {    done(null, user.id);  });  // Deserialize user from session  passport.deserializeUser(async (id: string, done) => {    try {      const user = await storage.getUser(id);      done(null, user);    } catch (error) {      done(error);    }  });  // Google OAuth routes  app.get(    "/auth/google",    (req, res, next) => {      console.log('Initiating Google OAuth flow...');            // Store the return URL from query parameter      if (req.query.returnTo && typeof req.query.returnTo === 'string') {        (req.session as any).returnTo = req.query.returnTo;      }            passport.authenticate("google", {        scope: ["profile", "email"],        accessType: 'offline',        prompt: 'consent'      })(req, res, next);    }  );  app.get(    "/auth/google/callback",    (req, res, next) => {      console.log('Google OAuth callback received');      console.log('Query params:', req.query);            passport.authenticate("google", {        failureRedirect: "/?error=auth_failed",        failureMessage: true      })(req, res, next);    },    (req, res) => {      console.log('Google OAuth authentication successful');            // Redirect to stored returnTo URL or home      const returnTo = (req.session as any).returnTo || "/";      delete (req.session as any).returnTo; // Clean up            res.redirect(returnTo);    }  );  app.get("/api/logout", (req, res) => {    req.logout(() => {      res.redirect("/");    });  });  console.log("✓ Google OAuth authentication configured");}
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { Express } from "express";
import { storage } from "./storage";

export function setupGoogleAuth(app: Express) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
  }

  // Use custom domain for OAuth callback
  const callbackURL = "https://vibekit.cc/auth/google/callback";

  console.log(`✓ Setting up Google OAuth with callback: ${callbackURL}`);

  // Configure Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('Google OAuth callback triggered for user:', profile.id);
          console.log('User email:', profile.emails?.[0]?.value);
          console.log('User name:', profile.name?.givenName, profile.name?.familyName);
          
          // Upsert user in database
          const user = await storage.upsertUser({
            id: profile.id,
            email: profile.emails?.[0]?.value ?? null,
            firstName: profile.name?.givenName ?? null,
            lastName: profile.name?.familyName ?? null,
            profileImageUrl: profile.photos?.[0]?.value ?? null,
          });

          console.log('User successfully upserted:', user.id, user.email);
          done(null, user);
        } catch (error) {
          console.error('Error upserting user in Google OAuth callback:', error);
          done(error as Error);
        }
      }
    )
  );

  // Serialize user to session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Google OAuth routes
  app.get(
    "/auth/google",
    (req, res, next) => {
      console.log('Initiating Google OAuth flow...');
      
      // Store the return URL from query parameter
      if (req.query.returnTo && typeof req.query.returnTo === 'string') {
        (req.session as any).returnTo = req.query.returnTo;
      }
      
      passport.authenticate("google", {
        scope: ["profile", "email"],
        accessType: 'offline',
        prompt: 'consent'
      })(req, res, next);
    }
  );

  app.get(
    "/auth/google/callback",
    (req, res, next) => {
      console.log('Google OAuth callback received');
      console.log('Query params:', req.query);
      
      passport.authenticate("google", {
        failureRedirect: "/?error=auth_failed",
        failureMessage: true
      })(req, res, next);
    },
    (req, res) => {
      console.log('Google OAuth authentication successful');
      
      // Redirect to stored returnTo URL or home
      const returnTo = (req.session as any).returnTo || "/";
      delete (req.session as any).returnTo; // Clean up
      
      res.redirect(returnTo);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });

  console.log("✓ Google OAuth authentication configured");
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