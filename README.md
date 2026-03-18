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
npm install
npm run dev
```

## Build Static Site

```bash
npm run build
```

Static output is generated in `out/`.

## Deploy via GitHub Actions (SSH)

Configure repository secrets:

- `SSH_PRIVATE_KEY`: private key for server access
- `SSH_HOST`: host from your SSH config (`jana` target host)
- `SSH_USER`: remote user
- `SSH_PORT`: remote SSH port (usually `22`)
- `DEPLOY_PATH`: remote directory to publish static files

Deployment runs automatically on push to `main` via `.github/workflows/deploy.yml`.