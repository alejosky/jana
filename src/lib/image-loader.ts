// Custom Next.js image loader that prepends basePath so images resolve
// correctly when the site is served from a sub-path (e.g. /jana on GitHub Pages).
export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${src}`;
}
