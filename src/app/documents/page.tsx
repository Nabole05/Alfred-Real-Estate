"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Camera, Search, MoreVertical, Clock, CheckCircle2, X } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const MOCK_DOCUMENTS = [
    { id: 1, name: "Contrato Recoleta - Borrador", type: "PDF", date: "Hace 2 horas", size: "2.4 MB", status: "pending" },
    { id: 2, name: "Escritura Palermo - Final", type: "PDF", date: "Ayer", size: "1.8 MB", status: "completed" },
    { id: 3, name: "Resumen Expensas Belgrano", type: "JPG", date: "15 Ene", size: "4.2 MB", status: "completed" },
];

function DocumentsContent() {
    const [isScanning, setIsScanning] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Sincronización agresiva con el parámetro de la URL
    useEffect(() => {
        const checkParam = () => {
            const queryAction = new URLSearchParams(window.location.search).get("action");
            if (queryAction === "scan") {
                console.log("[ALFRED] Escáner activado vía URL directa");
                setIsScanning(true);
            }
        };

        // Check immediately
        checkParam();

        // Failsafe for mobile Safari
        const timer = setTimeout(checkParam, 500);
        return () => clearTimeout(timer);
    }, [searchParams]);

    const handleCloseScanner = () => {
        setIsScanning(false);
        // Limpiar URL sin recargar
        router.push('/documents', { scroll: false });
    };

    return (
        <div className="min-h-screen bg-black text-white pb-40 pt-12 px-6">
            {/* Header */}
            <header className="mb-8 mt-4">
                <h1 className="text-4xl font-bold tracking-tight">Documentos</h1>
                <p className="text-zinc-500 text-sm italic mt-1">Gestión documental inteligente</p>
            </header>

            {/* Quick Scan Action */}
            <button
                onClick={() => setIsScanning(true)}
                className="w-full mb-8 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
            >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Camera size={24} />
                </div>
                <div>
                    <h3 className="font-semibold text-emerald-500 text-lg">Escanear Documento</h3>
                    <p className="text-zinc-500 text-xs">Usa la cámara para capturar archivos</p>
                </div>
            </button>

            {/* Document List */}
            <div className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 px-2">Recientes</h2>
                <div className="space-y-3">
                    {MOCK_DOCUMENTS.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-zinc-900/40 border border-white/[0.05] rounded-[22px] p-4 flex items-center gap-4 active:bg-zinc-800/60 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-white truncate">{doc.name}</h4>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500 font-mono uppercase">
                                    <span>{doc.date}</span>
                                    <span>•</span>
                                    <span>{doc.size}</span>
                                </div>
                            </div>
                            {doc.status === "completed" ? (
                                <CheckCircle2 className="text-emerald-500/60" size={16} />
                            ) : (
                                <Clock className="text-amber-500/60" size={16} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Camera Overlay */}
            <AnimatePresence mode="wait">
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed inset-0 z-[500] bg-black flex flex-col pt-12 pb-20 px-6 touch-none"
                    >
                        <header className="flex items-center justify-between mb-8">
                            <button onClick={handleCloseScanner} className="p-3 -m-3 text-white active:opacity-50">
                                <X size={24} />
                            </button>
                            <h2 className="text-sm font-bold uppercase tracking-widest">Escáner Alfred</h2>
                            <div className="w-6" />
                        </header>

                        <div className="flex-1 rounded-[40px] border-2 border-white/20 bg-zinc-900/50 relative overflow-hidden flex items-center justify-center border-dashed">
                            <motion.div
                                animate={{ top: ["5%", "95%", "5%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-8 h-0.5 bg-emerald-400 shadow-[0_0_20px_#10b981] z-20"
                            />
                            <div className="text-center opacity-40">
                                <Camera size={48} className="mx-auto mb-4" />
                                <p className="text-xs uppercase tracking-tighter">Buscando documentos...</p>
                            </div>
                        </div>

                        <div className="h-40 flex flex-col items-center justify-center gap-6">
                            <button
                                onClick={() => {
                                    alert("¡Captura exitosa!");
                                    handleCloseScanner();
                                }}
                                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent active:scale-90 transition-transform p-1"
                            >
                                <div className="w-full h-full rounded-full bg-white" />
                            </button>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Capturar</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function DocumentsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <DocumentsContent />
        </Suspense>
    );
}
