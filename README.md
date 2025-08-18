# Nepal Gov Portal

A group college project: This is a prototype of a unified governmental portal, designed to simplify public access to various government services in Nepal. The portal brings together features such as government service applications, online bill payments, health insurance claims, and more—all in one place. Built as a modern full-stack web application, this project demonstrates how digital solutions can streamline public service delivery and improve accessibility for citizens.

---

## Tech Stack

- **Package Manager**: [PNPM](https://pnpm.io/) (recommended)
- **Frontend**: React 18, React Router 6 (SPA), TypeScript, Vite, TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI, TailwindCSS 3, Lucide React icons

---

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx               # App entry point + SPA routing
└── global.css            # TailwindCSS theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (Express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share API interfaces
```

---

## Key Features

- **SPA Routing**: Powered by React Router 6; route files in `client/pages/`
- **Unified Styling**: TailwindCSS 3 utility classes, theme tokens in `global.css`, and reusable UI components
- **Type Safety**: Shared types/interfaces between client and server for end-to-end type safety
- **Hot Reload**: Full hot reload for both client and server in development
- **Single Port**: Both frontend and backend run on the same port for a seamless DX
- **API Endpoints**: All backend routes prefixed with `/api/`
- **Production Ready**: Supports binary and cloud deployments (Netlify, Vercel)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PNPM](https://pnpm.io/) (install globally if not present)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev        # Start dev server (client + server)
```

### Production Build

```bash
pnpm build      # Build for production
pnpm start      # Start production server
```

### Other Scripts

```bash
pnpm typecheck  # TypeScript validation
pnpm test       # Run Vitest tests
```

---

## SPA Routing System

- `client/pages/Index.tsx` is the home page.
- Routes are defined in `client/App.tsx` using `react-router-dom`.
- To add a new page, simply add a file in `client/pages/` and register the route in `App.tsx`.

**Example route definition:**
```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
<Routes>
  <Route path="/" element={<Index />} />
  {/* Add custom routes above the catch-all "*" route */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme/Design tokens**: Configure in `client/global.css`
- **UI components**: Pre-built, reusable in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

**Example:**
```typescript
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

---

## Express Server Integration

- **Development**: Runs on port 8080 (frontend + backend)
- **API endpoints**: Prefixed with `/api/`
- **Hot reload**: Supports both frontend and backend code

**Example API routes:**
- `GET /api/ping` - Simple ping endpoint
- `GET /api/demo` - Demo endpoint

---

## Shared Types

Import consistent types in both client and server for safer API communication:

```typescript
import { DemoResponse } from '@shared/api';
```

Aliases:
- `@shared/*` – Shared folder
- `@/*` – Client folder

---

## Adding Features

### Add New Colors to the Theme

- Update both `client/global.css` and `tailwind.config.ts` to add new Tailwind colors.

### Add a New API Route

1. *(Optional)* Create a shared interface in `shared/api.ts`:
    ```typescript
    export interface MyRouteResponse {
      message: string;
    }
    ```
2. Create the route handler in `server/routes/my-route.ts`:
    ```typescript
    import { RequestHandler } from "express";
    import { MyRouteResponse } from "@shared/api";
    export const handleMyRoute: RequestHandler = (req, res) => {
      const response: MyRouteResponse = { message: 'Hello from my endpoint!' };
      res.json(response);
    };
    ```
3. Register the route in `server/index.ts`:
    ```typescript
    import { handleMyRoute } from "./routes/my-route";
    app.get("/api/my-endpoint", handleMyRoute);
    ```
4. Use the new endpoint in your React app:
    ```typescript
    import { MyRouteResponse } from '@shared/api';
    const response = await fetch('/api/my-endpoint');
    const data: MyRouteResponse = await response.json();
    ```

### Add a New Page Route

1. Create a component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
    ```typescript
    <Route path="/my-page" element={<MyPage />} />
    ```

---

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud**: Deploy to Netlify or Vercel via MCP integrations. Both work seamlessly.

---

## Contributing

Contributions welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## License

[MIT](LICENSE)

---

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript end-to-end (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces
