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
999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105
import { Button } from "@/components/ui/button";import Header from "@/components/layout/Header";import bgImage from "@assets/VibeKit_BG_1761218255823.png";import { useAuth } from "@/hooks/useAuth";export default function AboutPage() {  const { isAuthenticated } = useAuth();    const handleGetStarted = () => {    if (isAuthenticated) {      window.location.href = "/projects";    } else {      sessionStorage.setItem('redirectAfterLogin', '/projects');      window.location.href = "/auth/google";    }  };    return (    <div className="min-h-screen bg-background relative">      {/* Background Image */}      <div         className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none -z-10"        style={{ backgroundImage: `url(${bgImage})` }}      />            {/* Navigation - ONE UNIFIED HEADER */}      <Header />      {/* Content */}      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">        <div className="max-w-3xl mx-auto">          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#ECB1DB' }}>            About VibeKit          </h1>                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">            <p>              VibeKit is a context engineering tool built for humans by a fellow <a href="http://www.felixobinna.com">human</a>.            </p>                        <p>              We transform how everyday people move from idea to implementation by helping you capture your vision,               structure your thinking, and generate ready-to-deploy outputs for tools like Replit, Cursor, and Claude.            </p>                        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What We Offer</h2>                        <p>              <strong className="text-foreground">Context Engineering:</strong> Capture and structure your project vision               with our intelligent context canvas. Define problems, outcomes, constraints, and technical requirements in one place.            </p>                        <p>              <strong className="text-foreground">Smart Structure Switching:</strong> Reshape your ideas between Brainstorm,               Prompt Chain, and Brief modes without losing data. Think in the format that works best for each phase.            </p>                        <p>              <strong className="text-foreground">Multi-Platform Export:</strong> Generate optimized prompts and scaffolds               for Replit, Cursor, Claude, and more. Each export is tailored to the platform's strengths.            </p>                        <p>              <strong className="text-foreground">AI-Powered Artifacts:</strong> Automatically generate project briefs,               build plans, and technical specifications from your context. Get vibe scores to ensure alignment.            </p>                        <p>              <strong className="text-foreground">Task Management:</strong> Generate actionable task lists from your briefs.               Track progress, set deadlines, and reorder priorities with drag-and-drop simplicity.            </p>                        <p>              <strong className="text-foreground">Version Control:</strong> Save snapshots of your projects at any stage.               Restore previous versions and track how your ideas evolved over time.            </p>                        <div className="mt-16 pt-12 border-t border-border">              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Ship Faster?</h2>              <p className="mb-8">                Join the 1000+ people who are transforming ideas into production-ready builds with VibeKit's context engineering tools.              </p>              <Button                 size="lg"                 onClick={handleGetStarted}                data-testid="button-get-started"                className="bg-gradient-to-r from-[#3C1360] to-[#E656BB] text-white hover:bg-white hover:text-[#3C1360] transition-all border-none rounded-full"              >                Get Started Free              </Button>            </div>          </div>        </div>      </section>      {/* Footer */}      <footer className="mt-20 py-12 px-4 relative">        <div className="max-w-7xl mx-auto text-center text-muted-foreground">          <p>© 2025 VibeKit. A Felix Obinna experiment</p>        </div>      </footer>    </div>  );}
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import bgImage from "@assets/VibeKit_BG_1761218255823.png";
import { useAuth } from "@/hooks/useAuth";

export default function AboutPage() {
  const { isAuthenticated } = useAuth();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = "/projects";
    } else {
      sessionStorage.setItem('redirectAfterLogin', '/projects');
      window.location.href = "/auth/google";
    }
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Navigation - ONE UNIFIED HEADER */}
      <Header />

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#ECB1DB' }}>
            About VibeKit
          </h1>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              VibeKit is a context engineering tool built for humans by a fellow <a href="http://www.felixobinna.com">human</a>.
            </p>
            
            <p>
              We transform how everyday people move from idea to implementation by helping you capture your vision, 
              structure your thinking, and generate ready-to-deploy outputs for tools like Replit, Cursor, and Claude.
            </p>
            
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What We Offer</h2>
            
            <p>
              <strong className="text-foreground">Context Engineering:</strong> Capture and structure your project vision 
              with our intelligent context canvas. Define problems, outcomes, constraints, and technical requirements in one place.
            </p>
            
            <p>
              <strong className="text-foreground">Smart Structure Switching:</strong> Reshape your ideas between Brainstorm, 
              Prompt Chain, and Brief modes without losing data. Think in the format that works best for each phase.
            </p>
            
            <p>
              <strong className="text-foreground">Multi-Platform Export:</strong> Generate optimized prompts and scaffolds 
              for Replit, Cursor, Claude, and more. Each export is tailored to the platform's strengths.
            </p>
            
            <p>
              <strong className="text-foreground">AI-Powered Artifacts:</strong> Automatically generate project briefs, 
              build plans, and technical specifications from your context. Get vibe scores to ensure alignment.
            </p>
            
            <p>
              <strong className="text-foreground">Task Management:</strong> Generate actionable task lists from your briefs. 
              Track progress, set deadlines, and reorder priorities with drag-and-drop simplicity.
            </p>
            
            <p>
              <strong className="text-foreground">Version Control:</strong> Save snapshots of your projects at any stage. 
              Restore previous versions and track how your ideas evolved over time.
            </p>
            
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Ship Faster?</h2>
              <p className="mb-8">
                Join the 1000+ people who are transforming ideas into production-ready builds with VibeKit's context engineering tools.
              </p>
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                data-testid="button-get-started"
                className="bg-gradient-to-r from-[#3C1360] to-[#E656BB] text-white hover:bg-white hover:text-[#3C1360] transition-all border-none rounded-full"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-12 px-4 relative">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2025 VibeKit. A Felix Obinna experiment</p>
        </div>
      </footer>
    </div>
  );
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