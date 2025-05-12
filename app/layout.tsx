import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EHR Resource Viewer",
  description: "View and manage electronic health record resources",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <div className="min-h-screen">
          <header className="border-b bg-background py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-xl font-bold">EHR Resource Viewer</h1>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
