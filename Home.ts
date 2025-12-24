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
9991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";import { Link, useLocation } from "wouter";import { Project, Context, Template, Prompt } from "@shared/schema";import { apiRequest } from "@/lib/queryClient";import { useAuth } from "@/hooks/useAuth";import AppLayout from "@/components/layout/AppLayout";import { Button } from "@/components/ui/button";import { Badge } from "@/components/ui/badge";import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";import ProjectCreationWizard from "@/components/ProjectCreationWizard";import { generateProjectIcon } from "@/utils/projectIcon";import { useState, useEffect } from "react";import AuthModal from "@/components/modals/AuthModal";import UpgradeModal from "@/components/modals/UpgradeModal";import { ProjectTypeModal } from "@/components/modals/ProjectTypeModal";import { ProjectCreationTypeModal } from "@/components/modals/ProjectCreationTypeModal";import PromptModal from "@/components/modals/PromptModal";import NonBuildProjectForm from "@/components/NonBuildProjectForm";import { trackEvent } from "@/lib/analytics";import { Sparkles, ArrowRight, CheckCircle, FileText, Rocket, Crown, Zap, Users, Globe, Star } from "lucide-react";import { SiGooglechrome, SiOpenai, SiGoogle } from "react-icons/si";import { useToast } from "@/hooks/use-toast";import bgImage from "@assets/VibeKit_BG_1761218255823.png";export default function Home() {  const queryClient = useQueryClient();  const [, setLocation] = useLocation();  const [showWizard, setShowWizard] = useState(false);  const [showTypeModal, setShowTypeModal] = useState(false);  const [showCreationTypeModal, setShowCreationTypeModal] = useState(false);  const [showNonBuildForm, setShowNonBuildForm] = useState(false);  const [showAuthModal, setShowAuthModal] = useState(false);  const [showUpgradeModal, setShowUpgradeModal] = useState(false);  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);  const { isAuthenticated, isLoading: authLoading } = useAuth();  const { toast } = useToast();  // Redirect unauthenticated users to login  useEffect(() => {    if (!authLoading && !isAuthenticated) {      setLocation('/login');    }  }, [authLoading, isAuthenticated, setLocation]);    const { data: allProjects = [], isLoading } = useQuery<Project[]>({    queryKey: ["/api/projects"]  });  // For anonymous users, filter projects by localStorage tracking  const projects = allProjects.filter(project => {    if (!isAuthenticated) {      // Check if this project is in localStorage      const myProjects = JSON.parse(localStorage.getItem('myProjects') || '[]');
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Project, Context, Template, Prompt } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCreationWizard from "@/components/ProjectCreationWizard";
import { generateProjectIcon } from "@/utils/projectIcon";
import { useState, useEffect } from "react";
import AuthModal from "@/components/modals/AuthModal";
import UpgradeModal from "@/components/modals/UpgradeModal";
import { ProjectTypeModal } from "@/components/modals/ProjectTypeModal";
import { ProjectCreationTypeModal } from "@/components/modals/ProjectCreationTypeModal";
import PromptModal from "@/components/modals/PromptModal";
import NonBuildProjectForm from "@/components/NonBuildProjectForm";
import { trackEvent } from "@/lib/analytics";
import { Sparkles, ArrowRight, CheckCircle, FileText, Rocket, Crown, Zap, Users, Globe, Star } from "lucide-react";
import { SiGooglechrome, SiOpenai, SiGoogle } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import bgImage from "@assets/VibeKit_BG_1761218255823.png";

export default function Home() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [showWizard, setShowWizard] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCreationTypeModal, setShowCreationTypeModal] = useState(false);
  const [showNonBuildForm, setShowNonBuildForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [authLoading, isAuthenticated, setLocation]);
  
  const { data: allProjects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"]
  });

  // For anonymous users, filter projects by localStorage tracking
  const projects = allProjects.filter(project => {
    if (!isAuthenticated) {
      // Check if this project is in localStorage
      const myProjects = JSON.parse(localStorage.getItem('myProjects') || '[]');


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