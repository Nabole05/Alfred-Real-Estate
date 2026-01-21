"use client";

import { motion } from "framer-motion";
import { Home, Building2, Users, User, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
    { name: "Inicio", icon: Home, href: "/" },
    { name: "Propiedades", icon: Building2, href: "/properties" },
    { name: "Documentos", icon: FileText, href: "/documents" },
    { name: "Leads", icon: Users, href: "/leads" },
    { name: "Perfil", icon: User, href: "/profile" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe">
            <div className="relative mx-4 mb-4">
                <div className="bg-zinc-950/80 backdrop-blur-2xl border border-white/[0.08] rounded-[20px] px-1 py-3.5 shadow-2xl">
                    <div className="flex items-center justify-around">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link key={item.name} href={item.href} className="relative flex-1">
                                    <motion.div
                                        whileTap={{ scale: 0.92 }}
                                        className="flex flex-col items-center gap-1.5 py-2 relative"
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-white/[0.06] rounded-xl"
                                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                            />
                                        )}
                                        <div className="relative z-10">
                                            <Icon
                                                size={22}
                                                strokeWidth={1.5}
                                                className={isActive ? "text-white" : "text-zinc-500"}
                                            />
                                        </div>
                                        <span
                                            className={`relative z-10 text-[9px] font-medium uppercase tracking-wider ${isActive ? "text-white" : "text-zinc-600"
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
