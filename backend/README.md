# Backend

API FastAPI para CalisteniaAdvance.

## Ejecutar

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

La API se sirve por defecto en `http://localhost:8000`.

## Endpoint inicial

```bash
curl http://localhost:8000/health
```

Respuesta esperada:

```json
{
  "status": "OK"
}
```

## Estructura

```text
app/main.py                # Configuracion de FastAPI
app/api/routes/health.py   # Health check
app/api/routes/analysis.py # Router reservado para analisis futuros
```

Las reglas biomecanicas y la integracion con MediaPipe no deben vivir dentro de las rutas API.
