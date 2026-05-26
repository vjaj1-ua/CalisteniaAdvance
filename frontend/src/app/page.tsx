import Link from "next/link";

import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Sube tu video",
    description:
      "Carga una grabacion corta haciendo flexiones desde un angulo claro."
  },
  {
    title: "Analiza tu tecnica",
    description:
      "La aplicacion preparara el video para detectar postura, rango y control."
  },
  {
    title: "Recibe recomendaciones",
    description:
      "Obtendras una puntuacion inicial y consejos accionables para mejorar."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between py-4">
          <Link className="text-lg font-bold tracking-tight text-ink" href="/">
            CalisteniaAdvance
          </Link>
          <a
            className="hidden text-sm font-medium text-slate-600 transition hover:text-ink sm:block"
            href="#funcionamiento"
          >
            Funcionamiento
          </a>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-teal-200 bg-white px-3 py-1 text-sm font-medium text-teal-700">
              MVP para flexiones
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl">
              CalisteniaAdvance
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Sube un video entrenando flexiones y recibe un analisis claro de
              tu tecnica, errores principales y recomendaciones para progresar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button>Comenzar analisis</Button>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-ink transition hover:border-slate-400"
                href="#funcionamiento"
              >
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-ink p-5 shadow-soft">
            <div className="aspect-[4/3] rounded-md border border-white/10 bg-slate-900 p-4">
              <div className="flex h-full flex-col justify-between rounded-md bg-slate-950/80 p-4">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                  <span>Analisis tecnico</span>
                  <span className="rounded-full bg-teal-400/15 px-2 py-1 text-teal-200">
                    Preparado
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-4/5 rounded-full bg-teal-300" />
                  <div className="h-3 w-3/5 rounded-full bg-sky-300" />
                  <div className="h-3 w-2/3 rounded-full bg-amber-300" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Metric label="Control" value="82" />
                  <Metric label="Rango" value="76" />
                  <Metric label="Postura" value="88" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          id="funcionamiento"
          className="grid gap-4 pb-10 sm:grid-cols-3 lg:pb-14"
        >
          {steps.map((step, index) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={step.title}
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-teal-50 text-sm font-bold text-teal-700">
                {index + 1}
              </span>
              <h2 className="text-lg font-semibold text-ink">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white/10 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
