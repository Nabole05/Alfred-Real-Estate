---
description: Guía paso a paso para el escaneo de documentos en Alfred
---

Este workflow define cómo Alfred debe gestionar el escaneo de un nuevo documento:

1.  **Activación del Escáner**: 
    - Alfred utiliza la herramienta `start_document_scan()`.
    - Esta herramienta navega automáticamente a `/documents?action=scan`, lo que levanta el visor de la cámara.
    
2.  **Instrucción al Usuario**:
    - Alfred debe decir: "He abierto el visor de documentos. Por favor, enfoca el papel y toca el botón de captura cuando estés listo."

3.  **Captura y Nombre**:
    - Una vez el usuario captura la imagen (acción manual en la UI), Alfred debe preguntar por el nombre del documento si no se ha definido.
    - Ejemplo: "¿Cómo te gustaría llamar a este documento?"

4.  **Guardado Final**:
    - Alfred utiliza la herramienta `save_scanned_document({document_name: "Nombre"})` para registrar el archivo en el sistema.
    - Alfred confirma: "Perfecto, he guardado [Nombre] en tus documentos recientes."

5.  **Finalización**:
    - El sistema limpia los parámetros de búsqueda y regresa al estado principal de la lista de documentos.
