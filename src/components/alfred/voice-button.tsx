"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Conversation } from "@elevenlabs/client";

export default function AlfredVoiceButton() {
    const [isListening, setIsListening] = useState(false);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [status, setStatus] = useState<"idle" | "connecting" | "listening" | "speaking">("idle");

    useEffect(() => {
        return () => {
            if (conversation) {
                conversation.endSession();
            }
        };
    }, [conversation]);

    const startConversation = async () => {
        try {
            const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

            if (!agentId) {
                console.error("Agent ID no configurado");
                return;
            }

            setStatus("connecting");

            const conv = await Conversation.startSession({
                agentId: agentId,
                connectionType: "webrtc",
                onConnect: () => {
                    setStatus("listening");
                    setIsListening(true);
                },
                onDisconnect: () => {
                    setStatus("idle");
                    setIsListening(false);
                },
                onError: (error) => {
                    console.error("ALFRED error:", error);
                    setStatus("idle");
                    setIsListening(false);
                },
                onModeChange: (mode) => {
                    setStatus(mode.mode === "speaking" ? "speaking" : "listening");
                },
            });

            setConversation(conv);
        } catch (error) {
            console.error("Error starting conversation:", error);
            setStatus("idle");
            setIsListening(false);
        }
    };

    const stopConversation = async () => {
        if (conversation) {
            await conversation.endSession();
            setConversation(null);
            setIsListening(false);
            setStatus("idle");
        }
    };

    const handleClick = () => {
        if (isListening) {
            stopConversation();
        } else {
            startConversation();
        }
    };

    const getStatusText = () => {
        switch (status) {
            case "connecting":
                return "Conectando...";
            case "listening":
                return "Escuchando...";
            case "speaking":
                return "ALFRED hablando...";
            default:
                return "Hablar con Alfred";
        }
    };

    const getIcon = () => {
        if (status === "connecting") {
            return <Loader2 size={32} className="animate-spin" />;
        }
        return isListening ? <Mic size={32} /> : <MicOff size={32} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
        >
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                className={`
          relative w-full py-6 px-8 rounded-2xl
          overflow-hidden cursor-pointer
          transition-all duration-300
          ${isListening
                        ? "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        : "bg-white/5 text-white hover:bg-white/10 backdrop-blur-xl border border-white/10"
                    }
        `}
            >
                {/* Animated background for active state */}
                <AnimatePresence>
                    {isListening && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                            className="absolute inset-0 bg-white/30 rounded-full"
                        />
                    )}
                </AnimatePresence>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center gap-4">
                    {/* Icon */}
                    <motion.div
                        animate={
                            status === "listening"
                                ? {
                                    scale: [1, 1.1, 1],
                                }
                                : {}
                        }
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    >
                        {getIcon()}
                    </motion.div>

                    {/* Text */}
                    <div className="flex flex-col items-start">
                        <span
                            className={`text-sm font-bold tracking-wide ${isListening ? "text-black" : "text-white"
                                }`}
                        >
                            {getStatusText()}
                        </span>
                        {status === "idle" && (
                            <span className="text-[10px] text-zinc-500 tracking-wider uppercase mt-0.5">
                                Presiona para iniciar
                            </span>
                        )}
                        {status === "listening" && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[10px] text-zinc-700 tracking-wider uppercase mt-0.5"
                            >
                                Te estoy escuchando
                            </motion.span>
                        )}
                    </div>
                </div>
            </motion.button>

            {/* Helper text */}
            {status === "idle" && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-zinc-600 text-xs mt-3"
                >
                    Pregúntame sobre leads, propiedades o análisis de mercado
                </motion.p>
            )}
        </motion.div>
    );
}
