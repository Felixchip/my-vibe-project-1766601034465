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
999123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263
import { Link } from "wouter";import { Button } from "@/components/ui/button";import Header from "@/components/layout/Header";import bgImage from "@assets/VibeKit_BG_1761218255823.png";export default function PrivacyPolicyPage() {  return (    <div className="min-h-screen bg-background relative">      {/* Background Image */}      <div         className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none -z-10"        style={{ backgroundImage: `url(${bgImage})` }}      />            {/* Navigation */}      <Header />      {/* Content */}      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">        <div className="max-w-3xl mx-auto">          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#ECB1DB' }}>            Privacy Policy          </h1>                    <p className="text-sm text-muted-foreground mb-8">Last updated: November 28, 2025</p>          <div className="space-y-8 text-base text-muted-foreground leading-relaxed">            <div>              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>              <p>                VibeKit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.              </p>            </div>            <div>              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>              <p className="mb-4">We collect information in the following ways:</p>              <ul className="list-disc list-inside space-y-2 ml-2">                <li><strong>Account Information:</strong> When you create an account, we collect your email address, name, and profile information.</li>                <li><strong>Authentication Data:</strong> We collect data from third-party authentication providers (Google, GitHub, X, Apple) when you log in.</li>                <li><strong>Project Data:</strong> We store the content, context, and artifacts you create within our platform.</li>                <li><strong>Usage Data:</strong> We collect analytics about how you use VibeKit to improve our services, including page views, features used, and timestamps.</li>                <li><strong>Device Information:</strong> We collect information about your device, browser, IP address, and operating system.</li>                <li><strong>Payment Information:</strong> For premium subscriptions, we collect payment information through Stripe and do not directly store credit card details.</li>              </ul>            </div>            <div>              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>              <p className="mb-4">We use the information we collect for:</p>              <ul className="list-disc list-inside space-y-2 ml-2">                <li>Providing, maintaining, and improving our services</li>                <li>Personalizing your experience and delivering content relevant to your interests</li>                <li>Processing transactions and sending transactional emails</li>                <li>Communicating with you about service updates, security alerts, and support</li>                <li>Analytics and understanding how users interact with our platform</li>                <li>Preventing fraudulent transactions and enhancing security</li>                <li>Complying with legal obligations</li>              </ul>            </div>            <div>              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import bgImage from "@assets/VibeKit_BG_1761218255823.png";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Navigation */}
      <Header />

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#ECB1DB' }}>
            Privacy Policy
          </h1>
          
          <p className="text-sm text-muted-foreground mb-8">Last updated: November 28, 2025</p>

          <div className="space-y-8 text-base text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                VibeKit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect information in the following ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Account Information:</strong> When you create an account, we collect your email address, name, and profile information.</li>
                <li><strong>Authentication Data:</strong> We collect data from third-party authentication providers (Google, GitHub, X, Apple) when you log in.</li>
                <li><strong>Project Data:</strong> We store the content, context, and artifacts you create within our platform.</li>
                <li><strong>Usage Data:</strong> We collect analytics about how you use VibeKit to improve our services, including page views, features used, and timestamps.</li>
                <li><strong>Device Information:</strong> We collect information about your device, browser, IP address, and operating system.</li>
                <li><strong>Payment Information:</strong> For premium subscriptions, we collect payment information through Stripe and do not directly store credit card details.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect for:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Providing, maintaining, and improving our services</li>
                <li>Personalizing your experience and delivering content relevant to your interests</li>
                <li>Processing transactions and sending transactional emails</li>
                <li>Communicating with you about service updates, security alerts, and support</li>
                <li>Analytics and understanding how users interact with our platform</li>
                <li>Preventing fraudulent transactions and enhancing security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>


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