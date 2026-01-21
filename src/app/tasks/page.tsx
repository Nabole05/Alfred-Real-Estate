"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowLeft, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

// Tipos
type TaskPriority = "high" | "medium" | "low";
type Task = {
    id: number;
    title: string;
    priority: TaskPriority;
    completed: boolean;
    dueDate?: string;
};

// Mock data (reemplazar con API en Sprint 2)
const ALL_TASKS: Task[] = [
    {
        id: 1,
        title: "Enviar contrato • Depto Recoleta",
        priority: "high",
        completed: false,
        dueDate: "today"
    },
    {
        id: 2,
        title: "Actualizar precios en portfolio",
        priority: "high",
        completed: false,
        dueDate: "today"
    },
    {
        id: 3,
        title: "Responder consultas pendientes",
        priority: "medium",
        completed: false,
        dueDate: "today"
    },
    {
        id: 4,
        title: "Programar visita · Cliente nuevo",
        priority: "medium",
        completed: true,
        dueDate: "yesterday"
    },
    {
        id: 5,
        title: "Revisar documentación legal",
        priority: "medium",
        completed: false,
        dueDate: "tomorrow"
    },
];

export default function TasksPage() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter") || "all";

    // Filtrar tareas según parámetro
    const filteredTasks = useMemo(() => {
        switch (filter) {
            case "today":
                return ALL_TASKS.filter(t => t.dueDate === "today");
            case "pending":
                return ALL_TASKS.filter(t => !t.completed);
            case "all":
            default:
                return ALL_TASKS;
        }
    }, [filter]);

    const highPriorityCount = filteredTasks.filter(
        (t) => t.priority === "high" && !t.completed
    ).length;

    // Título dinámico según filtro
    const pageTitle = {
        today: "Tareas de Hoy",
        pending: "Tareas Pendientes",
        all: "Todas las Tareas"
    }[filter] || "Tareas";

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
                            {filteredTasks.length} tareas
                            {highPriorityCount > 0 && ` · ${highPriorityCount} urgentes`}
                        </p>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                    {filteredTasks.length === 0 ? (
                        <GlassCard className="p-6 text-center">
                            <p className="text-zinc-500 text-sm">
                                No hay tareas que mostrar
                            </p>
                        </GlassCard>
                    ) : (
                        filteredTasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <GlassCard
                                    className={`p-4 ${task.priority === "high" && !task.completed
                                            ? "border border-orange-500/30"
                                            : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg ${task.completed
                                                    ? "bg-emerald-500/10 border border-emerald-500/20"
                                                    : "bg-white/5 border border-white/10"
                                                }`}
                                        >
                                            {task.completed ? (
                                                <CheckCircle2 size={18} className="text-emerald-400" />
                                            ) : (
                                                <Circle size={18} className="text-zinc-500" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <p
                                                className={`text-sm font-medium ${task.completed
                                                        ? "text-zinc-500 line-through"
                                                        : "text-white"
                                                    }`}
                                            >
                                                {task.title}
                                            </p>
                                        </div>

                                        {task.priority === "high" && !task.completed && (
                                            <div className="flex items-center gap-1 text-orange-400">
                                                <AlertCircle size={14} />
                                                <span className="text-[10px] uppercase tracking-wider font-bold">
                                                    Urgente
                                                </span>
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

/**
 * Summary visible - Para que Alfred pueda narrarlo
 * Este objeto DEBE reflejar exactamente lo que se ve en pantalla
 */
export function getVisibleTasksSummary(filter: string = "all"): {
    title: string;
    totalCount: number;
    urgentCount: number;
    items: string[];
} {
    const filteredTasks = filter === "today"
        ? ALL_TASKS.filter(t => t.dueDate === "today")
        : filter === "pending"
            ? ALL_TASKS.filter(t => !t.completed)
            : ALL_TASKS;

    const urgentTasks = filteredTasks.filter(t => t.priority === "high" && !t.completed);

    return {
        title: filter === "today" ? "Tareas de Hoy" : filter === "pending" ? "Tareas Pendientes" : "Todas las Tareas",
        totalCount: filteredTasks.length,
        urgentCount: urgentTasks.length,
        items: filteredTasks.map(t => t.title)
    };
}
