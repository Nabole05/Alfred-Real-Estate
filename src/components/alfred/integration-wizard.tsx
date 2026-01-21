"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronRight, Mail, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";

type WizardType = "gmail" | "whatsapp" | null;

interface IntegrationWizardProps {
    type: WizardType;
    onClose: () => void;
}

export default function IntegrationWizard({ type, onClose }: IntegrationWizardProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    if (!type) return null;

    const handleNext = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(step + 1);
        }, 800);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4"
        >
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${type === 'gmail' ? 'bg-white/10 text-white' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {type === 'gmail' ? <Mail size={20} /> : <MessageSquare size={20} />}
                        </div>
                        <h2 className="font-bold text-lg text-white">
                            {type === 'gmail' ? 'Conectar Gmail' : 'Configurar WhatsApp'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-white">¿Por qué conectar?</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {type === 'gmail'
                                            ? "Alfred podrá leer tus correos para agendar tareas y sincronizar tu calendario automáticamente."
                                            : "Alfred podrá leer y responder tus mensajes de WhatsApp, actuando como un asistente real 24/7."}
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <ShieldCheck size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Compromiso de Privacidad</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                                        Tus datos están cifrados de extremo a extremo. Alfred solo accede a la información estrictamente necesaria para tus gestiones y nunca comparte tus datos con terceros.
                                    </p>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                >
                                    Comenzar Configuración <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white">
                                        {type === 'gmail' ? 'Inicia sesión' : 'Detalles Técnicos'}
                                    </h3>
                                    {type === 'gmail' ? (
                                        <div className="p-6 rounded-3xl border-2 border-white/5 bg-zinc-900/30 text-center space-y-4">
                                            <p className="text-zinc-500 text-xs italic">Se abrirá la ventana oficial de Google Auth</p>
                                            <button className="w-full py-3 bg-zinc-800 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-700 transition-colors">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                                                </svg>
                                                Continuar con Google
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider ml-1">Phone ID</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ej: 105284931..."
                                                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider ml-1">Access Token</label>
                                                <input
                                                    type="password"
                                                    placeholder="EAA..."
                                                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                                                />
                                            </div>
                                            <p className="text-[10px] text-zinc-600 italic px-1">
                                                Obtén estos datos en el panel de Meta for Developers.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={isLoading}
                                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
                                >
                                    {isLoading ? 'Verificando...' : 'Finalizar Conexión'} <Check size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 py-4"
                            >
                                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/5">
                                    <Check size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">¡Conexión Exitosa!</h3>
                                    <p className="text-zinc-500 text-sm px-4">
                                        Alfred ya ha comenzado a sincronizar tu información. Pronto verás los resultados en tu dashboard.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-700 transition-colors"
                                >
                                    Entendido
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}
