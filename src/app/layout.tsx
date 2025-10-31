import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "100",
});

export const metadata: Metadata = {
  title: "Portfolio Adrien Delagneau",
  description:
    "Portfolio 3D interactif avec caméra isométrique, présentant mes projets web réalisés avec Next.js et React Three Fiber.",
  robots: "index, follow",
  openGraph: {
    title: "Portfolio Adrien Delagneau",
    description:
      "Portfolio 3D interactif avec caméra isométrique, présentant mes projets web réalisés avec Next.js et React Three Fiber.",
    url: "https://adrien-delagneau-fr",
    siteName: "Portfolio Adrien Delagneau",
    images: [
      {
        url: "https://adrien-delagneau-fr/preview.png",
        width: 1200,
        height: 630,
        alt: "Aperçu du portfolio 3D",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Adrien Delagneau",
    description:
      "Portfolio 3D interactif avec caméra isométrique, présentant mes projets web réalisés avec Next.js et React Three Fiber.",
    images: ["https://adrien-delagneau-fr/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${lato.variable} antialiased`}>{children}</body>
    </html>
  );
}
