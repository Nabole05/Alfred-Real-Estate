"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Conversation } from "@elevenlabs/client";

export default function AlfredVoiceWidget() {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [status, setStatus] = useState<string>("Click para hablar");

  useEffect(() => {
    // Clean up conversation on unmount
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
        setStatus("Error: Agent ID no configurado");
        return;
      }

      setStatus("Conectando...");

      const conv = await Conversation.startSession({
        agentId: agentId,
        connectionType: "webrtc",
        onConnect: () => {
          setStatus("Escuchando...");
          setIsListening(true);
        },
        onDisconnect: () => {
          setStatus("Desconectado");
          setIsListening(false);
        },
        onError: (error) => {
          console.error("ALFRED error:", error);
          setStatus("Error de conexión");
          setIsListening(false);
        },
        onModeChange: (mode) => {
          setStatus(mode.mode === "speaking" ? "ALFRED hablando..." : "Escuchando...");
        }
      });

      setConversation(conv);
    } catch (error) {
      console.error("Error starting conversation:", error);
      setStatus("Error al iniciar");
      setIsListening(false);
    }
  };

  const stopConversation = async () => {
    if (conversation) {
      await conversation.endSession();
      setConversation(null);
      setIsListening(false);
      setStatus("Click para hablar");
    }
  };

  const handleClick = () => {
    if (isListening) {
      stopConversation();
    } else {
      startConversation();
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="cursor-pointer"
      >
        <GlassCard className="p-4 flex items-center justify-center relative min-w-[180px]">
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-white/20 rounded-full"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex items-center gap-3">
            <div className={`p-2 rounded-full transition-colors ${isListening ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"}`}>
              {isListening ? <Mic size={18} /> : <MicOff size={18} />}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Alfred</span>
              <span className="text-xs font-medium text-zinc-200">
                {status}
              </span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
