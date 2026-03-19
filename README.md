# Jana Website

Production-ready website migration for Ruth Jana Braunsteffer.

## Stack

- Next.js (React)
- Static export (`output: "export"`)
- TypeScript
- GitHub Actions (CI + deploy)

## Project Structure

- `src/app`: App Router pages and global styles
- `src/components`: UI components
- `src/data/site.json`: Multilanguage content source (`de`, `en`)
- `public/assets`: Runtime image assets
- `legacy`: Original prototype (HTML/CSS/JS)

## Development

```bash
pnpm install
pnpm dev
```

## Build Static Site

```bash
pnpm build
```

Static output is generated in `out/`.

For a local GitHub Pages-compatible build, use:

```bash
GITHUB_PAGES=true pnpm build
```

## Deploy

Both deploy workflows trigger automatically when a version tag is pushed:

```bash
git tag v1.0.0
git push origin v1.0.0
```

### GitHub Pages

The site publishes to <https://alejosky.github.io/jana> via `.github/workflows/pages.yml` using the built-in `actions/deploy-pages` action. No repository secrets are required.

Enable GitHub Pages in the repository settings under **Settings → Pages → Source → GitHub Actions** before the first deploy.

### SSH Server

The workflow `.github/workflows/deploy.yml` deploys the static export to a private server over SSH.
