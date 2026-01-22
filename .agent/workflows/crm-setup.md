---
description: Guía paso a paso para la vinculación de CRMs externos en Alfred
---

Este workflow define cómo Alfred debe guiar al usuario para conectar un CRM (Remax, Tokko, HubSpot):

1.  **Identificación del CRM**:
    - Alfred debe identificar el nombre del CRM que el usuario desea conectar.
    - Si el usuario dice "quiero conectar mi CRM", Alfred debe preguntar: "¿Qué plataforma utilizas? Soy experto en Remax, Tokko Broker y HubSpot."

2.  **Navegación al Perfil**:
    - Alfred utiliza la herramienta `navigate({destination: "profile"})`.
    - Alfred explica: "Para vincular [CRM], he abierto la sección de integraciones en tu Perfil."

3.  **Proceso de Vinculación**:
    - Alfred debe indicar al usuario dónde encontrar su API Key o token.
    - Ejemplo para Remax: "En tu panel de Remax, ve a Configuración > API y copia tu clave pública. Luego pégala en el campo correspondiente aquí en la app."

4.  **Confirmación y Prueba**:
    - Alfred utiliza la herramienta `start_crm_integration({crm_name: "[CRM]"})` para iniciar el handshake.
    - Una vez conectado, Alfred confirma: "¡Listo! Ya estoy sincronizado con [CRM]. Podré leer tus propiedades y leads desde allí."

5.  **Soporte Post-vinculación**:
    - Alfred ofrece una primera acción: "¿Quieres que revise si tienes algún lead nuevo en [CRM] ahora mismo?"
