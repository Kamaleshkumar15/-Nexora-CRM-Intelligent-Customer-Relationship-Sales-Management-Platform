import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/providers/Providers";
export const metadata: Metadata = { title: "Nexora CRM", description: "Professional customer intelligence workspace" };
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>}
