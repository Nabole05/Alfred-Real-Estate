import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/ui/bottom-nav";
import VoiceFAB from "@/components/alfred/voice-fab";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ALFRED | Luxury Real Estate OS",
  description: "Sistema Operativo Inteligente para Real Estate de Lujo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="bg-glow" />
        <main className="relative z-10 min-h-screen pb-24">
          {children}
        </main>
        <BottomNav />
        {/* Voice FAB - Global, visible en todas las páginas */}
        <VoiceFAB />
      </body>
    </html>
  );
}
