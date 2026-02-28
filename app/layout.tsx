import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Agentation } from "agentation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://llamadns.org"),
  title: "LlamaDNS - Free Dynamic DNS",
  description:
    "Free dynamic DNS service. Claim a subdomain, update your IP with a simple API call.",
  openGraph: {
    title: "LlamaDNS - Free Dynamic DNS",
    description:
      "Claim a subdomain, point it at your server, and update it with a single HTTP request.",
    url: "https://llamadns.org",
    siteName: "LlamaDNS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LlamaDNS - Free Dynamic DNS service",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LlamaDNS - Free Dynamic DNS",
    description:
      "Claim a subdomain, point it at your server, and update it with a single HTTP request.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LlamaDNS - Free Dynamic DNS service",
      },
    ],
  },
  other: {
    "theme-color": "#080808",
    "msapplication-TileColor": "#080808",
  },
  appleWebApp: {
    title: "LlamaDNS",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans text-gray-400 antialiased`}
      >
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
