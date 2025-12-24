9912345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455565758596061626364656667import { generateStructuredPrompt, promptTemplates } from './server/services/prompt-generator';import fs from 'fs/promises';async function main() {  console.log(`Starting generation of ${promptTemplates.length} prompts...`);    const generatedPrompts = [];  let successCount = 0;  let errorCount = 0;  for (const template of promptTemplates) {    try {      console.log(`Generating: ${template.title}...`);      const prompt = await generateStructuredPrompt(template);      generatedPrompts.push(prompt);      successCount++;            // Add a small delay to avoid rate limiting      await new Promise(resolve => setTimeout(resolve, 1000));    } catch (error: any) {      console.error(`Failed to generate ${template.title}:`, error.message);      errorCount++;    }  }  console.log(`\nGeneration complete: ${successCount} success, ${errorCount} failed`);  // Read existing prompts file  const promptsFilePath = "./server/data/prompts.ts";  let promptsFileContent = await fs.readFile(promptsFilePath, "utf-8");  // Find the end of the existing prompts array (before the closing bracket)  const lastPromptIndex = promptsFileContent.lastIndexOf("];");    if (lastPromptIndex === -1) {    throw new Error("Could not find prompts array in file");  }  // Generate the new prompts code  const newPromptsCode = generatedPrompts.map(p => `  {    title: ${JSON.stringify(p.title)},    description: ${JSON.stringify(p.description)},    content: ${JSON.stringify(p.content)},    blueprint: ${JSON.stringify(p.blueprint, null, 2).split('\n').join('\n    ')},    category: ${JSON.stringify(p.category)},    tags: ${JSON.stringify(p.tags)},    platform: ${JSON.stringify(p.platform)},    qualityScore: ${JSON.stringify(p.qualityScore)},    rating: ${JSON.stringify(p.rating)},    downloads: ${JSON.stringify(p.downloads)},    tier: ${JSON.stringify(p.tier)}  }`).join(',\n');  // Insert new prompts before the closing bracket  const updatedContent =     promptsFileContent.slice(0, lastPromptIndex) +     ',\n' + newPromptsCode + '\n' +    promptsFileContent.slice(lastPromptIndex);  // Write back to file  await fs.writeFile(promptsFilePath, updatedContent, "utf-8");  console.log(`\n✅ Successfully wrote ${successCount} new prompts to ${promptsFilePath}`);}main().catch(console.error); Project Planner Prompt Library
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
9912345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455565758596061626364656667
import { generateStructuredPrompt, promptTemplates } from './server/services/prompt-generator';import fs from 'fs/promises';async function main() {  console.log(`Starting generation of ${promptTemplates.length} prompts...`);    const generatedPrompts = [];  let successCount = 0;  let errorCount = 0;  for (const template of promptTemplates) {    try {      console.log(`Generating: ${template.title}...`);      const prompt = await generateStructuredPrompt(template);      generatedPrompts.push(prompt);      successCount++;            // Add a small delay to avoid rate limiting      await new Promise(resolve => setTimeout(resolve, 1000));    } catch (error: any) {      console.error(`Failed to generate ${template.title}:`, error.message);      errorCount++;    }  }  console.log(`\nGeneration complete: ${successCount} success, ${errorCount} failed`);  // Read existing prompts file  const promptsFilePath = "./server/data/prompts.ts";  let promptsFileContent = await fs.readFile(promptsFilePath, "utf-8");  // Find the end of the existing prompts array (before the closing bracket)  const lastPromptIndex = promptsFileContent.lastIndexOf("];");    if (lastPromptIndex === -1) {    throw new Error("Could not find prompts array in file");  }  // Generate the new prompts code  const newPromptsCode = generatedPrompts.map(p => `  {    title: ${JSON.stringify(p.title)},    description: ${JSON.stringify(p.description)},    content: ${JSON.stringify(p.content)},    blueprint: ${JSON.stringify(p.blueprint, null, 2).split('\n').join('\n    ')},    category: ${JSON.stringify(p.category)},    tags: ${JSON.stringify(p.tags)},    platform: ${JSON.stringify(p.platform)},    qualityScore: ${JSON.stringify(p.qualityScore)},    rating: ${JSON.stringify(p.rating)},    downloads: ${JSON.stringify(p.downloads)},    tier: ${JSON.stringify(p.tier)}  }`).join(',\n');  // Insert new prompts before the closing bracket  const updatedContent =     promptsFileContent.slice(0, lastPromptIndex) +     ',\n' + newPromptsCode + '\n' +    promptsFileContent.slice(lastPromptIndex);  // Write back to file  await fs.writeFile(promptsFilePath, updatedContent, "utf-8");  console.log(`\n✅ Successfully wrote ${successCount} new prompts to ${promptsFilePath}`);}main().catch(console.error);
import { generateStructuredPrompt, promptTemplates } from './server/services/prompt-generator';
import fs from 'fs/promises';

async function main() {
  console.log(`Starting generation of ${promptTemplates.length} prompts...`);
  
  const generatedPrompts = [];
  let successCount = 0;
  let errorCount = 0;

  for (const template of promptTemplates) {
    try {
      console.log(`Generating: ${template.title}...`);
      const prompt = await generateStructuredPrompt(template);
      generatedPrompts.push(prompt);
      successCount++;
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
      console.error(`Failed to generate ${template.title}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\nGeneration complete: ${successCount} success, ${errorCount} failed`);

  // Read existing prompts file
  const promptsFilePath = "./server/data/prompts.ts";
  let promptsFileContent = await fs.readFile(promptsFilePath, "utf-8");

  // Find the end of the existing prompts array (before the closing bracket)
  const lastPromptIndex = promptsFileContent.lastIndexOf("];");
  
  if (lastPromptIndex === -1) {
    throw new Error("Could not find prompts array in file");
  }

  // Generate the new prompts code
  const newPromptsCode = generatedPrompts.map(p => `  {
    title: ${JSON.stringify(p.title)},
    description: ${JSON.stringify(p.description)},
    content: ${JSON.stringify(p.content)},
    blueprint: ${JSON.stringify(p.blueprint, null, 2).split('\n').join('\n    ')},
    category: ${JSON.stringify(p.category)},
    tags: ${JSON.stringify(p.tags)},
    platform: ${JSON.stringify(p.platform)},
    qualityScore: ${JSON.stringify(p.qualityScore)},
    rating: ${JSON.stringify(p.rating)},
    downloads: ${JSON.stringify(p.downloads)},
    tier: ${JSON.stringify(p.tier)}
  }`).join(',\n');

  // Insert new prompts before the closing bracket
  const updatedContent = 
    promptsFileContent.slice(0, lastPromptIndex) + 
    ',\n' + newPromptsCode + '\n' +
    promptsFileContent.slice(lastPromptIndex);

  // Write back to file
  await fs.writeFile(promptsFilePath, updatedContent, "utf-8");

  console.log(`\n✅ Successfully wrote ${successCount} new prompts to ${promptsFilePath}`);
}

main().catch(console.error);



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