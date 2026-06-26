# learning-client

React SPA — the UI layer. Holds no business logic and talks only to the Node BFF (`learning-server`), never directly to `learning-core-api`.

## Architecture

```
React (learning-client, :5000)
    │  HTTP (REST) + WebSocket
    ▼
Node BFF (learning-server, :5001)
    │  HTTP
    ▼
.NET Core API (learning-core-api, :5002)
    │
    ▼
PostgreSQL
```

- **Auth**: `AuthContext` (`src/context/AuthContext.tsx`) calls `POST {VITE_API_URL}/api/users/auth` on the BFF and stores the logged-in username in `localStorage`. `ProtectedRoute` (`src/components/ProtectedRoute.tsx`) gates routes on `isAuthenticated`.
- **Realtime**: `WebSocketMessageComponent` and `SocketNotificationComponent` connect to `{VITE_SERVER_URL}/chat` and `{VITE_SERVER_URL}/notifications` on the BFF via the shared `useWebSocket` hook.
- **Routing/shell**: `AppShell.tsx` composes `Sidebar`, `BottomNav`, and the routed pages under `src/pages/`.

## Environment variables

| Var | Purpose | Dev default |
|---|---|---|
| `VITE_API_URL` | BFF REST base URL | `http://localhost:5001` |
| `VITE_SERVER_URL` | BFF WebSocket base URL | `ws://localhost:5001` |

Set in `.env.development` / `.env.production`.

## Local development

```bash
npm install
npm run dev
```

Dev server runs on port `5000` (see `vite.config.ts`). Requires `learning-server` running on `5001` and `learning-core-api` running on `5002`.

## Production build

```bash
npm run build
```

Build output goes to `dist/`, deployed by Azure Static Web Apps.

## Deployment notes

- GitHub Actions workflow: `.github/workflows/azure-static-web-apps.yml`, builds from the repo root
- Azure deploys the `dist/` directory