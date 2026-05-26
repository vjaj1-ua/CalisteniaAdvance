# CalisteniaAdvance

CalisteniaAdvance es una aplicacion web MVP para analizar la tecnica de ejercicios de calistenia mediante vision artificial.

El primer objetivo del proyecto es permitir que una persona suba un video haciendo flexiones, analizar su tecnica y recibir errores basicos, recomendaciones y una puntuacion inicial.

## Estructura

```text
CalisteniaAdvance/
|-- frontend/   # App Next.js con TypeScript y Tailwind CSS
|-- backend/    # API FastAPI
|-- ai/         # Logica futura de analisis con MediaPipe
|-- docs/       # Decisiones y documentacion tecnica
|-- README.md
`-- AGENTS.md
```

## Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicacion estara disponible en `http://localhost:3000`.

Para tirar abajo el frontend, vuelve a la terminal donde esta corriendo `npm run dev` y pulsa `Ctrl+C`. Si el proceso quedo abierto en segundo plano, puedes localizarlo y pararlo con:

```bash
lsof -i :3000
kill <PID>
```

## Ejecutar backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

La API estara disponible en `http://localhost:8000`.

Endpoint inicial:

```bash
curl http://localhost:8000/health
```

## Estado del MVP

Esta base no incluye todavia autenticacion, Supabase ni MediaPipe. La estructura queda preparada para anadir esas piezas sin mezclar rutas API, frontend y reglas biomecanicas.
