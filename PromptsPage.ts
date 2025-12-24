9991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556import { useQuery, useMutation } from "@tanstack/react-query";import { Button } from "@/components/ui/button";import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";import { Badge } from "@/components/ui/badge";import { Input } from "@/components/ui/input";import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";import { Download, Star, TrendingUp, Search, Crown, Sparkles, Code2, Zap, Plus, Heart } from "lucide-react";import { Prompt, Favorite } from "@shared/schema";import { apiRequest, queryClient } from "@/lib/queryClient";import { useState, useMemo, useEffect } from "react";import AppLayout from "@/components/layout/AppLayout";import UpgradeModal from "@/components/modals/UpgradeModal";import PromptModal from "@/components/modals/PromptModal";import CustomPromptModal from "@/components/modals/CustomPromptModal";import AuthModal from "@/components/modals/AuthModal";import BackToTop from "@/components/ui/back-to-top";import { useToast } from "@/hooks/use-toast";import { useAuth } from "@/hooks/useAuth";export default function PromptsPage() {  const [selectedCategory, setSelectedCategory] = useState<string>("All");  const [selectedTier, setSelectedTier] = useState<string>("All");  const [searchQuery, setSearchQuery] = useState<string>("");  const [showUpgradeModal, setShowUpgradeModal] = useState(false);  const [showAuthModal, setShowAuthModal] = useState(false);  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);  const [showPromptModal, setShowPromptModal] = useState(false);  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);  const [currentPage, setCurrentPage] = useState(1);  const [itemsPerPage] = useState(24); // Show 24 prompts per page  const { toast } = useToast();  const { user } = useAuth();    const isPremiumUser = user && user.subscriptionTier === 'premium';  const { data: allPrompts = [], isLoading } = useQuery<Prompt[]>({    queryKey: ['/api/prompts'],  });  const { data: favorites = [] } = useQuery<Favorite[]>({    queryKey: ['/api/favorites'],    enabled: !!user,  });  const favoriteMutation = useMutation({    mutationFn: async ({ itemType, itemId, action }: { itemType: string; itemId: string; action: 'add' | 'remove' }) => {      if (action === 'add') {        return await apiRequest("POST", "/api/favorites", { itemType, itemId });      } else {        return await apiRequest("DELETE", "/api/favorites", { itemType, itemId });      }    },    onSuccess: () => {      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] }); Project Planner Prompt Library
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
9991234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556
import { useQuery, useMutation } from "@tanstack/react-query";import { Button } from "@/components/ui/button";import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";import { Badge } from "@/components/ui/badge";import { Input } from "@/components/ui/input";import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";import { Download, Star, TrendingUp, Search, Crown, Sparkles, Code2, Zap, Plus, Heart } from "lucide-react";import { Prompt, Favorite } from "@shared/schema";import { apiRequest, queryClient } from "@/lib/queryClient";import { useState, useMemo, useEffect } from "react";import AppLayout from "@/components/layout/AppLayout";import UpgradeModal from "@/components/modals/UpgradeModal";import PromptModal from "@/components/modals/PromptModal";import CustomPromptModal from "@/components/modals/CustomPromptModal";import AuthModal from "@/components/modals/AuthModal";import BackToTop from "@/components/ui/back-to-top";import { useToast } from "@/hooks/use-toast";import { useAuth } from "@/hooks/useAuth";export default function PromptsPage() {  const [selectedCategory, setSelectedCategory] = useState<string>("All");  const [selectedTier, setSelectedTier] = useState<string>("All");  const [searchQuery, setSearchQuery] = useState<string>("");  const [showUpgradeModal, setShowUpgradeModal] = useState(false);  const [showAuthModal, setShowAuthModal] = useState(false);  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);  const [showPromptModal, setShowPromptModal] = useState(false);  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);  const [currentPage, setCurrentPage] = useState(1);  const [itemsPerPage] = useState(24); // Show 24 prompts per page  const { toast } = useToast();  const { user } = useAuth();    const isPremiumUser = user && user.subscriptionTier === 'premium';  const { data: allPrompts = [], isLoading } = useQuery<Prompt[]>({    queryKey: ['/api/prompts'],  });  const { data: favorites = [] } = useQuery<Favorite[]>({    queryKey: ['/api/favorites'],    enabled: !!user,  });  const favoriteMutation = useMutation({    mutationFn: async ({ itemType, itemId, action }: { itemType: string; itemId: string; action: 'add' | 'remove' }) => {      if (action === 'add') {        return await apiRequest("POST", "/api/favorites", { itemType, itemId });      } else {        return await apiRequest("DELETE", "/api/favorites", { itemType, itemId });      }    },    onSuccess: () => {      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Star, TrendingUp, Search, Crown, Sparkles, Code2, Zap, Plus, Heart } from "lucide-react";
import { Prompt, Favorite } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState, useMemo, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import UpgradeModal from "@/components/modals/UpgradeModal";
import PromptModal from "@/components/modals/PromptModal";
import CustomPromptModal from "@/components/modals/CustomPromptModal";
import AuthModal from "@/components/modals/AuthModal";
import BackToTop from "@/components/ui/back-to-top";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24); // Show 24 prompts per page
  const { toast } = useToast();
  const { user } = useAuth();
  
  const isPremiumUser = user && user.subscriptionTier === 'premium';

  const { data: allPrompts = [], isLoading } = useQuery<Prompt[]>({
    queryKey: ['/api/prompts'],
  });

  const { data: favorites = [] } = useQuery<Favorite[]>({
    queryKey: ['/api/favorites'],
    enabled: !!user,
  });

  const favoriteMutation = useMutation({
    mutationFn: async ({ itemType, itemId, action }: { itemType: string; itemId: string; action: 'add' | 'remove' }) => {
      if (action === 'add') {
        return await apiRequest("POST", "/api/favorites", { itemType, itemId });
      } else {
        return await apiRequest("DELETE", "/api/favorites", { itemType, itemId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });


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