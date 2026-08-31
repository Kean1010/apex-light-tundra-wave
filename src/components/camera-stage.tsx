import {
  Aperture,
  Camera,
  CameraOff,
  SwitchCamera,
  TriangleAlert,
} from "lucide-react";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import type { CameraStatus } from "@/hooks/use-camera";
import { cn } from "@/lib/utils";

const COUNTDOWN_COPY: Record<number, string> = {
  3: "Ready",
  2: "Hold still",
  1: "Smile",
};

type CameraStageProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  status: CameraStatus;
  message: string | null;
  filterCss: string;
  vignette: number;
  mirror: boolean;
  counting: number | null;
  canFlip: boolean;
  onStart: () => void;
  onDemo: () => void;
  onFlip: () => void;
};

export function CameraStage({
  videoRef,
  canvasRef,
  status,
  message,
  filterCss,
  vignette,
  mirror,
  counting,
  canFlip,
  onStart,
  onDemo,
  onFlip,
}: CameraStageProps) {
  const streaming = status === "live" || status === "demo";
  const filterStyle = {
    filter: filterCss === "none" ? undefined : filterCss,
    transform: mirror ? "scaleX(-1)" : undefined,
  };

  return (
    <section className="relative mx-auto w-full max-w-md lg:max-w-[30rem]">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-stage)]">
        <div className="absolute inset-0 rounded-2xl p-2">
          <div className="relative h-full overflow-hidden rounded-xl bg-bg">
            <div
              className="sprocket-track pointer-events-none absolute inset-y-3 left-0 z-10 w-4 opacity-70"
              aria-hidden
            />
            <div
              className="sprocket-track pointer-events-none absolute inset-y-3 right-0 z-10 w-4 opacity-70"
              aria-hidden
            />

            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 size-full object-cover",
                status === "live" ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              style={status === "live" ? filterStyle : undefined}
              muted
              playsInline
              autoPlay
            />
            {status === "demo" ? (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 size-full object-cover"
                style={filterStyle}
              />
            ) : null}

            {vignette > 0 && streaming && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 42%, transparent 38%, rgb(0 0 0 / ${vignette}) 100%)`,
                }}
                aria-hidden
              />
            )}

            {!streaming && (
              <IdlePanel status={status} message={message} onStart={onStart} onDemo={onDemo} />
            )}

            {streaming && (
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                <StatusChip status={status} />
              </div>
            )}

            {canFlip && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-3 right-3 z-20 size-11 bg-bg/70 text-fg backdrop-blur-sm"
                onClick={onFlip}
                aria-label="Flip camera"
              >
                <SwitchCamera />
              </Button>
            )}

            {counting !== null && counting > 0 && (
              <div className="absolute inset-0 z-30 grid place-items-center bg-bg/35">
                <div key={counting} className="countdown-pop text-center">
                  <p className="font-display text-7xl font-medium leading-none tracking-[-0.04em] text-paper tabular-nums sm:text-8xl">
                    {counting}
                  </p>
                  <p className="mt-3 font-sans text-sm font-medium tracking-[0.18em] text-paper uppercase">
                    {COUNTDOWN_COPY[counting] ?? "Hold still"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusChip({ status }: { status: CameraStatus }) {
  const live = status === "live" || status === "demo";
  const label = status === "demo" ? "Demo" : status === "live" ? "Live" : status;
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full bg-bg/70 px-3 text-xs font-medium tracking-wide text-fg backdrop-blur-sm">
      <span
        className={cn("size-1.5 rounded-full", live ? "bg-live" : "bg-fg-subtle")}
        aria-hidden
      />
      {label}
    </span>
  );
}

function IdlePanel({
  status,
  message,
  onStart,
  onDemo,
}: {
  status: CameraStatus;
  message: string | null;
  onStart: () => void;
  onDemo: () => void;
}) {
  const requesting = status === "requesting";
  const blocked = status === "denied" || status === "unavailable" || status === "error";
  const Icon = blocked ? (status === "denied" ? CameraOff : TriangleAlert) : Aperture;

  const title =
    status === "requesting"
      ? "Waiting for permission"
      : status === "denied"
        ? "Camera is blocked"
        : status === "unavailable"
          ? "No camera available"
          : status === "error"
            ? "Camera hiccup"
            : "Step into the booth";

  const body =
    message ??
    "Open your camera for a live preview, or try the studio demo with filters, countdown, and capture.";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_32%,rgb(243_238_230/0.08),transparent_58%)] px-6 text-center">
      <div className="stagger-in flex max-w-xs flex-col items-center">
        <span
          className={cn(
            "mb-4 grid size-14 place-items-center rounded-full bg-bg-subtle text-fg",
            requesting && "animate-pulse",
          )}
        >
          <Icon className="size-6" strokeWidth={1.6} />
        </span>
        <h2 className="font-display text-2xl font-medium tracking-[-0.03em] text-fg">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
        <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
          {status !== "unavailable" && (
            <Button type="button" variant="primary" onClick={onStart} disabled={requesting}>
              <Camera />
              {requesting ? "Asking…" : blocked ? "Try camera again" : "Open camera"}
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={onDemo} disabled={requesting}>
            Studio demo
          </Button>
        </div>
      </div>
    </div>
  );
}
