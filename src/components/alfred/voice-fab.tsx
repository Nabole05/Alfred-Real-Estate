"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";
import { Conversation } from "@elevenlabs/client";
import { ALFRED_TOOLS } from "@/lib/alfred-tools";
import { useAlfredNavigation } from "@/hooks/use-alfred-navigation";

type VoiceStatus = "idle" | "connecting" | "listening" | "responding";

export default function VoiceFAB() {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [status, setStatus] = useState<VoiceStatus>("idle");
    const [debugMessage, setDebugMessage] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Hook para manejar navegación
    const { handleAlfredNavigation } = useAlfredNavigation();

    useEffect(() => {
        // Initialize subtle audio feedback (very subtle, non-intrusive)
        audioRef.current = new Audio();
        audioRef.current.volume = 0.15; // Very subtle volume

        return () => {
            if (conversation) {
                conversation.endSession();
            }
        };
    }, [conversation]);

    const playSubtleFeedback = () => {
        // Create a very subtle beep using Web Audio API
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800; // Soft, high-pitched tone
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Very quiet
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };

    const startConversation = async () => {
        try {
            // Fallback directo por si las variables de Vercel fallan
            const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_7301kfcf2akyfq0t3mz0bqf2n0hd";

            if (!agentId) {
                setDebugMessage("Error: Agent ID no encontrado");
                return;
            }

            setStatus("connecting");
            setDebugMessage("Conectando con Alfred...");

            // Client Tools: Compatibilidad total con nombres específicos y unificados
            const clientTools: Record<string, any> = {
                // Tool unificada (Recomendada)
                navigate: {
                    description: "Navega dentro de la app Alfred a diferentes secciones. Recibe destination (tasks/agenda/leads/properties/profile/home) y parámetros opcionales según el destino.",
                    parameters: {
                        type: "object",
                        properties: {
                            destination: {
                                type: "string",
                                enum: ["tasks", "agenda", "leads", "properties", "profile", "home"],
                                description: "Destino de navegación"
                            },
                            filter: {
                                type: "string",
                                enum: ["today", "pending", "all"],
                                description: "Filtro para tasks (opcional)"
                            },
                            date: {
                                type: "string",
                                enum: ["today", "tomorrow", "week"],
                                description: "Rango de fecha para agenda (opcional)"
                            },
                            status: {
                                type: "string",
                                enum: ["hot", "warm", "cold", "all"],
                                description: "Estado para leads (opcional)"
                            }
                        },
                        required: ["destination"]
                    },
                    handler: async (params: any) => {
                        console.log("[ALFRED] Navigate tool invoked with:", params);
                        setDebugMessage(`Navigating to: ${params.destination}...`);
                        const result = ALFRED_TOOLS.navigate(params);
                        handleAlfredNavigation(result.route);

                        setTimeout(() => setDebugMessage(null), 3000);
                        return { success: true, route: result.route };
                    }
                },

                // Aliases para compatibilidad con prompt viejo
                navigate_to_tasks: {
                    description: "Navega a la sección de tareas. Filtros: today, pending, all.",
                    parameters: {
                        type: "object",
                        properties: {
                            filter: { type: "string", enum: ["today", "pending", "all"] }
                        }
                    },
                    handler: async (params: any) => {
                        setDebugMessage(`Navigating to tasks...`);
                        const result = ALFRED_TOOLS.navigate({ destination: "tasks", ...params });
                        handleAlfredNavigation(result.route);
                        setTimeout(() => setDebugMessage(null), 3000);
                        return { success: true, route: result.route };
                    }
                },
                navigate_to_leads: {
                    description: "Navega a la sección de leads. Filtros: hot, warm, cold, all.",
                    parameters: {
                        type: "object",
                        properties: {
                            status: { type: "string", enum: ["hot", "warm", "cold", "all"] }
                        }
                    },
                    handler: async (params: any) => {
                        setDebugMessage(`Navigating to leads...`);
                        const result = ALFRED_TOOLS.navigate({ destination: "leads", ...params });
                        handleAlfredNavigation(result.route);
                        setTimeout(() => setDebugMessage(null), 3000);
                        return { success: true, route: result.route };
                    }
                },
                navigate_to_agenda: {
                    description: "Navega a la agenda.",
                    parameters: {
                        type: "object",
                        properties: {
                            date: { type: "string", enum: ["today", "tomorrow", "week"] }
                        }
                    },
                    handler: async (params: any) => {
                        setDebugMessage(`Navigating to agenda...`);
                        const result = ALFRED_TOOLS.navigate({ destination: "agenda", ...params });
                        handleAlfredNavigation(result.route);
                        setTimeout(() => setDebugMessage(null), 3000);
                        return { success: true, route: result.route };
                    }
                },
                navigate_to_home: {
                    description: "Vuelve al inicio.",
                    handler: async () => {
                        setDebugMessage(`Navigating home...`);
                        handleAlfredNavigation("/");
                        setTimeout(() => setDebugMessage(null), 3000);
                        return { success: true, route: "/" };
                    }
                },

                // Nueva Tool: Datos para narración
                get_summary_data: {
                    description: "Obtiene métricas reales de tareas y leads para narrar al usuario.",
                    parameters: {
                        type: "object",
                        properties: {
                            metric: { type: "string", enum: ["all", "leads", "tasks"] }
                        }
                    },
                    handler: async (params: any) => {
                        console.log("[ALFRED] get_summary_data invoked", params);
                        setDebugMessage(`Fetching summary data...`);
                        setTimeout(() => setDebugMessage(null), 2000);
                        return {
                            success: true,
                            data: {
                                leads: { total: 4, hot: 1, top: "María González" },
                                tasks: { total: 3, urgent: 2, top: "Enviar contrato Recoleta" },
                                overview: "Tienes 1 lead caliente y 2 tareas urgentes para hoy."
                            }
                        };
                    }
                }
            };

            const conv = await Conversation.startSession({
                agentId: agentId,
                connectionType: "webrtc",
                clientTools: clientTools,
                onConnect: () => {
                    console.log("[VoiceFAB] Conversación conectada con tools");
                    setStatus("listening");
                },
                onDisconnect: () => {
                    setStatus("idle");
                },
                onError: (error) => {
                    console.error("ALFRED error:", error);
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
