"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";

// Tipos
type Appointment = {
    id: number;
    title: string;
    time: string;
    address?: string;
    client: string;
    type: string;
    date: "today" | "tomorrow" | "thisWeek";
};

// Mock data (reemplazar con API en Sprint 2)
const ALL_APPOINTMENTS: Appointment[] = [
    {
        id: 1,
        title: "Visita • Palermo",
        time: "16:30",
        address: "Av. Santa Fe 3500",
        client: "María González",
        type: "Visita programada",
        date: "today"
    },
    {
        id: 2,
        title: "Llamada de seguimiento",
        time: "18:00",
        client: "Jorge Martínez",
        type: "Follow up",
        date: "today"
    },
    {
        id: 3,
        title: "Presentación de propuesta",
        time: "10:00",
        address: "Recoleta",
        client: "Ana Rodríguez",
        type: "Reunión",
        date: "tomorrow"
    },
    {
        id: 4,
        title: "Firma de contrato",
        time: "14:00",
        client: "Carlos López",
        type: "Cierre",
        date: "thisWeek"
    }
];

function AgendaPageContent() {
    const searchParams = useSearchParams();
    const dateFilter = searchParams.get("date") || "today";

    // Filtrar citas según parámetro
    const filteredAppointments = useMemo(() => {
        switch (dateFilter) {
            case "today":
                return ALL_APPOINTMENTS.filter(a => a.date === "today");
            case "tomorrow":
                return ALL_APPOINTMENTS.filter(a => a.date === "tomorrow");
            case "week":
                return ALL_APPOINTMENTS; // Mostrar todas
            default:
                return ALL_APPOINTMENTS.filter(a => a.date === "today");
        }
    }, [dateFilter]);

    // Título dinámico según filtro
    const pageTitle = {
        today: "Agenda de Hoy",
        tomorrow: "Agenda de Mañana",
        week: "Agenda de esta Semana"
    }[dateFilter] || "Agenda";

    const subtitle = {
        today: "Citas de hoy",
        tomorrow: "Citas de mañana",
        week: "Próximas citas"
    }[dateFilter] || "Citas programadas";

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
                            {subtitle} · {filteredAppointments.length} citas
                        </p>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-3">
                    {filteredAppointments.length === 0 ? (
                        <GlassCard className="p-6 text-center">
                            <p className="text-zinc-500 text-sm">
                                No hay citas programadas
                            </p>
                        </GlassCard>
                    ) : (
                        filteredAppointments.map((appointment, index) => (
                            <motion.div
                                key={appointment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <GlassCard className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                                <Calendar size={18} className="text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    {appointment.title}
                                                </p>
                                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                                                    {appointment.type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-blue-400">
                                            <Clock size={12} />
                                            <span className="text-xs font-medium">{appointment.time}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pl-11">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <span className="text-xs">Cliente: {appointment.client}</span>
                                        </div>
                                        {appointment.address && (
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <MapPin size={12} />
                                                <span className="text-xs">{appointment.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AgendaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen px-5 pt-8 pb-32"><div className="max-w-md mx-auto"><p className="text-zinc-500">Cargando...</p></div></div>}>
            <AgendaPageContent />
        </Suspense>
    );
}

/**
 * Summary visible - Para que Alfred pueda narrarlo
 */
export function getVisibleAgendaSummary(dateFilter: string = "today"): {
    title: string;
    totalCount: number;
    nextAppointment: { time: string; client: string; location?: string } | null;
    items: string[];
} {
    const filteredAppointments = dateFilter === "today"
        ? ALL_APPOINTMENTS.filter(a => a.date === "today")
        : dateFilter === "tomorrow"
            ? ALL_APPOINTMENTS.filter(a => a.date === "tomorrow")
            : ALL_APPOINTMENTS;

    const next = filteredAppointments[0];

    return {
        title: dateFilter === "today" ? "Agenda de Hoy" : dateFilter === "tomorrow" ? "Agenda de Mañana" : "Agenda de esta Semana",
        totalCount: filteredAppointments.length,
        nextAppointment: next ? {
            time: next.time,
            client: next.client,
            location: next.address
        } : null,
        items: filteredAppointments.map(a => `${a.time} - ${a.title} con ${a.client}`)
    };
}
