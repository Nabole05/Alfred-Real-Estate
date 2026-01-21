# ALFRED Luxury Real Estate OS - Technical Specifications

## Multi-tenant Architecture

ALFRED is designed as a multi-tenant system where each real estate agency (Tenant) has its own isolated data environment.

### Data Isolation (Supabase RLS)
Row Level Security (RLS) is used to ensure data isolation. Every table containing tenant-specific data must include a `tenant_id` column.

- **Tenants Table**: Stores global agency information.
- **Properties Table**: Linked to a tenant. Only accessible by users belonging to that tenant.
- **Leads Table**: Linked to a tenant and optionally to a specific property.

### Database Schema (Drizzle ORM)
The schema is defined using Drizzle ORM in `@/lib/db/schema.ts`.

#### Tables:
1.  **`tenants`**:
    - `id`: UUID (Primary Key)
    - `name`: Name of the agency
    - `slug`: Unique identifier for URL/API access
2.  **`properties`**:
    - `id`: UUID (Primary Key)
    - `tenant_id`: UUID (Foreign Key to `tenants.id`)
    - `title`, `description`, `price`, `currency`, `address`, etc.
3.  **`leads`**:
    - `id`: UUID (Primary Key)
    - `tenant_id`: UUID (Foreign Key to `tenants.id`)
    - `name`, `email`, `phone`, `status`, `source`, `property_id`.

## Voice Integration (ALFRED)
ALFRED acts as the agentic core. Every module must be "Voice-Ready".

### Service Layer: `@/services/alfred-voice.ts`
Interacts with ElevenLabs for high-quality voice synthesis.

### Voice Hooks
Components and services should provide hooks that ALFRED can call via natural language processing.
- Intent mapping for CRUD operations on Properties and Leads.
- Voice-guided tours and reports.
