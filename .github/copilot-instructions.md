# Project Guidelines

## Code Style
- Use TypeScript for app and component code.
- Keep components small and focused; preserve existing class names in UI work to avoid visual regressions.
- Follow existing formatting and avoid unrelated refactors.

## Architecture
- Framework: Next.js App Router with static export (`output: "export"`).
- Content source: `src/data/site.json` with locale-specific text and metadata.
- Presentational shell lives in `src/components/site-shell.tsx` and is reused by locale routes.
- Legacy prototype is archived in `legacy/` and should remain untouched unless migration parity work is requested.

## Build and Test
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Type check: `npm run typecheck`
- Lint: `npm run lint`
- Production static build: `npm run build`

## Conventions
- Keep locale routes in `src/app/[locale]/page.tsx` and ensure `generateStaticParams` includes all supported languages.
- For SEO/OpenGraph changes, update page metadata in `src/app/page.tsx` and `src/app/[locale]/page.tsx`.
- Runtime assets must live under `public/assets` for static export compatibility.
- Do not reintroduce client-side fetch/render for core content that is already statically generated.