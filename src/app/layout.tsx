import type { Metadata } from "next";

import { Providers } from "@Components/provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "151_Exchange",
  description: "Exchange helper for pokemon 151 serie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
