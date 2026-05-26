import Link from "next/link";

import { VideoUploadForm } from "@/components/upload/video-upload-form";

export default function AnalysisUploadPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between py-4">
          <Link className="text-lg font-bold tracking-tight text-ink" href="/">
            CalisteniaAdvance
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-ink"
            href="/"
          >
            Volver
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:py-14">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-teal-200 bg-white px-3 py-1 text-sm font-medium text-teal-700">
              Subida de video
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-normal text-ink sm:text-4xl lg:text-5xl">
              Sube tu video de flexiones
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              Graba una serie corta de flexiones donde se vea el cuerpo de lado
              o desde un angulo claro. Mas adelante este video se usara para
              analizar tu tecnica con vision artificial.
            </p>
            <div className="mt-6 space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Instruction title="Encuadre claro" text="Asegurate de que hombros, cadera, rodillas y pies entren en plano." />
              <Instruction title="Movimiento completo" text="Incluye varias repeticiones para poder evaluar rango y control." />
              <Instruction title="Sin guardado todavia" text="En esta fase el archivo solo se previsualiza en tu navegador." />
            </div>
          </div>

          <VideoUploadForm />
        </div>
      </section>
    </main>
  );
}

function Instruction({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
