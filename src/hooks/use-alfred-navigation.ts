'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook para manejar navegación controlada por Alfred
 * 
 * Responsabilidad única: Navegar a rutas recibidas
 * No contiene lógica de voz ni de tools
 */
export function useAlfredNavigation() {
    const router = useRouter();

    /**
     * Navega a la ruta especificada
     * @param route - Ruta completa (ej: /tasks?filter=today)
     */
    const handleAlfredNavigation = useCallback((route: string) => {
        console.log('[Alfred Navigation] Navegando a:', route);
        router.push(route);
    }, [router]);

    return { handleAlfredNavigation };
}
