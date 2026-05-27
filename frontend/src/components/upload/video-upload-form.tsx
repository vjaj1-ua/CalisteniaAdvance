"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/types/analysis";

const acceptedVideoTypes = ["video/mp4", "video/quicktime", "video/webm"];
const acceptedExtensions = [".mp4", ".mov", ".webm"];
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
const loadingSteps = [
  "Preparando video...",
  "Analizando postura...",
  "Generando resumen visual..."
];

export function VideoUploadForm() {
  const inputId = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isAnalyzing) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setLoadingStepIndex((currentStep) =>
        Math.min(currentStep + 1, loadingSteps.length - 1)
      );
    }, 1400);

    return () => window.clearInterval(intervalId);
  }, [isAnalyzing]);

  function handleVideoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setAnalysisError(null);
    setAnalysisResult(null);

    if (!file) {
      setSelectedFile(null);
      setError(null);
      return;
    }

    if (!isAcceptedVideo(file)) {
      setSelectedFile(null);
      setError("Selecciona un video en formato MP4, MOV o WEBM.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setError(null);
  }

  async function handleAnalyzeVideo() {
    if (!selectedFile || isAnalyzing) {
      return;
    }

    setIsAnalyzing(true);
    setLoadingStepIndex(0);
    setAnalysisError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const message = await readBackendError(response);
        throw new Error(message);
      }

      const result = (await response.json()) as AnalysisResult;
      setAnalysisResult(result);
    } catch (caughtError) {
      setAnalysisError(
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo analizar el video. Intentalo de nuevo."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  const canAnalyze = Boolean(selectedFile) && !isAnalyzing;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
        <label
          className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2"
          htmlFor={inputId}
        >
          Seleccionar video
        </label>
        <input
          accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
          className="sr-only"
          id={inputId}
          onChange={handleVideoChange}
          type="file"
        />
        <p className="mt-3 text-sm text-slate-500">
          Solo se permite un archivo de video: MP4, MOV o WEBM.
        </p>
      </div>

      {error ? (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-5 rounded-md bg-slate-50 p-4">
        <p className="text-sm font-semibold text-ink">Video seleccionado</p>
        <p className="mt-1 break-words text-sm text-slate-600">
          {selectedFile?.name ?? "Todavia no has seleccionado ningun video."}
        </p>
      </div>

      {previewUrl ? (
        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-ink">Previsualizacion</p>
          <video
            className="aspect-video w-full rounded-md bg-slate-950 object-contain"
            controls
            preload="metadata"
            src={previewUrl}
          >
            Tu navegador no permite previsualizar este video.
          </video>
        </div>
      ) : null}

      <Button
        aria-disabled={!canAnalyze}
        className={`mt-6 w-full sm:w-auto ${
          canAnalyze
            ? ""
            : "cursor-not-allowed bg-slate-300 text-slate-500 hover:bg-slate-300"
        }`}
        onClick={handleAnalyzeVideo}
      >
        {isAnalyzing ? "Analizando..." : "Analizar video"}
      </Button>

      {isAnalyzing ? (
        <div className="mt-4 rounded-md bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
          {loadingSteps[loadingStepIndex]}
        </div>
      ) : null}

      {analysisError ? (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {analysisError}
        </p>
      ) : null}

      {analysisResult ? <AnalysisResultView result={analysisResult} /> : null}
    </div>
  );
}

function AnalysisResultView({ result }: { result: AnalysisResult }) {
  return (
    <section className="mt-6 space-y-5 border-t border-slate-200 pt-6">
      <div>
        <h2 className="text-xl font-bold text-ink">Resultado del analisis</h2>
        <p className="mt-1 text-sm text-slate-600">
          Estimacion inicial basada en MediaPipe Pose. Las metricas son
          heuristicas y serviran como base para ajustar reglas biomecanicas.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Frames analizados" value={result.frames_analyzed} />
        <MetricCard
          label="Duracion"
          value={
            result.duration_seconds === null
              ? "No disponible"
              : `${result.duration_seconds}s`
          }
        />
        <MetricCard label="FPS" value={result.fps} />
        <MetricCard
          label="Pose detectada"
          value={`${Math.round(result.pose_detected_ratio * 100)}%`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ScorePanel
          detail={`Angulo medio abajo: ${result.metrics.depth.average_bottom_elbow_angle} grados`}
          score={result.metrics.depth.score}
          status={result.metrics.depth.status}
          title="Profundidad media"
        />
        <ScorePanel
          detail={`Desviacion media: ${result.metrics.body_position.average_alignment_deviation_degrees} grados`}
          score={result.metrics.body_position.score}
          status={result.metrics.body_position.status}
          title="Posicion corporal"
        />
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-ink">Repeticiones</p>
          <p className="mt-3 text-4xl font-bold text-ink">
            {result.metrics.repetitions.total}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Validas estimadas: {result.metrics.repetitions.valid} · Confianza: {result.metrics.repetitions.confidence}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-ink">Detalle tecnico</h3>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <MetricDetail
            label="Mejor profundidad"
            value={`${result.metrics.depth.best_bottom_elbow_angle} grados`}
          />
          <MetricDetail
            label="Rango de movimiento"
            value={`${result.metrics.depth.range_degrees} grados`}
          />
          <MetricDetail
            label="Referencia hombro-muneca"
            value={result.metrics.body_position.average_shoulder_wrist_offset}
          />
          <MetricDetail
            label="Muestreo"
            value={`1 de cada ${result.sampled_every_n_frames} frames`}
          />
        </dl>
      </div>

      <div>
        <h3 className="text-base font-semibold text-ink">
          Resumen visual del analisis
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Frames seleccionados segun la curva de movimiento: arriba, bajando y
          abajo del todo cuando el video lo permite.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {result.visual_summary.map((frame) => (
            <figure
              className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
              key={`${frame.label}-${frame.timestamp}`}
            >
              <Image
                alt={`Frame ${frame.label} con esqueleto de MediaPipe`}
                className="aspect-video w-full object-contain"
                height={360}
                src={`data:image/jpeg;base64,${frame.image_base64}`}
                unoptimized
                width={640}
              />
              <figcaption className="px-3 py-2 text-sm text-slate-600">
                {frame.label} · {frame.timestamp}s
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScorePanel({
  detail,
  score,
  status,
  title
}: {
  detail: string;
  score: number;
  status: string;
  title: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <span className="rounded-md bg-teal-100 px-2 py-1 text-sm font-bold text-teal-800">
          {score}/100
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-900">{status}</p>
      <p className="mt-2 text-sm text-slate-600">{detail}</p>
    </div>
  );
}

function MetricDetail({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex justify-between gap-4 rounded-md bg-slate-50 px-3 py-2">
      <dt className="text-slate-600">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}

function isAcceptedVideo(file: File) {
  const lowerName = file.name.toLowerCase();
  const hasAcceptedType = acceptedVideoTypes.includes(file.type);
  const hasAcceptedExtension = acceptedExtensions.some((extension) =>
    lowerName.endsWith(extension)
  );

  return hasAcceptedType || hasAcceptedExtension;
}

async function readBackendError(response: Response) {
  try {
    const body = (await response.json()) as { detail?: string };
    return body.detail ?? "El backend no pudo analizar el video.";
  } catch {
    return "El backend no pudo analizar el video.";
  }
}
