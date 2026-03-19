const githubPagesBasePath = process.env.GITHUB_PAGES === "true" ? "/jana" : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  ...(githubPagesBasePath
    ? {
      basePath: githubPagesBasePath,
      assetPrefix: githubPagesBasePath,
    }
    : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;