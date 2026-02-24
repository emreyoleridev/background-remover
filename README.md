# SecureStudio - Tool Boilerplate

A production-ready Next.js boilerplate for building and shipping modern, client-side tools.

## Tech Stack

- **Next.js (App Router)**: Framework for server-rendered and static web applications.
- **TypeScript**: Static typing for enhanced developer experience and code reliability.
- **TailwindCSS 4**: Utility-first CSS framework for rapid and consistent styling.
- **shadcn/ui**: High-quality, accessible UI components built with Radix UI.
- **next-themes**: Simplified theme management for light and dark modes.
- **Zod**: Type-safe schema validation for forms and configuration.
- **Vitest**: Vite-native unit testing framework for high-performance testing.
- **Testing Library**: Utilities for testing UI components from a user perspective.

## Project Structure

```text
app/
  globals.css      # Global styles and Tailwind directives
  layout.tsx       # Root layout shell (Header, Footer, Providers)
  page.tsx         # Single root page (Tool entry point)

src/
  components/
    boilerplate/
      common/      # Shared tool components (Modals, Providers, Widgets)
      layout/      # Layout components (Header, Footer, Hero, Features)
    ui/            # shadcn/ui primitives
  config/
    index.ts       # Central configuration (siteConfig, contentConfig)
  lib/
    share.ts       # Sharing logic and platform templates
    theme.ts       # Theme-aware styling utilities
    validators.ts  # Zod schemas for form validation
    utils.ts       # General helper functions
  tests/
    boilerplate/   # Component and utility tests
```

- **app/**: Routing layer utilizing Next.js App Router.
- **components/boilerplate/layout/**: Structural components like `SiteHeader`, `SiteFooter`, and `ToolShell`.
- **components/boilerplate/common/**: Functional components including `ShareModal`, `SubscribeModal`, and `ThemeProvider`.
- **components/ui/**: Reusable shadcn primitives.
- **config/**: Global configuration objects driving the entire UI and behavior.
- **lib/**: Core utilities, sharing architecture, and validation logic.
- **tests/**: Comprehensive testing suite using Vitest.

## Routing Architecture

- Uses **Next.js App Router**.
- **Single Root Page**: `app/page.tsx` serves as the primary entry point.
- **Root Layout**: `app/layout.tsx` defines the persistent shell (Header, Footer, Banner).
- **Tool Injection**: Tool logic is encapsulated within the `ToolShell` component.
- **Extensibility**: Ready for multi-route extension by adding folders under `app/`.

### Adding a New Route
1. Create a new folder in `app/` (e.g., `app/tools/new-tool/`).
2. Add a `page.tsx` file to define the new route’s content.

## Configuration System

Located in `src/config/index.ts`, the system uses `siteConfig` and `contentConfig`.

### siteConfig Keys
- `siteName`: Internal project name.
- `brand`: Signature settings and author URL.
- `seo`: Metadata for search engines and social sharing.
- `accentColor`: Global primary color (e.g., "cyan", "blue", "rose").
- `integrations`: Settings for sharing, subscription (Google Sheets), and social platforms.

### contentConfig Keys
- `hero`: Title and subtitle for the landing section.
- `features`: List of feature items with icons.
- `faqs`: Question and answer pairs.
- `cta`: Call-to-action button settings (Request Tool, Discover More).
- `tool`: Marketing texts specific to the tool shell.

### Share Templates
Platforms are defined with URL templates using tokens:
- `{url}`: Encoded URL of the current page.
- `{text}`: Encoded share text.
- `{title}`: Encoded site title.

## Styling & Theme System

- **TailwindCSS 4**: Uses modern CSS logic and native CSS variables.
- **Dark-First Design**: Optimized for dark mode by default, supported by `next-themes`.
- **Accent Color**: Controlled via `siteConfig.accentColor`, dynamically mapped to CSS variables in `src/lib/theme.ts`.
- **Consistent UI**: Uses a unified system for rounded corners, blurs, and borders.
- **No Inline Styles**: All styling is handled via Tailwind utility classes.

## Share System Architecture

- **Platform Templates**: Configurable URL templates for social platforms.
- **URL Encoding**: Automatic encoding of URLs and text for safe sharing.
- **Client-Side Triggering**: Uses `window.open` for sharing and the **Clipboard API** for link copying.
- **Custom Events**: `triggerShareModal` dispatches a custom event to open the shared UI.

## Form & Validation

- **Zod**: Used for robust, type-safe validation schemas (see `src/lib/validators.ts`).
- **React Hook Form**: Handles form state and submission logic.
- **Integration**: `SubscribeModal` integrates with a Google Sheets endpoint via `fetch`.

## Testing Setup

- **Vitest**: Fast, Vite-native test runner.
- **jsdom**: Simulates a browser environment for UI testing.
- **Testing Library**: Validates component behavior and accessibility.
- **Commands**:
  - `npm test`: Runs all tests.
  - `npm run test -- --coverage`: Generates a coverage report.

## Environment Variables

Copy `.env.example` to `.env` and fill in the following:

```bash
NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT= # API endpoint for subscriptions
```

## Extending the Boilerplate

1. **Update Config**: Modify `src/config/index.ts` with your project details.
2. **Replace Tool Content**: Swap the demo content in `src/components/boilerplate/layout/tool-shell.tsx` with your actual tool logic.
3. **Adjust Branding**: Update favicons in `public/` and meta tags in `src/config/index.ts`.
4. **Run Tests**: Ensure all existing functionality remains stable with `npm test`.
5. **Deploy**: Push to GitHub and connect to **Vercel** for instant deployment.

## Deployment

- **Recommended**: Vercel.
- **Static Output**: The project is optimized for static export if required.
- **Serverless**: No traditional server backend is required; all logic runs client-side.
