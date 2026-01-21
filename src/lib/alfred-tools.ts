/**
 * Alfred Navigation Tools
 * 
 * Define las herramientas (tools) que el asistente puede ejecutar
 * para navegar por la aplicación. Cada tool devuelve solo la ruta.
 */

// Tipos de parámetros para cada tool
export type TasksFilter = "today" | "pending" | "all";
export type AgendaDate = "today" | "tomorrow" | "week";
export type LeadsStatus = "hot" | "warm" | "cold" | "all";

// Tipo de retorno estándar de todas las tools
export type ToolResult = {
    route: string;
};

/**
 * Navega a la sección de tareas
 */
export function navigate_to_tasks(params?: { filter?: TasksFilter }): ToolResult {
    const filter = params?.filter || "all";
    return {
        route: `/tasks?filter=${filter}`
    };
}

/**
 * Navega a la agenda/calendario
 */
export function navigate_to_agenda(params?: { date?: AgendaDate }): ToolResult {
    const date = params?.date || "today";
    return {
        route: `/agenda?date=${date}`
    };
}

/**
 * Navega a la lista de leads
 */
export function navigate_to_leads(params?: { status?: LeadsStatus }): ToolResult {
    const status = params?.status || "all";
    return {
        route: `/leads?status=${status}`
    };
}

/**
 * Navega al catálogo de propiedades
 */
export function navigate_to_properties(): ToolResult {
    return {
        route: "/properties"
    };
}

/**
 * Navega al home/dashboard
 */
export function navigate_to_home(): ToolResult {
    return {
        route: "/"
    };
}

/**
 * Navega al perfil de usuario
 */
export function navigate_to_profile(): ToolResult {
    return {
        route: "/profile"
    };
}

/**
 * Mapa de todas las tools disponibles para fácil ejecución
 */
export const ALFRED_TOOLS = {
    navigate_to_tasks,
    navigate_to_agenda,
    navigate_to_leads,
    navigate_to_properties,
    navigate_to_home,
    navigate_to_profile
} as const;

export type ToolName = keyof typeof ALFRED_TOOLS;
