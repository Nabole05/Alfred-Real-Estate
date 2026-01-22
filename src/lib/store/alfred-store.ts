import { create } from 'zustand';

export interface AlfredAction {
    title: string;
    description: string;
    icon?: "whatsapp" | "document" | "crm" | "nav";
    toolName?: string;
}

interface AlfredState {
    status: "idle" | "connecting" | "listening" | "responding";
    debugMessage: string | null;
    currentAction: AlfredAction | null;
    lastNavigation: string | null;

    // Actions
    setStatus: (status: "idle" | "connecting" | "listening" | "responding") => void;
    setDebugMessage: (msg: string | null) => void;
    setCurrentAction: (action: AlfredAction | null) => void;
    setLastNavigation: (route: string) => void;
    clearAll: () => void;
}

export const useAlfredStore = create<AlfredState>((set) => ({
    status: "idle",
    debugMessage: null,
    currentAction: null,
    lastNavigation: null,

    setStatus: (status) => set({ status }),
    setDebugMessage: (debugMessage) => set({ debugMessage }),
    setCurrentAction: (currentAction) => set({ currentAction }),
    setLastNavigation: (lastNavigation) => set({ lastNavigation }),
    clearAll: () => set({ status: "idle", debugMessage: null, currentAction: null }),
}));
