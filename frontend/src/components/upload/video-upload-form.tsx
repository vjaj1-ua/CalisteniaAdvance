"use client";

import { ChangeEvent, useEffect, useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

const acceptedVideoTypes = ["video/mp4", "video/quicktime", "video/webm"];
const acceptedExtensions = [".mp4", ".mov", ".webm"];

export function VideoUploadForm() {
  const inputId = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
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

  function handleVideoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

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

      <Button className="mt-6 w-full sm:w-auto" disabled>
        Analizar video
      </Button>
      <p className="mt-2 text-sm text-slate-500">
        El analisis se conectara en una fase posterior. Ahora el video no se
        guarda ni se envia al backend.
      </p>
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
