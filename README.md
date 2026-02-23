# Tool Boilerplate (Config-Driven)

This is a modern, reusable Next.js + TypeScript + Tailwind + shadcn Tool Boilerplate designed for a daily free tools pipeline. It provides a robust, config-driven foundation to quickly launch new tools with a premium dark-mode aesthetic, features like a Buy Me a Coffee widget, and a localized subscription modal.

## What is this for?
This template serves as a quick-start generator for building single-purpose web tools on a daily basis. Instead of setting up a new Next.js project from scratch each time, you can clone this boilerplate and configure it using a single central configuration file.

## How to start a new tool

1. **Update Configuration**
   Edit `src/config/site.ts`. This single source of truth controls the application styling and copy:
   - Tool name, hero text, subtitles
   - Accent color token (e.g., `"emerald"`, `"teal"`, `"indigo"`)
   - GitHub repo & fork links
   - Author details
   - Features section content
   - Subscription modal settings & BMC widget details

2. **Build the Tool UI**
   Open `src/components/tool/tool-shell.tsx` and replace its placeholder content with your actual tool components and logic.

## Links & Integrations
- **GitHub & Author Links**: Update `githubRepoUrl`, `githubForkUrl`, `authorName`, and `authorGithubUrl` in the config.
- **BuyMeACoffee**: Handled automatically. Make sure your ID and message are configured in the `site.ts`.
- **Subscribe Modal**: The app has an email capture modal that appears *after* the user successfully performs a core action (e.g., clicking generate/copy) in your tool. It uses `localStorage` to never bother the user again after they dismiss or submit it.

## Setting up Subscription Backend
The subscription feature posts user emails to a Google Sheets endpoint.
1. Create a Google Apps Script web app that accepts POST requests with the payload `{ email, source, toolName, timestamp }`.
2. Update the `googleSheetsEndpoint` in `src/config/site.ts` with your web app URL.

*Note: The current implementation sends the request successfully directly from the client side using browser `fetch()`.*

## Tech Stack
- **Framework**: Next.js App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui & lucide-react
- **Validation**: zod
- **Testing**: Vitest + React Testing Library

## Commands

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```
