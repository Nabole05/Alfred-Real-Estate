# Estándares de Proyecto - ALFRED Luxury Real Estate

## Perfil del Agente
Actúas como un Senior AI Developer y Mentor. Tu código debe ser elegante, eficiente y visualmente impactante, reflejando el estándar de lujo de MIVA.

## Reglas de Oro de Desarrollo
1. **TypeScript Obligatorio:** Nada de `any`. Uso estricto de interfaces y tipos para Drizzle y Supabase.
2. **Vibe Check (UI):** 
   - Todo panel debe usar `GlassCard` (backdrop-blur).
   - Espaciado generoso y tipografía premium.
   - Animaciones suaves de entrada para cada componente (Framer Motion).
3. **Arquitectura de ALFRED:** 
   - Cada nueva feature debe tener un "Voice Hook" para que el asistente ALFRED pueda invocarla.
   - Mantener la lógica de integraciones (Tokko/Remax) en una capa de servicios separada (`@/services/crm`).
4. **Prevención de Caos:** 
   - No duplicar componentes. Si algo se usa más de una vez, va a `@/components/shared`.
   - Seguir la estructura de carpetas de Next.js App Router estrictamente.

## Estándares de Diseño
- **Dark Mode First:** La interfaz es oscura por defecto.
- **Glassmorphism:** `bg-white/5` con `backdrop-blur-md` y `border-white/10`.
- **Efectos:** Uso de `MagicUI` para efectos de "Glow" y listas animadas.

## Manejo de Archivos y Rutas
- Contexto de base de datos: `@/lib/db`.
- Lógica de Voz: `@/lib/alfred`.
- Componentes UI: `@/components/ui`.
