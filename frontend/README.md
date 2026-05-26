# Frontend

Aplicacion Next.js para la interfaz de CalisteniaAdvance.

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Detener

En la terminal donde esta corriendo `npm run dev`, pulsa `Ctrl+C`.

Si el proceso quedo abierto en segundo plano:

```bash
lsof -i :3000
kill <PID>
```

## Estructura

```text
src/app/              # Rutas y layout de Next.js
src/components/ui/    # Componentes reutilizables de interfaz
```

La landing inicial es mobile-first y prepara el flujo del MVP: subir video, analizar tecnica y recibir recomendaciones.
