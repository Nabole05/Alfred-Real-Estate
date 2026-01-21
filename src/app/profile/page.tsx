"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
    User,
    Mail,
    Building2,
    LogOut,
    Link as LinkIcon,
    ExternalLink,
    Database,
    ShieldCheck,
    ChevronRight
} from "lucide-react";
import IntegrationWizard from "@/components/alfred/integration-wizard";
import { AnimatePresence } from "framer-motion";

export default function ProfilePage() {
    const [wizardType, setWizardType] = useState<"gmail" | "whatsapp" | null>(null);

    return (
        <div className="min-h-screen px-5 pt-8 pb-32 overflow-x-hidden">
            <div className="max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center ring-1 ring-white/10 relative">
                        <User size={32} strokeWidth={1.5} className="text-zinc-400" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Agente Inmobiliario
                    </h1>
                    <p className="text-zinc-500 text-xs flex items-center justify-center gap-1.5">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        Cuenta Verificada
                    </p>
                </div>

                <div className="space-y-3">
                    <GlassCard className="p-4 border-white/5 bg-zinc-900/20">
                        <div className="flex items-center gap-3">
                            <Mail size={18} strokeWidth={1.5} className="text-zinc-400" />
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Email</p>
                                <p className="text-white text-sm">agente@alfred.com</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-4 border-white/5 bg-zinc-900/20">
                        <div className="flex items-center gap-3">
                            <Building2 size={18} strokeWidth={1.5} className="text-zinc-400" />
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Agencia</p>
                                <p className="text-white text-sm">ALFRED Real Estate</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Sincronización Section */}
                    <div className="pt-8 pb-2">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.2em]">Sincronización & Canales</h2>
                            <span className="text-[9px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full border border-white/5">Beta</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {/* Google / Gmail */}
                            <GlassCard
                                onClick={() => setWizardType("gmail")}
                                className="p-4 bg-zinc-950/40 border-white/5 hover:border-white/10 transition-all cursor-pointer group active:scale-[0.98]"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ring-1 ring-white/5 group-hover:ring-white/10 transition-all">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">Google Calendar</h3>
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Sincronizar agenda</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                </div>
                            </GlassCard>

                            {/* WhatsApp */}
                            <GlassCard
                                onClick={() => setWizardType("whatsapp")}
                                className="p-4 bg-zinc-950/40 border-white/5 hover:border-white/10 transition-all cursor-pointer group active:scale-[0.98]"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 ring-1 ring-emerald-500/10 group-hover:ring-emerald-500/30 transition-all">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12.01 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 1.77.46 3.43 1.28 4.87l-1.36 4.99 5.1-.11c1.4.78 3 1.22 4.69 1.22 5.52 0 10-4.47 10-9.99 0-5.52-4.48-9.99-10.01-9.99zm6.46 13.9c-.27.75-1.57 1.37-2.15 1.46-.5.08-1.15.11-3.23-.75-2.67-1.1-4.39-3.81-4.52-3.99-.13-.17-1.09-1.44-1.09-2.75 0-1.3.69-1.93.94-2.19.25-.26.54-.33.72-.33.18 0 .36-.01.52.01.17.02.39-.06.61.47.22.52.76 1.84.82 1.97.07.13.11.28.02.46-.09.18-.13.31-.22.44-.09.13-.19.3-.27.38-.1.1-.2.2-.09.39.1.18.47.78 1.01 1.26.69.62 1.28.81 1.46.9.18.09.28.08.39-.05.11-.13.46-.54.59-.73.13-.18.26-.15.44-.09.17.06 1.11.53 1.3.62.2.09.33.14.38.22.05.08.05.46-.22 1.21z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">WhatsApp Business</h3>
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Gestión de mensajes</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    <div className="pt-8 pb-2">
                        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-1">Conexiones CRM</h2>

                        <div className="space-y-3">
                            {/* Remax */}
                            <GlassCard className="p-4 bg-zinc-900/40 border-white/5 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 ring-1 ring-red-500/10 transition-all">
                                            <span className="font-black text-xs">R</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">Remax</h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                                <span className="text-[10px] text-zinc-500">Desconectado</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                                </div>
                            </GlassCard>

                            {/* Tokko Broker */}
                            <GlassCard className="p-4 bg-zinc-900/40 border-white/5 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 ring-1 ring-sky-500/10 transition-all">
                                            <Database size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">Tokko Broker</h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                                <span className="text-[10px] text-zinc-500">Desconectado</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                                </div>
                            </GlassCard>

                            {/* HubSpot */}
                            <GlassCard className="p-4 bg-zinc-900/40 border-white/5 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 ring-1 ring-orange-500/10 transition-all">
                                            <LinkIcon size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">HubSpot</h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                                <span className="text-[10px] text-zinc-500">Desconectado</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    <button className="w-full p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-red-500/10 hover:border-red-500/20 transition-all flex items-center justify-center gap-2 text-red-400 mt-10 mb-10">
                        <LogOut size={18} strokeWidth={1.5} />
                        <span className="font-semibold text-sm">Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {wizardType && (
                    <IntegrationWizard
                        type={wizardType}
                        onClose={() => setWizardType(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
