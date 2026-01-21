"use client";

import { motion } from "framer-motion";
import { Flame, User, Phone, ArrowLeft, Mail } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";

// Tipos
type LeadStatus = "hot" | "warm" | "cold";
type Lead = {
    id: number;
    name: string;
    email?: string;
    phone: string;
    interest: string;
    status: LeadStatus;
    priority: boolean;
};

// Mock data (reemplazar con API en Sprint 2)
const ALL_LEADS: Lead[] = [
    {
        id: 1,
        name: "María González",
        phone: "+54 11 5555-1234",
        email: "maria@example.com",
        interest: "Departamento 2 amb · Palermo",
        status: "hot",
        priority: true
    },
    {
        id: 2,
        name: "Jorge Martínez",
        phone: "+54 11 5555-5678",
        interest: "Casa · Belgrano",
        status: "warm",
        priority: false
    },
    {
        id: 3,
        name: "Ana Rodríguez",
        phone: "+54 11 5555-9012",
        email: "ana@example.com",
        interest: "Oficina · Microcentro",
        status: "warm",
        priority: false
    },
    {
        id: 4,
        name: "Carlos López",
        phone: "+54 11 5555-3456",
        interest: "Departamento · Recoleta",
        status: "cold",
        priority: false
    }
];

function LeadsPageContent() {
    const searchParams = useSearchParams();
    const statusFilter = searchParams.get("status") || "all";

    // Filtrar leads según parámetro
    const filteredLeads = useMemo(() => {
        if (statusFilter === "all") {
            return ALL_LEADS;
        }
        return ALL_LEADS.filter(lead => lead.status === statusFilter);
    }, [statusFilter]);

    // Título dinámico según filtro
    const pageTitle = {
        hot: "Leads Calientes",
        warm: "Leads Tibios",
        cold: "Leads Fríos",
        all: "Todos los Leads"
    }[statusFilter] || "Leads";

    const hotCount = filteredLeads.filter(l => l.status === "hot").length;

    const getStatusColor = (status: LeadStatus) => {
        switch (status) {
            case "hot":
                return {
                    bg: "bg-orange-500/10",
                    border: "border-orange-500/20",
                    text: "text-orange-400",
                    icon: Flame
                };
            case "warm":
                return {
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-500/20",
                    text: "text-yellow-400",
                    icon: Flame
                };
            case "cold":
                return {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                    text: "text-blue-400",
                    icon: User
                };
        }
    };

    return (
        <div className="min-h-screen px-5 pt-8 pb-32">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-white" />
                        </motion.button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
                        <p className="text-xs text-zinc-500">
                            {filteredLeads.length} leads
                            {hotCount > 0 && statusFilter === "all" && ` · ${hotCount} calientes`}
                        </p>
                    </div>
                </div>

                {/* Leads List */}
                <div className="space-y-3">
                    {filteredLeads.length === 0 ? (
                        <GlassCard className="p-6 text-center">
                            <p className="text-zinc-500 text-sm">
                                No hay leads que mostrar
                            </p>
                        </GlassCard>
                    ) : (
                        filteredLeads.map((lead, index) => {
                            const statusColor = getStatusColor(lead.status);
                            const StatusIcon = statusColor.icon;

                            return (
                                <motion.div
                                    key={lead.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                >
                                    <GlassCard
                                        className={`p-4 ${lead.priority ? "border border-orange-500/30" : ""
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`p-2.5 ${statusColor.bg} border ${statusColor.border} rounded-lg`}
                                            >
                                                <StatusIcon size={18} className={statusColor.text} />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-sm font-semibold text-white">
                                                        {lead.name}
                                                    </p>
                                                    {lead.priority && (
                                                        <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-[9px] uppercase tracking-wider font-bold text-orange-400">
                                                            Urgente
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-xs text-zinc-400 mb-2">
                                                    {lead.interest}
                                                </p>

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-zinc-500">
                                                        <Phone size={12} />
                                                        <span className="text-xs">{lead.phone}</span>
                                                    </div>
                                                    {lead.email && (
                                                        <div className="flex items-center gap-2 text-zinc-500">
                                                            <Mail size={12} />
                                                            <span className="text-xs">{lead.email}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default function LeadsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen px-5 pt-8 pb-32"><div className="max-w-md mx-auto"><p className="text-zinc-500">Cargando...</p></div></div>}>
            <LeadsPageContent />
        </Suspense>
    );
}

/**
 * Summary visible - Para que Alfred pueda narrarlo
 */
export function getVisibleLeadsSummary(statusFilter: string = "all"): {
    title: string;
    totalCount: number;
    hotCount: number;
    items: Array<{ name: string; interest: string; status: string }>;
} {
    const filteredLeads = statusFilter === "all"
        ? ALL_LEADS
        : ALL_LEADS.filter(lead => lead.status === statusFilter);

    const hotLeads = filteredLeads.filter(l => l.status === "hot");

    return {
        title: statusFilter === "hot" ? "Leads Calientes" : statusFilter === "warm" ? "Leads Tibios" : statusFilter === "cold" ? "Leads Fríos" : "Todos los Leads",
        totalCount: filteredLeads.length,
        hotCount: hotLeads.length,
        items: filteredLeads.map(l => ({
            name: l.name,
            interest: l.interest,
            status: l.status
        }))
    };
}
