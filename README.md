# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Shared Data For Multi-Device

To make `register/login/seller/big-admin` data work across different computers, set a shared API in `.env`:

```env
VITE_SHARED_API_BASE_URL=https://YOUR_API_BASE_URL
VITE_SHARED_STATE_COLLECTION=app_state
```

Expected API behavior:
- `GET /app_state` returns list
- `POST /app_state` creates state record
- `GET /app_state/:id` reads state
- `PUT /app_state/:id` updates state

If `VITE_SHARED_API_BASE_URL` is missing or unavailable, the app automatically falls back to `localStorage` mode.
