"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, FileText, MessageSquare, Link as LinkIcon, Compass, X, AlertCircle } from "lucide-react";
import { Conversation } from "@elevenlabs/client";
import { ALFRED_TOOLS } from "@/lib/alfred-tools";
import { useAlfredNavigation } from "@/hooks/use-alfred-navigation";
import { useAlfredStore } from "@/lib/store/alfred-store";
import { WhatsAppService } from "@/lib/services/whatsapp-service";
import { DocumentService } from "@/lib/services/document-service";
import { CRMService, CRMType } from "@/lib/services/crm-service";

export default function VoiceFAB() {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Global Store
    const {
        status,
        setStatus,
        debugMessage,
        setDebugMessage,
        setLastNavigation,
        currentAction,
        setCurrentAction
    } = useAlfredStore();

    // Hook para manejar navegación
    const { handleAlfredNavigation } = useAlfredNavigation();

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = 0.15;

        return () => {
            if (conversation) {
                conversation.endSession();
            }
        };
    }, [conversation]);

    const playSubtleFeedback = () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };

    const startConversation = async () => {
        try {
            const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_7301kfcf2akyfq0t3mz0bqf2n0hd";

            if (!agentId) {
                setDebugMessage("Error: Agent ID no encontrado");
                return;
            }

            setStatus("connecting");
            setDebugMessage("Iniciando micrófono y conexión...");

            const clientTools: Record<string, any> = {
                navigate: async (params: any) => {
                    console.log("[ALFRED] Navigate tool invoked:", params);
                    setCurrentAction({
                        title: "Navegando",
                        description: `Abriendo sección: ${params.destination}`,
                        icon: "nav"
                    });
                    const result = ALFRED_TOOLS.navigate(params);
                    handleAlfredNavigation(result.route);
                    setLastNavigation(result.route);
                    setTimeout(() => setCurrentAction(null), 3000);
                    return { success: true, route: result.route };
                },

                // WhatsApp Tools (Powered by WhatsAppService)
                read_whatsapp_messages: async () => {
                    setCurrentAction({
                        title: "Leyendo WhatsApp",
                        description: "Buscando mensajes nuevos...",
                        icon: "whatsapp"
                    });
                    const messages = await WhatsAppService.getPendingMessages();
                    setTimeout(() => setCurrentAction(null), 4000);
                    return { success: true, messages };
                },
                send_whatsapp_message: async (params: { to: string, message: string }) => {
                    setCurrentAction({
                        title: "Enviando Mensaje",
                        description: `Destino: ${params.to}`,
                        icon: "whatsapp"
                    });
                    await WhatsAppService.sendMessage(params.to, params.message);
                    setCurrentAction({
                        title: "¡Mensaje Enviado!",
                        description: `Se notificó a ${params.to}`,
                        icon: "whatsapp"
                    });
                    setTimeout(() => setCurrentAction(null), 3000);
                    return { success: true };
                },

                // CRM Tools (Powered by CRMService)
                start_crm_integration: async (params: any) => {
                    const crm = params.crm_name as CRMType || "Remax";
                    setCurrentAction({
                        title: "Conexión CRM",
                        description: `Vinculando con ${crm}...`,
                        icon: "crm"
                    });
                    handleAlfredNavigation("/profile");
                    await CRMService.connect(crm);
                    setTimeout(() => setCurrentAction(null), 4000);
                    return { success: true, crm: crm };
                },

                // Document Tools (Powered by DocumentService)
                start_document_scan: async () => {
                    setCurrentAction({
                        title: "Iniciando Escáner",
                        description: "Preparando cámara...",
                        icon: "document"
                    });
                    await DocumentService.startScan();
                    handleAlfredNavigation("/documents?action=scan");
                    setTimeout(() => setCurrentAction(null), 4000);
                    return { success: true };
                },
                save_scanned_document: async (params: any) => {
                    const name = params.document_name;
                    setCurrentAction({
                        title: "Guardando Documento",
                        description: `Archivo: ${name}`,
                        icon: "document"
                    });
                    await DocumentService.saveDocument(name);
                    setCurrentAction({
                        title: "¡Documento Guardado!",
                        description: `${name} ya está en tu nube.`,
                        icon: "document"
                    });
                    setTimeout(() => setCurrentAction(null), 3000);
                    return { success: true, name: name };
                },

                // Utility Tools
                get_summary_data: async (params: any) => {
                    setDebugMessage("Obteniendo resumen...");
                    setTimeout(() => setDebugMessage(null), 2000);
                    return {
                        success: true,
                        leads: { total: 4, hot: 1, top: "María González" },
                        tasks: { total: 3, urgent: 2, top: "Enviar contrato Recoleta" },
                        overview: "Tienes 1 lead caliente y 2 tareas urgentes para hoy."
                    };
                }
            };

            const conv = await Conversation.startSession({
                agentId: agentId,
                connectionType: "webrtc",
                clientTools: clientTools,
                onConnect: () => {
                    setDebugMessage("¡Conectado! Ya puedes hablar.");
                    setStatus("listening");
                    setTimeout(() => setDebugMessage(null), 2500);
                },
                onDisconnect: () => {
                    setDebugMessage("Sesión finalizada");
                    setStatus("idle");
                    setTimeout(() => setDebugMessage(null), 2000);
                },
                onError: (error) => {
                    console.error("ALFRED error:", error);
                    setDebugMessage(`ALFRED Error: ${(error as any).message || "Error"}`);
                    setStatus("idle");
                },
                onModeChange: (mode) => {
                    if (mode.mode === "speaking") {
                        setStatus("responding");
                        playSubtleFeedback();
                    } else {
                        setStatus("listening");
                    }
                },
            });

            setConversation(conv);
        } catch (error) {
            console.error("Error starting conversation:", error);
            setStatus("idle");
        }
    };

    const stopConversation = async () => {
        if (conversation) {
            await conversation.endSession();
            setConversation(null);
            setStatus("idle");
        }
    };

    const handleClick = () => {
        if (status === "idle") {
            startConversation();
        } else {
            stopConversation();
        }
    };

    return (
        <>
            {/* FAB Container - Fixed at bottom center */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                className="fixed bottom-36 left-1/2 transform -translate-x-1/2 z-[100]"
            >
                <div className="relative">
                    {/* Idle State: Subtle breathing glow */}
                    <AnimatePresence>
                        {status === "idle" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0.4, 0.7, 0.4],
                                    scale: [1, 1.2, 1],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-white/30 rounded-full blur-2xl"
                            />
                        )}
                    </AnimatePresence>

                    {/* Listening State: Reactive circular waves */}
                    <AnimatePresence>
                        {status === "listening" && (
                            <>
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 1, opacity: 0.8 }}
                                        animate={{
                                            scale: [1, 2.2, 2.8],
                                            opacity: [0.7, 0.4, 0],
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.4,
                                            ease: "easeOut",
                                        }}
                                        className="absolute inset-0 border-2 border-white rounded-full"
                                    />
                                ))}
                            </>
                        )}
                    </AnimatePresence>

                    {/* Responding State: Controlled rhythmic pulse */}
                    <AnimatePresence>
                        {status === "responding" && (
                            <>
                                <motion.div
                                    initial={{ scale: 1, opacity: 0.8 }}
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.8, 0.4, 0.8],
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 bg-emerald-400/40 rounded-full blur-2xl"
                                />
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{
                                        scale: [1, 1.15, 1],
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 border-2 border-emerald-400/60 rounded-full"
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* Connecting State: Spinning loader */}
                    <AnimatePresence>
                        {status === "connecting" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ rotate: 360, opacity: 0.7 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                                    opacity: { duration: 0.3 },
                                }}
                                className="absolute inset-0 border-3 border-t-white border-r-white/60 border-b-white/20 border-l-white/60 rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Main FAB Button - LIQUID GLASS EFFECT */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClick}
                        className={`
                            relative w-[94px] h-[94px] rounded-full
                            flex items-center justify-center
                            transition-all duration-300
                            shadow-[0_10px_50px_rgba(0,0,0,0.6),_0_0_0_1px_rgba(255,255,255,0.15)_inset]
                            ${status === "idle"
                                ? "bg-white/8 backdrop-blur-3xl border-2 border-white/25"
                                : status === "listening"
                                    ? "bg-white/95 backdrop-blur-xl text-black border-2 border-white/50"
                                    : status === "responding"
                                        ? "bg-emerald-400/95 backdrop-blur-xl text-black border-2 border-emerald-300/50"
                                        : "bg-white/10 backdrop-blur-3xl border-2 border-white/25"
                            }
                        `}
                        style={{
                            background: status === "idle"
                                ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)"
                                : status === "listening"
                                    ? "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)"
                                    : status === "responding"
                                        ? "linear-gradient(135deg, rgba(52,211,153,0.98) 0%, rgba(16,185,129,0.95) 100%)"
                                        : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.06) 100%)",
                            backdropFilter: status === "idle" ? "blur(40px) saturate(180%)" : undefined
                        }}
                    >
                        {/* Glass reflection effect - Enhanced */}
                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/5 to-transparent" />
                        </div>

                        <motion.div
                            animate={
                                status === "listening"
                                    ? { scale: [1, 1.15, 1] }
                                    : status === "responding"
                                        ? { scale: [1, 1.05, 1] }
                                        : {}
                            }
                            transition={{
                                duration: status === "listening" ? 0.6 : 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative z-10"
                        >
                            <Mic
                                size={38}
                                strokeWidth={status === "idle" ? 1.5 : 2}
                                className={status === "idle" ? "text-white drop-shadow-lg" : "drop-shadow-md"}
                            />
                        </motion.div>
                    </motion.button>
                </div>
            </motion.div>

            {/* Action Preview Card - Antigravity Pillar 4: Reliability */}
            <AnimatePresence>
                {currentAction && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-64 left-1/2 transform -translate-x-1/2 z-[200] w-[280px]"
                    >
                        <div className="bg-zinc-950/80 backdrop-blur-3xl border border-white/20 rounded-3xl p-5 shadow-2xl overflow-hidden relative group">
                            {/* Animated Background Pulse */}
                            <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />

                            <div className="relative flex flex-col items-center text-center space-y-3">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-emerald-400">
                                    {currentAction.icon === "whatsapp" && <MessageSquare size={24} />}
                                    {currentAction.icon === "document" && <FileText size={24} />}
                                    {currentAction.icon === "crm" && <LinkIcon size={24} />}
                                    {currentAction.icon === "nav" && <Compass size={24} />}
                                    {!currentAction.icon && <AlertCircle size={24} />}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{currentAction.title}</h3>
                                    <p className="text-xs text-zinc-500 line-clamp-2 px-2">{currentAction.description}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Optional: Status label that appears near FAB */}
            <AnimatePresence>
                {status !== "idle" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-[calc(9rem+120px)] left-1/2 transform -translate-x-1/2 z-[90]"
                    >
                        <div className="bg-black/90 backdrop-blur-2xl border border-white/20 rounded-full px-5 py-2.5 shadow-lg">
                            <motion.p
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-xs font-medium text-white tracking-wide"
                            >
                                {status === "connecting" && "Conectando..."}
                                {status === "listening" && "Te estoy escuchando"}
                                {status === "responding" && "Alfred hablando..."}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Debug Message Toast */}
            <AnimatePresence>
                {debugMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[200]"
                    >
                        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
                            <p className="text-sm font-semibold text-white tracking-tight flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {debugMessage}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
