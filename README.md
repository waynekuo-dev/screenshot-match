# Screenshot Match

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/85746fcc-1024-40e6-88c5-f2e1261f06f3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Architecture

This is a plain **Vite + React single-page app** with client-side routing
(React Router). There is no SSR/server runtime.

- `index.html` → `src/main.tsx` → `src/App.tsx` (providers + routes)
- Routes: `/` (landing), `/auth` (sign-in), `/sign-up`, `/app` (private workspace)
- Auth: Supabase, verified client-side (`src/components/account/RequireAuth.tsx`)
- `npm run build` emits a static bundle to `dist/`

## Deploy on Vercel

The app builds to a static `dist/` and ships with a SPA fallback so deep links
like `/app` resolve client-side:

- Build command: `vite build` · Output directory: `dist` (see `vercel.json`)
- Set the `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` environment
  variables in the Vercel project settings.
