# CalisteniaAdvance - Instrucciones para agentes de codificación

CalisteniaAdvance es una aplicación web MVP para analizar la técnica de ejercicios de calistenia mediante visión artificial.

El objetivo inicial es permitir que un usuario suba un vídeo haciendo flexiones, analizar sus puntos corporales y devolver errores técnicos, recomendaciones y una puntuación básica.

## Stack tecnológico

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Diseño responsive mobile-first

Backend:
- FastAPI
- Python
- Pydantic
- API REST

IA / Visión artificial:
- MediaPipe Pose Landmarker
- Análisis inicial basado en reglas biomecánicas

Base de datos y almacenamiento:
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage

## Principios del proyecto

- Construir primero un MVP simple y ampliable.
- Priorizar código limpio, modular y fácil de entender.
- Separar frontend, backend y lógica de análisis IA.
- No mezclar reglas biomecánicas directamente dentro de rutas API.
- El primer ejercicio soportado será flexiones.
- Toda la interfaz debe ser responsive.
- Evitar dependencias innecesarias.
- Documentar decisiones importantes en `/docs`.

## Objetivo del primer MVP

El usuario debe poder:
1. Registrarse o iniciar sesión.
2. Subir un vídeo haciendo flexiones.
3. Analizar el vídeo con MediaPipe.
4. Detectar errores básicos de técnica.
5. Recibir una puntuación y recomendaciones.
6. Consultar su historial de análisis.

## Estructura deseada

```text
CalisteniaAdvance/
├── frontend/
├── backend/
├── ai/
├── docs/
├── docker-compose.yml
├── README.md
└── AGENTS.md