import type { Metadata } from "next";

import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Ruth Jana Braunsteffer, MA",
  description: "Gitarrenunterricht, Biografie, Media, Inklusion und Kontakt von Ruth Jana Braunsteffer.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: `${basePath}/assets/logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <style>{`:root { --hero-bg-url: url('${basePath}/assets/jana_guitar_bw.jpg'); }`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}