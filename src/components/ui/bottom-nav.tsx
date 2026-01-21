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
        <nav className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-6 pt-2 pointer-events-none">
            <div className="max-w-md mx-auto pointer-events-auto">
                <div className="bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-[26px] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative flex-1 flex flex-col items-center justify-center py-2.5 transition-all active:scale-90"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIcon"
                                            className="absolute inset-1 bg-white/[0.07] rounded-2xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                        <Icon
                                            size={20}
                                            strokeWidth={isActive ? 2.5 : 1.5}
                                            className={isActive ? "text-white" : "text-zinc-500"}
                                        />
                                        <span
                                            className={`text-[8px] font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-zinc-600"}`}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
