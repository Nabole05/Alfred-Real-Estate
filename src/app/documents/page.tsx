"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Camera, Search, MoreVertical, Clock, CheckCircle2, X } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const MOCK_DOCUMENTS = [
    { id: 1, name: "Contrato Recoleta - Borrador", type: "PDF", date: "Hace 2 horas", size: "2.4 MB", status: "pending" },
    { id: 2, name: "Escritura Palermo - Final", type: "PDF", date: "Ayer", size: "1.8 MB", status: "completed" },
    { id: 3, name: "Resumen Expensas Belgrano", type: "JPG", date: "15 Ene", size: "4.2 MB", status: "completed" },
];

function DocumentsContent() {
    const [isScanning, setIsScanning] = useState(false);
    const searchParams = useSearchParams();

    // Sync with URL parameter
    useEffect(() => {
        const action = searchParams.get("action");
        if (action === "scan") {
            console.log("[DOCUMENTS] Voice scan trigger detected");
            setIsScanning(true);
        }
    }, [searchParams]);

    return (
        <main className="min-h-screen bg-black text-white pb-32 pt-12 px-6">
            {/* Header Area */}
            <div className="flex flex-col gap-2 mb-8 mt-4">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold tracking-tight text-white focus:outline-none"
                    tabIndex={0}
                >
                    Documentos
                </motion.h1>
                <p className="text-zinc-500 text-sm italic">Alfred, tu gestor documental</p>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 gap-4 mb-8">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsScanning(true)}
                    className="relative overflow-hidden group p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 text-left shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Camera size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-emerald-500">Escanear Nuevo</h3>
                        <p className="text-zinc-500 text-xs">Captura documentos con tu cámara</p>
                    </div>
                </motion.button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
                <input
                    type="text"
                    placeholder="Buscar por nombre o propiedad..."
                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none"
                />
            </div>

            {/* Document List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Recientes</h2>
                </div>

                <div className="space-y-3">
                    {MOCK_DOCUMENTS.map((doc, idx) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-zinc-900/40 backdrop-blur-sm border border-white/[0.05] rounded-[22px] p-4 flex items-center gap-4 active:bg-zinc-800/60 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-white truncate">{doc.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-zinc-500">{doc.date}</span>
                                    <span className="text-[10px] text-zinc-600">•</span>
                                    <span className="text-[10px] text-zinc-500">{doc.size}</span>
                                </div>
                            </div>
                            {doc.status === "completed" ? (
                                <CheckCircle2 className="text-emerald-500/60" size={16} />
                            ) : (
                                <Clock className="text-amber-500/60" size={16} />
                            )}
                            <button className="text-zinc-600 p-1">
                                <MoreVertical size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Camera Overlay */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-[200] bg-black flex flex-col pt-12 pb-20 px-6 overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <button
                                onClick={() => setIsScanning(false)}
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Escáner</h2>
                            <div className="w-10" />
                        </div>

                        <div className="flex-1 rounded-[40px] border-2 border-white/20 bg-zinc-900/50 relative overflow-hidden flex items-center justify-center group">
                            {/* Scanning Animation */}
                            <motion.div
                                animate={{ top: ["10%", "90%", "10%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-x-4 h-[2px] bg-emerald-400 shadow-[0_0_15px_#10b981] z-20"
                            />

                            <div className="text-zinc-500 text-sm italic text-center px-12">
                                <Camera size={40} className="mx-auto mb-4 opacity-20" />
                                <p>Vista de cámara activa...</p>
                                <p className="text-[10px] mt-2 non-italic uppercase tracking-wider">Enfoca el documento</p>
                            </div>
                        </div>

                        <div className="h-40 flex flex-col items-center justify-center gap-4">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    setIsScanning(false);
                                    alert("Documento capturado. Alfred te preguntará el nombre por voz.");
                                }}
                                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent"
                            >
                                <div className="w-16 h-16 rounded-full bg-white" />
                            </motion.button>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Capturar</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default function DocumentsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 italic text-xs">Cargando Alfred Documentos...</div>}>
            <DocumentsContent />
        </Suspense>
    );
}
