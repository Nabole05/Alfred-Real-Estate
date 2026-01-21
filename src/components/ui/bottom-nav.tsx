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
        <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-safe pointer-events-none">
            <div className="relative mx-4 mb-4 pointer-events-auto">
                <div className="bg-zinc-950/90 backdrop-blur-3xl border border-white/[0.08] rounded-[24px] px-2 py-3 shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-around">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative flex-1 flex flex-col items-center justify-center py-2 transition-all active:scale-95 touch-manipulation"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-x-1 inset-y-1 bg-white/[0.08] rounded-2xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                        <Icon
                                            size={20}
                                            strokeWidth={isActive ? 2 : 1.5}
                                            className={isActive ? "text-white" : "text-zinc-500"}
                                        />
                                        <span
                                            className={`text-[9px] font-bold uppercase tracking-tighter ${isActive ? "text-white" : "text-zinc-600"
                                                }`}
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
