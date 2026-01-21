/**
 * Alfred Navigation Tools - Unified Approach
 * 
 * Single navigate function that handles all navigation with parameters
 */

// Tipos válidos
export type Destination = "tasks" | "agenda" | "leads" | "properties" | "profile" | "home";
export type TasksFilter = "today" | "pending" | "all";
export type AgendaDate = "today" | "tomorrow" | "week";
export type LeadsStatus = "hot" | "warm" | "cold" | "all";

export type NavigateParams = {
    destination: Destination;
    filter?: TasksFilter;
    date?: AgendaDate;
    status?: LeadsStatus;
};

export type ToolResult = {
    route: string;
};

/**
 * Función unificada de navegación
 * Maneja todos los destinos con parámetros opcionales
 */
export function navigate(params: NavigateParams): ToolResult {
    const { destination, filter, date, status } = params;

    switch (destination) {
        case "tasks":
            const taskFilter = filter || "all";
            return { route: `/tasks?filter=${taskFilter}` };

        case "agenda":
            const agendaDate = date || "today";
            return { route: `/agenda?date=${agendaDate}` };

        case "leads":
            const leadStatus = status || "all";
            return { route: `/leads?status=${leadStatus}` };

        case "properties":
            return { route: "/properties" };

        case "profile":
            return { route: "/profile" };

        case "home":
            return { route: "/" };

        default:
            // Fallback seguro
            return { route: "/" };
    }
}

/**
 * Export para compatibilidad
 */
export const ALFRED_TOOLS = {
    navigate
} as const;
