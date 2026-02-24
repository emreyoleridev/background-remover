# Background Remover Pro

Background Remover Pro is a high-performance, privacy-focused image background removal tool that runs **100% in your browser**. Using high-performance WebAssembly, your images never leave your device – no servers, no cloud uploads, and no privacy compromises.

![Background Remover Pro Hero](/public/og-image.png)

## ✨ Key Features

- **100% Local Processing**: Powered by `@imgly/background-removal` WASM engine. Processing happens locally on your hardware.
- **Zero Privacy Risk**: Images are never uploaded to any server. Your data stays with you.
- **Instant Result**: Real-time processing with a scanning animation and progress tracking.
- **High Quality**: Downloads as high-resolution transparent PNG.
- **Free & Unlimited**: No accounts, no subscriptions, no watermarks.
- **Modern UI**: Built with TailwindCSS 4 and shadcn/ui with a premium dark-first design.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Core Engine**: [@imgly/background-removal](https://www.npmjs.com/package/@imgly/background-removal)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/)

## 🛠️ Local Development

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd image-background-remover
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy the example env file and fill in your details (optional for subscriptions):
   ```bash
   cp .env.example .env
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run tests**:
   ```bash
   npm test
   ```

## 📂 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/boilerplate/layout/tool-shell.tsx`: Core logic for background removal flow (idle → preview → processing → done).
- `src/components/boilerplate/common/upload-zone.tsx`: Drag-and-drop file upload component with validation.
- `src/config/`: Centralized site and content configuration.
- `src/lib/boilerplate/`: Theme utilities, sharing architecture, and core helpers.
- `tests/boilerplate/`: Comprehensive test suite for UI and logic.

## 📋 Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT` | API endpoint for the newsletter subscription form. |

## 📦 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/) or any other static hosting provider. It can be built as a standalone static site:

```bash
npm run build
```

## 📄 License

MIT License. Built with ❤️ by [Emre Yoleri](https://emreyoleri.dev).
