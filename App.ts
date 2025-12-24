99123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687import { Switch, Route } from "wouter";import { queryClient } from "./lib/queryClient";import { QueryClientProvider } from "@tanstack/react-query";import { Toaster } from "@/components/ui/toaster";import { TooltipProvider } from "@/components/ui/tooltip";import { useAuth } from "@/hooks/useAuth";import LandingPage from "@/pages/LandingPage";import TemplatesPage from "@/pages/TemplatesPage";import PromptsPage from "@/pages/PromptsPage";import SavedPromptsPage from "@/pages/SavedPromptsPage";import PremiumPage from "@/pages/PremiumPage";import AboutPage from "@/pages/AboutPage";import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";import ReferencesPage from "@/pages/ReferencesPage";import Home from "@/pages/Home";import ProjectPage from "@/pages/ProjectPage";import TasksPage from "@/pages/TasksPage";import Landing from "@/pages/Landing";import GitHubConnectPage from "@/pages/GitHubConnectPage";import NotFound from "@/pages/not-found";import { useEffect } from "react";import { initGA } from "./lib/analytics";import { useAnalytics } from "./hooks/use-analytics";function Router() {  // Track page views when routes change  useAnalytics();    return (    <Switch>      <Route path="/" component={LandingPage} />      <Route path="/templates" component={TemplatesPage} />      <Route path="/prompts" component={PromptsPage} />      <Route path="/saved-prompts" component={SavedPromptsPage} />      <Route path="/premium" component={PremiumPage} />      <Route path="/about" component={AboutPage} />      <Route path="/privacy" component={PrivacyPolicyPage} />      <Route path="/references" component={ReferencesPage} />      <Route path="/projects" component={Home} />      <Route path="/project/:id" component={ProjectPage} />      <Route path="/tasks/:projectId" component={TasksPage} />      <Route path="/github-connect" component={GitHubConnectPage} />      <Route path="/login" component={Landing} />      <Route component={NotFound} />    </Switch>  );}function App() {  // Enable dark mode by default  useEffect(() => {    const savedTheme = localStorage.getItem('theme');    const theme = savedTheme || 'dark';        if (theme === 'dark') {      document.documentElement.classList.add('dark');    } else {      document.documentElement.classList.remove('dark');    }        if (!savedTheme) {      localStorage.setItem('theme', 'dark');    }  }, []);  // Initialize Google Analytics when app loads  useEffect(() => {    // Verify required environment variable is present    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');    } else {      initGA();    }  }, []);  return (    <QueryClientProvider client={queryClient}>      <div className="min-h-screen bg-background text-foreground">        <Router />        <Toaster />      </div>    </QueryClientProvider>  );}export default App; Project Planner Prompt Library
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
99123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687
import { Switch, Route } from "wouter";import { queryClient } from "./lib/queryClient";import { QueryClientProvider } from "@tanstack/react-query";import { Toaster } from "@/components/ui/toaster";import { TooltipProvider } from "@/components/ui/tooltip";import { useAuth } from "@/hooks/useAuth";import LandingPage from "@/pages/LandingPage";import TemplatesPage from "@/pages/TemplatesPage";import PromptsPage from "@/pages/PromptsPage";import SavedPromptsPage from "@/pages/SavedPromptsPage";import PremiumPage from "@/pages/PremiumPage";import AboutPage from "@/pages/AboutPage";import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";import ReferencesPage from "@/pages/ReferencesPage";import Home from "@/pages/Home";import ProjectPage from "@/pages/ProjectPage";import TasksPage from "@/pages/TasksPage";import Landing from "@/pages/Landing";import GitHubConnectPage from "@/pages/GitHubConnectPage";import NotFound from "@/pages/not-found";import { useEffect } from "react";import { initGA } from "./lib/analytics";import { useAnalytics } from "./hooks/use-analytics";function Router() {  // Track page views when routes change  useAnalytics();    return (    <Switch>      <Route path="/" component={LandingPage} />      <Route path="/templates" component={TemplatesPage} />      <Route path="/prompts" component={PromptsPage} />      <Route path="/saved-prompts" component={SavedPromptsPage} />      <Route path="/premium" component={PremiumPage} />      <Route path="/about" component={AboutPage} />      <Route path="/privacy" component={PrivacyPolicyPage} />      <Route path="/references" component={ReferencesPage} />      <Route path="/projects" component={Home} />      <Route path="/project/:id" component={ProjectPage} />      <Route path="/tasks/:projectId" component={TasksPage} />      <Route path="/github-connect" component={GitHubConnectPage} />      <Route path="/login" component={Landing} />      <Route component={NotFound} />    </Switch>  );}function App() {  // Enable dark mode by default  useEffect(() => {    const savedTheme = localStorage.getItem('theme');    const theme = savedTheme || 'dark';        if (theme === 'dark') {      document.documentElement.classList.add('dark');    } else {      document.documentElement.classList.remove('dark');    }        if (!savedTheme) {      localStorage.setItem('theme', 'dark');    }  }, []);  // Initialize Google Analytics when app loads  useEffect(() => {    // Verify required environment variable is present    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');    } else {      initGA();    }  }, []);  return (    <QueryClientProvider client={queryClient}>      <div className="min-h-screen bg-background text-foreground">        <Router />        <Toaster />      </div>    </QueryClientProvider>  );}export default App;
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";
import TemplatesPage from "@/pages/TemplatesPage";
import PromptsPage from "@/pages/PromptsPage";
import SavedPromptsPage from "@/pages/SavedPromptsPage";
import PremiumPage from "@/pages/PremiumPage";
import AboutPage from "@/pages/AboutPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import ReferencesPage from "@/pages/ReferencesPage";
import Home from "@/pages/Home";
import ProjectPage from "@/pages/ProjectPage";
import TasksPage from "@/pages/TasksPage";
import Landing from "@/pages/Landing";
import GitHubConnectPage from "@/pages/GitHubConnectPage";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/templates" component={TemplatesPage} />
      <Route path="/prompts" component={PromptsPage} />
      <Route path="/saved-prompts" component={SavedPromptsPage} />
      <Route path="/premium" component={PremiumPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/references" component={ReferencesPage} />
      <Route path="/projects" component={Home} />
      <Route path="/project/:id" component={ProjectPage} />
      <Route path="/tasks/:projectId" component={TasksPage} />
      <Route path="/github-connect" component={GitHubConnectPage} />
      <Route path="/login" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Enable dark mode by default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark';
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (!savedTheme) {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;



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