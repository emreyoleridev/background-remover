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

## Branding / Favicons

The following favicon and PWA icon files live under `/public`. Replace them with your own artwork before shipping:

| File | Size | Purpose |
|---|---|---|
| `favicon.ico` | — | Classic browser tab icon (fallback) |
| `favicon-16x16.png` | 16 × 16 | Small browser tab icon |
| `favicon-32x32.png` | 32 × 32 | Standard browser tab icon |
| `apple-touch-icon.png` | 180 × 180 | iOS home-screen icon |
| `android-chrome-192x192.png` | 192 × 192 | Android home-screen / PWA icon |
| `android-chrome-512x512.png` | 512 × 512 | Android splash / high-DPI PWA icon |
| `mstile-150x150.png` | 150 × 150 | Windows pinned-site tile |
| `site.webmanifest` | — | PWA manifest (auto-served) |
| `browserconfig.xml` | — | Windows / Edge tile config |

### How to replace favicons
1. Design your icon at **1024 × 1024 px** or larger.
2. Resize and export all sizes listed above (tools: [realfavicongenerator.net](https://realfavicongenerator.net) or Figma export).
3. Drop the files into `/public`, overwriting the existing ones.
4. No code changes are needed — `layout.tsx` and the manifests already reference these paths.

### Config fields that control branding

All branding values live in `src/config/site.ts`:

| Field | Type | Effect |
|---|---|---|
| `shortName` | `string` | `short_name` in `site.webmanifest` |
| `themeColorHex` | `string` (hex) | `theme_color` in manifest + `msapplication-TileColor` meta tag + `TileColor` in `browserconfig.xml` |
| `backgroundColorHex` | `string` (hex) | `background_color` in `site.webmanifest` |

> **Note:** After changing hex colors make sure to update `public/browserconfig.xml` → `<TileColor>` manually (or wire it through your build step), since that XML is a static file.

---

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
