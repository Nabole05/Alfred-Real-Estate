"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Flame, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ActionableInsights() {
    // Operational insights - things that require action
    const insights = [
        {
            id: 1,
            title: "1 lead caliente",
            subtitle: "Responder hoy",
            icon: Flame,
            iconColor: "text-orange-400",
            bgGlow: "bg-orange-500/10",
            borderColor: "border-orange-500/20",
            href: "/leads",
            urgent: true,
            action: "Ver lead",
        },
        {
            id: 2,
            title: "Próxima visita",
            subtitle: "16:30 • Palermo",
            icon: Calendar,
            iconColor: "text-blue-400",
            bgGlow: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            href: "/agenda",
            urgent: false,
            action: "Ver agenda",
        },
        {
            id: 3,
            title: "3 tareas pendientes",
            subtitle: "2 de alta prioridad",
            icon: CheckCircle2,
            iconColor: "text-emerald-400",
            bgGlow: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            href: "/tasks",
            urgent: false,
            action: "Ver tareas",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-3 pb-24"
        >
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 font-bold mb-4 px-1">
                Requiere tu atención
            </h2>

            {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                    <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    >
                        <Link href={insight.href}>
                            <GlassCard
                                className={`
                  p-4 relative overflow-hidden
                  hover:bg-white/10 transition-all duration-300
                  cursor-pointer group
                  ${insight.urgent ? "border border-orange-500/30" : ""}
                `}
                            >
                                {/* Subtle gradient overlay */}
                                <div
                                    className={`absolute inset-0 ${insight.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                />

                                <div className="relative z-10 flex items-center justify-between">
                                    {/* Left side: Icon + Text */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2.5 ${insight.bgGlow} border ${insight.borderColor} rounded-lg`}
                                        >
                                            <Icon
                                                size={18}
                                                strokeWidth={1.5}
                                                className={insight.iconColor}
                                            />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                {insight.title}
                                            </p>
                                            <p className="text-[10px] text-zinc-500 mt-0.5">
                                                {insight.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right side: Action label + Arrow */}
                                    <div className="flex items-center gap-2">
                                        <motion.span
                                            className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            {insight.action}
                                        </motion.span>
                                        <motion.div
                                            className="opacity-0 group-hover:opacity-100"
                                            initial={{ x: -5 }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowRight
                                                size={16}
                                                strokeWidth={2}
                                                className="text-zinc-400"
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Urgent pulse indicator */}
                                {insight.urgent && (
                                    <motion.div
                                        animate={{
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute top-2 right-2"
                                    >
                                        <div className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]" />
                                    </motion.div>
                                )}
                            </GlassCard>
                        </Link>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
