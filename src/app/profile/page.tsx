import { GlassCard } from "@/components/ui/glass-card";
import { User, Mail, Building2, LogOut, Link as LinkIcon, ExternalLink, Database } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen px-5 pt-8">
            <div className="max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center ring-1 ring-white/10">
                        <User size={32} strokeWidth={1.5} className="text-zinc-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Agente Inmobiliario
                    </h1>
                    <p className="text-zinc-500 text-xs">
                        Real Estate Professional
                    </p>
                </div>

                <div className="space-y-3">
                    <GlassCard className="p-4">
                        <div className="flex items-center gap-3">
                            <Mail size={18} strokeWidth={1.5} className="text-zinc-400" />
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Email</p>
                                <p className="text-white text-sm">agente@alfred.com</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-4">
                        <div className="flex items-center gap-3">
                            <Building2 size={18} strokeWidth={1.5} className="text-zinc-400" />
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Agencia</p>
                                <p className="text-white text-sm">ALFRED Real Estate</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* CRM Section */}
                    <div className="pt-6 pb-2">
                        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.2em] mb-4">Conexiones CRM</h2>

                        <div className="space-y-3">
                            {/* Remax */}
                            <GlassCard className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
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
                            <GlassCard className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
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
                            <GlassCard className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
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

                    <button className="w-full p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/20 transition-all flex items-center justify-center gap-2 text-red-400 mt-6">
                        <LogOut size={18} strokeWidth={1.5} />
                        <span className="font-semibold text-sm">Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
