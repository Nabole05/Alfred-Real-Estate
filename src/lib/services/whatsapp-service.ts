/**
 * WhatsApp Service - Antigravity Pillar 1: Modularity
 * Encapsulates all WhatsApp communication logic.
 */

export interface WhatsAppMessage {
    from: string;
    text: string;
    timestamp: Date;
}

export const WhatsAppService = {
    /**
     * Reads pending messages (Simulated for now)
     */
    async getPendingMessages(): Promise<WhatsAppMessage[]> {
        console.log("[Service:WhatsApp] Fetching pending messages...");
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return [
            { from: "Juan Pérez", text: "Hola Alfredo, me interesa ver la propiedad de Recoleta.", timestamp: new Date() },
            { from: "María García", text: "¿Está disponible para mañana?", timestamp: new Date() }
        ];
    },

    /**
     * Sends a message to a specific recipient
     */
    async sendMessage(to: string, message: string): Promise<{ success: boolean }> {
        console.log(`[Service:WhatsApp] Sending message to ${to}: ${message}`);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return { success: true };
    }
};
