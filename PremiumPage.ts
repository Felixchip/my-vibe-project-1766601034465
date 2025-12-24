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
9991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768697071727374757677787980818283
import { Button } from "@/components/ui/button";import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";import { Badge } from "@/components/ui/badge";import { Check, Crown, Sparkles, Zap, Star, Rocket, Shield, Globe } from "lucide-react";import AppLayout from "@/components/layout/AppLayout";import { useState } from "react";import { useAuth } from "@/hooks/useAuth";import { apiRequest } from "@/lib/queryClient";import { useToast } from "@/hooks/use-toast";export default function PremiumPage() {  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");  const [isLoading, setIsLoading] = useState(false);  const { user } = useAuth();  const { toast } = useToast();  const isPremium = user?.subscriptionTier === "premium";  const handleSubscribe = async (plan: string) => {    if (!user) {      toast({        title: "Authentication Required",        description: "Please log in to subscribe to premium",        variant: "destructive"      });      return;    }    try {      setIsLoading(true);      const response = await apiRequest("POST", "/api/create-checkout-session", {        priceId: plan      });      if (!response.ok) {        throw new Error("Failed to create checkout session");      }      const data = await response.json();            if (data.url) {        window.location.href = data.url;      }    } catch (error) {      console.error("Subscription error:", error);      toast({        title: "Error",        description: "Failed to start subscription process",        variant: "destructive"      });    } finally {      setIsLoading(false);    }  };  const features = [    {      icon: <Globe className="h-5 w-5" />,      title: "Your Rules Everywhere",      description: "Apply your coding standards across ChatGPT, Claude, Replit, V0, Bolt, and all major AI platforms at once"    },    {      icon: <Shield className="h-5 w-5" />,      title: "Code Quality Checks",      description: "Spot potential bugs and issues in AI-generated code before you ship them"    },    {      icon: <Zap className="h-5 w-5" />,      title: "Custom Quality Rules",      description: "Set your own code standards and let VibeKit enforce them automatically"    },    {      icon: <Sparkles className="h-5 w-5" />,      title: "Smart Project Planning",      description: "Get AI-powered project briefs to clarify your ideas before building"    },    {      icon: <Star className="h-5 w-5" />,      title: "Conversation History",      description: "Never lose an important AI conversation. Search and find past interactions instantly"    },    {      icon: <Rocket className="h-5 w-5" />,
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles, Zap, Star, Rocket, Shield, Globe } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function PremiumPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const isPremium = user?.subscriptionTier === "premium";

  const handleSubscribe = async (plan: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to premium",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/create-checkout-session", {
        priceId: plan
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to start subscription process",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Your Rules Everywhere",
      description: "Apply your coding standards across ChatGPT, Claude, Replit, V0, Bolt, and all major AI platforms at once"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Code Quality Checks",
      description: "Spot potential bugs and issues in AI-generated code before you ship them"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Custom Quality Rules",
      description: "Set your own code standards and let VibeKit enforce them automatically"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Smart Project Planning",
      description: "Get AI-powered project briefs to clarify your ideas before building"
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Conversation History",
      description: "Never lose an important AI conversation. Search and find past interactions instantly"
    },
    {
      icon: <Rocket className="h-5 w-5" />,


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