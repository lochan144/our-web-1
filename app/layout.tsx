import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import localFont from "next/font/local"
import "./globals.css"

const aptos = localFont({
  src: [
    {
      path: "../public/fonts/Aptos.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Aptos-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-aptos",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Kunthive - Find the Best Developers",
  description: "Connecting you with exceptional development talent for perpetual growth and innovation",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${aptos.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
