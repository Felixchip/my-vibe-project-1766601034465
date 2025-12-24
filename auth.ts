999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121import passport from "passport";import { Strategy as LocalStrategy } from "passport-local";import { Express } from "express";import session from "express-session";import { scrypt, randomBytes, timingSafeEqual } from "crypto";import { promisify } from "util";import { storage } from "./storage";import { User as SelectUser } from "@shared/schema";declare global {  namespace Express {    interface User extends SelectUser {}  }}const scryptAsync = promisify(scrypt);async function hashPassword(password: string) {  const salt = randomBytes(16).toString("hex");  const buf = (await scryptAsync(password, salt, 64)) as Buffer;  return `${buf.toString("hex")}.${salt}`;}async function comparePasswords(supplied: string, stored: string) {  const [hashed, salt] = stored.split(".");  const hashedBuf = Buffer.from(hashed, "hex");  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;  return timingSafeEqual(hashedBuf, suppliedBuf);}export function setupAuth(app: Express) {  const sessionSettings: session.SessionOptions = {    secret: process.env.SESSION_SECRET || 'fallback-secret-key',    resave: false,    saveUninitialized: false,    store: storage.sessionStore,    cookie: {      httpOnly: true,      secure: false, // Set to true in production with HTTPS      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week    },  };  app.set("trust proxy", 1);  app.use(session(sessionSettings));  app.use(passport.initialize());  app.use(passport.session());  passport.use(    new LocalStrategy(      { usernameField: "email" },      async (email, password, done) => {        const user = await storage.getUserByEmail(email);        if (!user || !user.password || !(await comparePasswords(password, user.password))) {          return done(null, false);        } else {          return done(null, user);        }      },    ),  );  passport.serializeUser((user, done) => done(null, user.id));  passport.deserializeUser(async (id: string, done) => {    const user = await storage.getUser(id);    done(null, user);  });  app.post("/api/register", async (req, res, next) => {    const { name, email, password } = req.body;        if (!name || !email || !password) {      return res.status(400).send("Name, email, and password are required");    }    const existingUser = await storage.getUserByEmail(email);    if (existingUser) {      return res.status(400).send("Email already exists");    }    const user = await storage.createUser({      name,      email,      password: await hashPassword(password),    });    req.login(user, (err) => {      if (err) return next(err);      res.status(201).json(user);    });  });  app.post("/api/login", (req, res, next) => {    passport.authenticate("local", (err: any, user: any, info: any) => {      if (err) {        return next(err);      }      if (!user) {        return res.status(401).json({ message: "Invalid email or password" });      }      req.logIn(user, (err: any) => {        if (err) {          return next(err);        }        return res.status(200).json(user);      });    })(req, res, next);  });  app.post("/api/logout", (req, res, next) => {    req.logout((err) => {      if (err) return next(err);      res.sendStatus(200);    });  });  app.get("/api/user", (req, res) => {    if (!req.isAuthenticated()) return res.sendStatus(401);    res.json(req.user);  });} Project Planner Prompt Library
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
999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121
import passport from "passport";import { Strategy as LocalStrategy } from "passport-local";import { Express } from "express";import session from "express-session";import { scrypt, randomBytes, timingSafeEqual } from "crypto";import { promisify } from "util";import { storage } from "./storage";import { User as SelectUser } from "@shared/schema";declare global {  namespace Express {    interface User extends SelectUser {}  }}const scryptAsync = promisify(scrypt);async function hashPassword(password: string) {  const salt = randomBytes(16).toString("hex");  const buf = (await scryptAsync(password, salt, 64)) as Buffer;  return `${buf.toString("hex")}.${salt}`;}async function comparePasswords(supplied: string, stored: string) {  const [hashed, salt] = stored.split(".");  const hashedBuf = Buffer.from(hashed, "hex");  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;  return timingSafeEqual(hashedBuf, suppliedBuf);}export function setupAuth(app: Express) {  const sessionSettings: session.SessionOptions = {    secret: process.env.SESSION_SECRET || 'fallback-secret-key',    resave: false,    saveUninitialized: false,    store: storage.sessionStore,    cookie: {      httpOnly: true,      secure: false, // Set to true in production with HTTPS      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week    },  };  app.set("trust proxy", 1);  app.use(session(sessionSettings));  app.use(passport.initialize());  app.use(passport.session());  passport.use(    new LocalStrategy(      { usernameField: "email" },      async (email, password, done) => {        const user = await storage.getUserByEmail(email);        if (!user || !user.password || !(await comparePasswords(password, user.password))) {          return done(null, false);        } else {          return done(null, user);        }      },    ),  );  passport.serializeUser((user, done) => done(null, user.id));  passport.deserializeUser(async (id: string, done) => {    const user = await storage.getUser(id);    done(null, user);  });  app.post("/api/register", async (req, res, next) => {    const { name, email, password } = req.body;        if (!name || !email || !password) {      return res.status(400).send("Name, email, and password are required");    }    const existingUser = await storage.getUserByEmail(email);    if (existingUser) {      return res.status(400).send("Email already exists");    }    const user = await storage.createUser({      name,      email,      password: await hashPassword(password),    });    req.login(user, (err) => {      if (err) return next(err);      res.status(201).json(user);    });  });  app.post("/api/login", (req, res, next) => {    passport.authenticate("local", (err: any, user: any, info: any) => {      if (err) {        return next(err);      }      if (!user) {        return res.status(401).json({ message: "Invalid email or password" });      }      req.logIn(user, (err: any) => {        if (err) {          return next(err);        }        return res.status(200).json(user);      });    })(req, res, next);  });  app.post("/api/logout", (req, res, next) => {    req.logout((err) => {      if (err) return next(err);      res.sendStatus(200);    });  });  app.get("/api/user", (req, res) => {    if (!req.isAuthenticated()) return res.sendStatus(401);    res.json(req.user);  });}
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await storage.getUserByEmail(email);
        if (!user || !user.password || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).send("Name, email, and password are required");
    }

    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    const user = await storage.createUser({
      name,
      email,
      password: await hashPassword(password),
    });

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.logIn(user, (err: any) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
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