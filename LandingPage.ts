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
999157158159160161162163164165166167168169170171172173174175176177178179180181182183184185186187188189190191192193194195196197198199200201202203204205206207208209210211212213214215216217218219220221222223224225226227228229230231232233234235236237238239240241
            {/* Replit */}            <div className="flex flex-col items-center">              <img                src={replitLogo}                alt="Replit"                className="h-[104px] w-[104px] object-contain"                data-testid="img-replit-logo"              />            </div>          </div>        </div>      </section>      {/* Features Section */}      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#F8F9FA] dark:bg-zinc-950">        <div className="max-w-7xl mx-auto">          <div className="max-w-3xl mb-16">            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">              The "Triple Threat" Features            </h2>            <p className="text-xl text-zinc-600 dark:text-zinc-400">              Turn your project vision into precise architecture,              high-performance code, and scalable repos with our core utility              suite.            </p>          </div>          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">            {/* The Project Planner */}            <div className="group relative bg-zinc-900 rounded-[32px] overflow-hidden aspect-[4/5] flex flex-col p-8 transition-transform duration-500 hover:-translate-y-2 shadow-2xl">              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />              <div className="relative z-10 flex flex-col h-full">                <h3 className="text-2xl font-bold text-white mb-4">                  The Project Planner                </h3>                <p className="text-zinc-400 mb-8">                  Unlock insight into your build requirements. Plan features and                  schemas before you prompt.                </p>                {/* Visual UI Element - Stats Card */}                <div className="mt-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">                  <div className="flex items-center gap-3 mb-6">                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">                      <Sparkles className="h-4 w-4 text-white" />                    </div>                    <span className="text-sm font-medium text-white">                      VibeKit Planner AI                    </span>                  </div>                  <div className="space-y-4">                    <div className="flex justify-between items-center">                      <span className="text-zinc-400 text-sm">                        Context Accuracy                      </span>                      <span className="text-white font-bold">↑ 98%</span>                    </div>                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">                      <div className="h-full bg-purple-500 w-[98%]" />                    </div>                    <div className="flex justify-between items-center">                      <span className="text-zinc-400 text-sm">                        Schema Coverage                      </span>                      <span className="text-white font-bold">↑ 92%</span>                    </div>                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">                      <div className="h-full bg-blue-500 w-[92%]" />                    </div>                  </div>                </div>              </div>            </div>            {/* The Prompt Library */}            <div className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] overflow-hidden aspect-[4/5] flex flex-col p-8 transition-transform duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl">              <div className="relative z-10 flex flex-col h-full">                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">                  The Prompt Library                </h3>                <p className="text-zinc-600 dark:text-zinc-400 mb-8">                  Boilerplate elimination. Curated high-performance system                  prompts for complex logic.                </p>                {/* Visual UI Element - Tag Cloud / Prompt Builder */}                  "500 prompts with no documentation.",
            {/* Replit */}
            <div className="flex flex-col items-center">
              <img
                src={replitLogo}
                alt="Replit"
                className="h-[104px] w-[104px] object-contain"
                data-testid="img-replit-logo"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#F8F9FA] dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
              The "Triple Threat" Features
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Turn your project vision into precise architecture,
              high-performance code, and scalable repos with our core utility
              suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* The Project Planner */}
            <div className="group relative bg-zinc-900 rounded-[32px] overflow-hidden aspect-[4/5] flex flex-col p-8 transition-transform duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  The Project Planner
                </h3>
                <p className="text-zinc-400 mb-8">
                  Unlock insight into your build requirements. Plan features and
                  schemas before you prompt.
                </p>

                {/* Visual UI Element - Stats Card */}
                <div className="mt-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      VibeKit Planner AI
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">
                        Context Accuracy
                      </span>
                      <span className="text-white font-bold">↑ 98%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[98%]" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">
                        Schema Coverage
                      </span>
                      <span className="text-white font-bold">↑ 92%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[92%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Prompt Library */}
            <div className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] overflow-hidden aspect-[4/5] flex flex-col p-8 transition-transform duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl">
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                  The Prompt Library
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  Boilerplate elimination. Curated high-performance system
                  prompts for complex logic.
                </p>

                {/* Visual UI Element - Tag Cloud / Prompt Builder */}
                  "500 prompts with no documentation.",


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