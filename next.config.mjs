const githubPagesBasePath =
  process.env.GITHUB_PAGES === "true" ? "/jana" : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  ...(githubPagesBasePath
    ? {
        basePath: githubPagesBasePath,
        assetPrefix: githubPagesBasePath,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath ?? "",
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  trailingSlash: true,
};

export default nextConfig;
