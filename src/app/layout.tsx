import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ruth Jana Braunsteffer, MA",
  description: "Gitarrenunterricht, Biografie, Media, Inklusion und Kontakt von Ruth Jana Braunsteffer.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}