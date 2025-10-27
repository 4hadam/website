import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ApolloWrapper } from "@/components/apollo-wrapper"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "World Content Hub - Explore Global Streaming Channels",
  description:
    "Discover and explore streaming channels from countries around the world. Interactive globe viewer with real-time channel information.",
  keywords: ["streaming", "global content", "channels", "world", "entertainment"],
  authors: [{ name: "World Content Hub" }],
  creator: "World Content Hub",
  publisher: "World Content Hub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://world-content-hub.com",
    siteName: "World Content Hub",
    title: "World Content Hub - Explore Global Streaming Channels",
    description:
      "Discover and explore streaming channels from countries around the world. Interactive globe viewer with real-time channel information.",
    images: [
      {
        url: "https://world-content-hub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "World Content Hub - Global Streaming Channels",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "World Content Hub - Explore Global Streaming Channels",
    description: "Discover and explore streaming channels from countries around the world.",
    images: ["https://world-content-hub.com/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  generator: "Next.js",
  applicationName: "World Content Hub",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "World Content Hub",
              description: "Explore global streaming channels with an interactive globe viewer",
              url: "https://world-content-hub.com",
              applicationCategory: "EntertainmentApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
