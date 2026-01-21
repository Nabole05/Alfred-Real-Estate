import { NextRequest, NextResponse } from 'next/server';

/**
 * ElevenLabs Tool Webhook Endpoint
 * 
 * Recibe comandos de navegación desde ElevenLabs y devuelve rutas
 * Método: GET con query params
 */

// Tipos válidos de destinos
type Destination = 'tasks' | 'agenda' | 'leads' | 'properties' | 'home';

// Destinos válidos
const VALID_DESTINATIONS: Destination[] = ['tasks', 'agenda', 'leads', 'properties', 'home'];

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Extraer query params
        const destination = searchParams.get('destination');
        const filter = searchParams.get('filter');
        const date = searchParams.get('date');
        const status = searchParams.get('status');

        // Validar destination requerido
        if (!destination) {
            return NextResponse.json(
                { error: 'Missing required query param: destination' },
                { status: 400 }
            );
        }

        // Validar destination válido
        if (!VALID_DESTINATIONS.includes(destination as Destination)) {
            return NextResponse.json(
                {
                    error: `Invalid destination: ${destination}`,
                    validDestinations: VALID_DESTINATIONS
                },
                { status: 400 }
            );
        }

        // Construir ruta según destination
        let route: string;

        switch (destination) {
            case 'tasks':
                route = filter ? `/tasks?filter=${filter}` : '/tasks';
                break;

            case 'agenda':
                route = date ? `/agenda?date=${date}` : '/agenda';
                break;

            case 'leads':
                route = status ? `/leads?status=${status}` : '/leads';
                break;

            case 'properties':
                route = '/properties';
                break;

            case 'home':
                route = '/';
                break;

            default:
                return NextResponse.json(
                    { error: `Unhandled destination: ${destination}` },
                    { status: 400 }
                );
        }

        // Devolver ruta exitosamente
        return NextResponse.json(
            {
                route,
                destination,
                params: { filter, date, status }
            },
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );

    } catch (error) {
        console.error('[Alfred Tools API] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
