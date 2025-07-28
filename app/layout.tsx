import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FischGPT - AI Assistant by Kristian Fischer",
  description: "A custom AI assistant powered by FischGPT-SFT - showcasing full-stack AI engineering capabilities with a custom-trained GPT model.",
  keywords: ["AI", "ChatGPT", "FischGPT", "Machine Learning", "LLM", "Kristian Fischer"],
  authors: [{ name: "Kristian Fischer" }],
  creator: "Kristian Fischer",
  openGraph: {
    title: "FischGPT - Custom AI Assistant",
    description: "Experience FischGPT-SFT, a custom-trained AI model showcasing full-stack AI engineering.",
    url: "https://kristian-fischer.com/fischgpt",
    siteName: "FischGPT",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
