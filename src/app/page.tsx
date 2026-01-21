"use client";

import AlfredStatus from "@/components/alfred/alfred-status";
import ActionableInsights from "@/components/alfred/actionable-insights";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen px-5 pt-8 pb-32">
      <div className="max-w-md mx-auto">
        {/* Hero Section - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl font-bold tracking-tight text-white mb-2">
            ALFRED
          </h1>
          <p className="text-zinc-500 text-xs font-light tracking-wide">
            Tu asistente de Real Estate
          </p>
        </motion.div>

        {/* ALFRED Status - Dynamic State */}
        <AlfredStatus />

        {/* Actionable Insights - Operational focus */}
        <ActionableInsights />
      </div>

      {/* Optional: Subtle hint for voice interaction - only on home */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="fixed bottom-28 left-0 right-0 text-center z-40 pointer-events-none"
      >
        <p className="text-zinc-600 text-xs">
          Presiona el micrófono para hablar con Alfred
        </p>
      </motion.div>
    </div>
  );
}
