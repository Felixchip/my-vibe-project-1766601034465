9991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768import { useEffect, useState } from "react";import { useLocation } from "wouter";import { useQuery, useMutation } from "@tanstack/react-query";import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";import { Button } from "@/components/ui/button";import { useToast } from "@/hooks/use-toast";import { apiRequest, queryClient } from "@/lib/queryClient";import { Github, CheckCircle, XCircle, Loader2, ExternalLink, Unlink } from "lucide-react";interface GitHubStatus {  connected: boolean;  username?: string;  avatarUrl?: string;  scope?: string;}export default function GitHubConnectPage() {  const [, setLocation] = useLocation();  const { toast } = useToast();  const [callbackProcessed, setCallbackProcessed] = useState(false);  // Check URL params for OAuth callback result  useEffect(() => {    const params = new URLSearchParams(window.location.search);    const success = params.get("success");    const error = params.get("error");    if (success === "true" && !callbackProcessed) {      setCallbackProcessed(true);      toast({        title: "GitHub Connected",        description: "Your GitHub account has been successfully connected.",      });      // Clean URL and refetch status      window.history.replaceState({}, "", "/github-connect");      queryClient.invalidateQueries({ queryKey: ["/api/auth/github/status"] });    } else if (error && !callbackProcessed) {      setCallbackProcessed(true);      const errorMessages: Record<string, string> = {        access_denied: "You denied access to GitHub.",        missing_params: "Missing OAuth parameters.",        not_configured: "GitHub OAuth is not configured.",        session_expired: "Your session expired. Please log in again.",        server_error: "An error occurred. Please try again.",      };      toast({        title: "Connection Failed",        description: errorMessages[error] || `Error: ${error}`,        variant: "destructive",      });      window.history.replaceState({}, "", "/github-connect");    }  }, [toast, callbackProcessed]);  // Fetch GitHub connection status  const { data: status, isLoading } = useQuery<GitHubStatus>({    queryKey: ["/api/auth/github/status"],  });  // Start GitHub OAuth flow  const connectMutation = useMutation({    mutationFn: async () => {      const response = await apiRequest("GET", "/api/auth/github/start");      return response.json();    },    onSuccess: (data) => {      // Redirect to GitHub OAuth page      if (data.authUrl) { Project Planner Prompt Library
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
import { useEffect, useState } from "react";import { useLocation } from "wouter";import { useQuery, useMutation } from "@tanstack/react-query";import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";import { Button } from "@/components/ui/button";import { useToast } from "@/hooks/use-toast";import { apiRequest, queryClient } from "@/lib/queryClient";import { Github, CheckCircle, XCircle, Loader2, ExternalLink, Unlink } from "lucide-react";interface GitHubStatus {  connected: boolean;  username?: string;  avatarUrl?: string;  scope?: string;}export default function GitHubConnectPage() {  const [, setLocation] = useLocation();  const { toast } = useToast();  const [callbackProcessed, setCallbackProcessed] = useState(false);  // Check URL params for OAuth callback result  useEffect(() => {    const params = new URLSearchParams(window.location.search);    const success = params.get("success");    const error = params.get("error");    if (success === "true" && !callbackProcessed) {      setCallbackProcessed(true);      toast({        title: "GitHub Connected",        description: "Your GitHub account has been successfully connected.",      });      // Clean URL and refetch status      window.history.replaceState({}, "", "/github-connect");      queryClient.invalidateQueries({ queryKey: ["/api/auth/github/status"] });    } else if (error && !callbackProcessed) {      setCallbackProcessed(true);      const errorMessages: Record<string, string> = {        access_denied: "You denied access to GitHub.",        missing_params: "Missing OAuth parameters.",        not_configured: "GitHub OAuth is not configured.",        session_expired: "Your session expired. Please log in again.",        server_error: "An error occurred. Please try again.",      };      toast({        title: "Connection Failed",        description: errorMessages[error] || `Error: ${error}`,        variant: "destructive",      });      window.history.replaceState({}, "", "/github-connect");    }  }, [toast, callbackProcessed]);  // Fetch GitHub connection status  const { data: status, isLoading } = useQuery<GitHubStatus>({    queryKey: ["/api/auth/github/status"],  });  // Start GitHub OAuth flow  const connectMutation = useMutation({    mutationFn: async () => {      const response = await apiRequest("GET", "/api/auth/github/start");      return response.json();    },    onSuccess: (data) => {      // Redirect to GitHub OAuth page      if (data.authUrl) {
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Github, CheckCircle, XCircle, Loader2, ExternalLink, Unlink } from "lucide-react";

interface GitHubStatus {
  connected: boolean;
  username?: string;
  avatarUrl?: string;
  scope?: string;
}

export default function GitHubConnectPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [callbackProcessed, setCallbackProcessed] = useState(false);

  // Check URL params for OAuth callback result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const error = params.get("error");

    if (success === "true" && !callbackProcessed) {
      setCallbackProcessed(true);
      toast({
        title: "GitHub Connected",
        description: "Your GitHub account has been successfully connected.",
      });
      // Clean URL and refetch status
      window.history.replaceState({}, "", "/github-connect");
      queryClient.invalidateQueries({ queryKey: ["/api/auth/github/status"] });
    } else if (error && !callbackProcessed) {
      setCallbackProcessed(true);
      const errorMessages: Record<string, string> = {
        access_denied: "You denied access to GitHub.",
        missing_params: "Missing OAuth parameters.",
        not_configured: "GitHub OAuth is not configured.",
        session_expired: "Your session expired. Please log in again.",
        server_error: "An error occurred. Please try again.",
      };
      toast({
        title: "Connection Failed",
        description: errorMessages[error] || `Error: ${error}`,
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/github-connect");
    }
  }, [toast, callbackProcessed]);

  // Fetch GitHub connection status
  const { data: status, isLoading } = useQuery<GitHubStatus>({
    queryKey: ["/api/auth/github/status"],
  });

  // Start GitHub OAuth flow
  const connectMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/auth/github/start");
      return response.json();
    },
    onSuccess: (data) => {
      // Redirect to GitHub OAuth page
      if (data.authUrl) {


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