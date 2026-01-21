"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

type StatusType = {
    text: string;
    icon: typeof Sparkles;
    color: string;
};

export default function AlfredStatus() {
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
    const isActive = true;

    // Dynamic status messages that rotate to show ALFRED is "alive"
    const statuses: StatusType[] = [
        {
            text: "Listo para ayudarte",
            icon: Sparkles,
            color: "emerald",
        },
        {
            text: "Analizando tu agenda",
            icon: Clock,
            color: "blue",
        },
        {
            text: "Monitoreando leads",
            icon: TrendingUp,
            color: "purple",
        },
    ];

    const currentStatus = statuses[currentStatusIndex];
    const IconComponent = currentStatus.icon;

    // Rotate status every 5 seconds to show activity
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [statuses.length]);

    const getColorClasses = (color: string) => {
        const colors = {
            emerald: {
                dot: "bg-emerald-400",
                glow: "bg-emerald-400/30",
                icon: "text-emerald-400/70",
            },
            blue: {
                dot: "bg-blue-400",
                glow: "bg-blue-400/30",
                icon: "text-blue-400/70",
            },
            purple: {
                dot: "bg-purple-400",
                glow: "bg-purple-400/30",
                icon: "text-purple-400/70",
            },
        };
        return colors[color as keyof typeof colors] || colors.emerald;
    };

    const colorClasses = getColorClasses(currentStatus.color);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 flex items-center justify-center gap-2"
        >
            {/* Indicator Dot with breathing animation */}
            <div className="relative">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute inset-0 ${colorClasses.glow} rounded-full blur-sm`}
                />
                <div
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? colorClasses.dot : "bg-zinc-600"
                        } relative z-10`}
                />
            </div>

            {/* Status Text with fade transition */}
            <motion.div
                key={currentStatusIndex}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.4 }}
                className="text-xs font-medium text-zinc-400 tracking-wide flex items-center gap-1.5"
            >
                {currentStatus.text}
                {isActive && (
                    <motion.span
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <IconComponent size={12} className={colorClasses.icon} />
                    </motion.span>
                )}
            </motion.div>
        </motion.div>
    );
}
