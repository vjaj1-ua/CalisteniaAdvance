# Arquitectura inicial

## Decision

La base del MVP se separa en cuatro areas:

- `frontend/`: experiencia web en Next.js.
- `backend/`: API REST con FastAPI.
- `ai/`: futura logica de MediaPipe y reglas biomecanicas.
- `docs/`: decisiones tecnicas y documentacion del proyecto.

## Motivo

Esta separacion evita mezclar interfaz, rutas API y analisis tecnico. Tambien permite evolucionar el MVP por partes: primero flexiones, despues autenticacion, almacenamiento, historial y mas ejercicios.

## Fuera de alcance por ahora

- Autenticacion.
- Supabase.
- MediaPipe.
- Persistencia de historiales.
