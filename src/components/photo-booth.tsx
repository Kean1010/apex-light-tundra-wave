import { FlipHorizontal, Timer } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CameraStage } from "@/components/camera-stage";
import { GalleryStrip, ShotViewer } from "@/components/gallery-strip";
import { Button } from "@/components/ui/button";
import { useCamera } from "@/hooks/use-camera";
import {
  captureFrame,
  composeStrip,
  downloadDataUrl,
  playShutterClick,
  shotFilename,
  CAPTURE_HEIGHT,
  CAPTURE_WIDTH,
} from "@/lib/capture";
import { drawDemoScene } from "@/lib/demo-scene";
import { FILTERS, getFilter, type FilterId } from "@/lib/filters";
import { addShot, loadShots, removeShot, type Shot } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const COUNTDOWN_OPTIONS = [0, 3, 5] as const;
type CountdownSec = (typeof COUNTDOWN_OPTIONS)[number];

export function PhotoBooth() {
  const camera = useCamera();
  const demoCanvasRef = useRef<HTMLCanvasElement>(null);
  const frozenRef = useRef(false);
  const [filterId, setFilterId] = useState<FilterId>("clear");
  const [countdownSec, setCountdownSec] = useState<CountdownSec>(3);
  const [counting, setCounting] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [shots, setShots] = useState<Shot[]>([]);
  const [activeShot, setActiveShot] = useState<Shot | null>(null);
  const [stripBusy, setStripBusy] = useState(false);

  const filter = getFilter(filterId);
  const streaming = camera.status === "live" || camera.status === "demo";
  const inCountdown = counting !== null;

  useEffect(() => {
    setShots(loadShots());
  }, []);

  useLayoutEffect(() => {
    if (camera.status !== "demo") return;
    const canvas = demoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = CAPTURE_WIDTH;
    canvas.height = CAPTURE_HEIGHT;
    let raf = 0;
    const t0 = performance.now();
    drawDemoScene(ctx, canvas.width, canvas.height, 0);
    const loop = (now: number) => {
      if (!frozenRef.current) {
        drawDemoScene(ctx, canvas.width, canvas.height, (now - t0) / 1000);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [camera.status]);

  const snap = useCallback(() => {
    const source =
      camera.status === "live" && camera.videoRef.current
        ? { kind: "video" as const, el: camera.videoRef.current }
        : camera.status === "demo" && demoCanvasRef.current
          ? { kind: "canvas" as const, el: demoCanvasRef.current }
          : null;
    if (!source) {
      toast.error("Nothing to capture yet.");
      return;
    }

    frozenRef.current = true;
    if (source.kind === "video") source.el.pause();
    playShutterClick();
    setFlash(true);

    const src = captureFrame(source, filterId, camera.mirror);
    if (src) {
      const shot: Shot = {
        id: crypto.randomUUID(),
        src,
        filter: filterId,
        createdAt: Date.now(),
      };
      setShots((prev) => addShot(prev, shot));
    } else {
      toast.error("Could not capture that frame.");
    }

    window.setTimeout(() => {
      setFlash(false);
      frozenRef.current = false;
      if (source.kind === "video") void source.el.play();
    }, 420);
  }, [camera.mirror, camera.status, camera.videoRef, filterId]);

  useEffect(() => {
    if (counting === null) return;
    if (counting <= 0) {
      setCounting(null);
      snap();
      return;
    }
    const id = window.setTimeout(() => {
      setCounting((c) => (c === null ? null : c - 1));
    }, 1000);
    return () => window.clearTimeout(id);
  }, [counting, snap]);

  const cancelCountdown = useCallback(() => setCounting(null), []);

  const handleShutter = useCallback(() => {
    if (inCountdown) {
      cancelCountdown();
      return;
    }
    if (!streaming) {
      if (camera.status === "unavailable") {
        camera.startDemo();
        return;
      }
      void camera.start();
      return;
    }
    if (countdownSec === 0) {
      snap();
      return;
    }
    setCounting(countdownSec);
  }, [camera, cancelCountdown, countdownSec, inCountdown, snap, streaming]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeShot) {
          setActiveShot(null);
          return;
        }
        if (inCountdown) cancelCountdown();
        return;
      }
      if (e.code !== "Space") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
      e.preventDefault();
      handleShutter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeShot, cancelCountdown, handleShutter, inCountdown]);

  const handleDownloadStrip = async () => {
    if (shots.length === 0) return;
    setStripBusy(true);
    try {
      const data = await composeStrip(shots);
      downloadDataUrl(data, `flashbox-strip-${Date.now()}.jpg`);
      toast.success("Strip saved");
    } catch {
      toast.error("Could not print the strip.");
    } finally {
      setStripBusy(false);
    }
  };

  const shutterLabel = inCountdown
    ? "Cancel countdown"
    : streaming
      ? countdownSec === 0
        ? "Take photo"
        : `Start ${countdownSec} second countdown`
      : "Open camera";

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="film-grain" aria-hidden />
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-8 pt-4 sm:px-6">
        <header className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-fg-subtle uppercase">
              Photo booth
            </p>
            <h1 className="font-display text-3xl font-medium italic tracking-[-0.03em] text-fg sm:text-4xl">
              Flashbox
            </h1>
          </div>
          <p className="hidden max-w-[16rem] text-right text-xs leading-relaxed text-fg-muted sm:block">
            Live preview, film looks, a countdown, and a strip of recent shots.
          </p>
        </header>

        <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 flex-1">
            <CameraStage
              videoRef={camera.videoRef}
              canvasRef={demoCanvasRef}
              status={camera.status}
              message={camera.message}
              filterCss={filter.css}
              vignette={filter.vignette}
              mirror={camera.mirror}
              counting={counting}
              canFlip={camera.canFlip}
              onStart={() => void camera.start()}
              onDemo={camera.startDemo}
              onFlip={() => void camera.flip()}
            />
          </div>

          <aside className="flex w-full flex-col gap-5 lg:w-72 lg:shrink-0 lg:pt-1">
            <div className="flex flex-col items-center gap-4">
              <ShutterButton
                counting={counting}
                disabled={camera.status === "requesting"}
                label={shutterLabel}
                onClick={handleShutter}
              />
              <div className="flex flex-col items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">
                  <Timer className="size-3.5" />
                  Timer
                </span>
                <div className="flex gap-1 rounded-full bg-bg-elevated p-1 shadow-[var(--shadow-border)]">
                  {COUNTDOWN_OPTIONS.map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setCountdownSec(sec)}
                      className={cn(
                        "h-9 min-w-11 rounded-full px-2.5 text-sm font-medium tabular-nums transition-colors duration-[var(--motion-quick)]",
                        countdownSec === sec
                          ? "bg-paper text-ink"
                          : "text-fg-muted hover:text-fg",
                      )}
                      aria-pressed={countdownSec === sec}
                    >
                      {sec === 0 ? "Off" : `${sec}s`}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-center text-xs text-fg-subtle">
                {inCountdown ? "Press again to cancel." : "Space snaps. Escape cancels."}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-fg-subtle uppercase">
                Looks
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-2 lg:overflow-visible">
                {FILTERS.map((item) => {
                  const selected = item.id === filterId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilterId(item.id)}
                      className={cn(
                        "flex min-h-11 min-w-[7.5rem] items-center gap-2.5 rounded-lg px-2.5 py-2 text-left",
                        "transition-[background-color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                        selected
                          ? "bg-paper text-ink shadow-[var(--shadow-soft)]"
                          : "bg-bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
                      )}
                      aria-pressed={selected}
                    >
                      <span
                        className="filter-swatch size-7 shrink-0 rounded-full"
                        style={{ filter: item.css === "none" ? undefined : item.css }}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium leading-none">{item.label}</span>
                        <span
                          className={cn(
                            "mt-1 block truncate text-[11px]",
                            selected ? "text-ink/55" : "text-fg-subtle",
                          )}
                        >
                          {item.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {streaming && (
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => camera.setMirror((m) => !m)}
                  aria-pressed={camera.mirror}
                >
                  <FlipHorizontal />
                  {camera.mirror ? "Mirrored" : "Unmirrored"}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={camera.stop}>
                  Close camera
                </Button>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-6">
          <GalleryStrip
            shots={shots}
            onOpen={setActiveShot}
            onDownloadStrip={() => void handleDownloadStrip()}
            stripBusy={stripBusy}
          />
        </div>
      </div>

      {flash && (
        <div className="flash-burst pointer-events-none fixed inset-0 z-40 bg-paper" aria-hidden />
      )}

      {activeShot && (
        <ShotViewer
          shot={activeShot}
          filterLabel={getFilter(activeShot.filter).label}
          onClose={() => setActiveShot(null)}
          onDownload={() => downloadDataUrl(activeShot.src, shotFilename(activeShot))}
          onDelete={() => {
            setShots((prev) => removeShot(prev, activeShot.id));
            setActiveShot(null);
          }}
        />
      )}
    </div>
  );
}

function ShutterButton({
  counting,
  disabled,
  label,
  onClick,
}: {
  counting: number | null;
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative grid size-[5.5rem] place-items-center rounded-full",
        "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "active:not-disabled:scale-[0.96] disabled:opacity-40",
      )}
    >
      <span className="absolute inset-0 rounded-full bg-bg-subtle shadow-[var(--shadow-border)]" />
      <span className="absolute inset-1.5 rounded-full bg-bg" />
      <span
        className={cn(
          "absolute inset-3 grid place-items-center rounded-full bg-paper text-ink",
          counting !== null && "bg-ink text-paper",
        )}
      >
        {counting !== null ? (
          <span className="font-display text-2xl font-medium tabular-nums leading-none">
            {counting}
          </span>
        ) : (
          <span className="size-7 rounded-full border-[3px] border-ink/80" />
        )}
      </span>
    </button>
  );
}
