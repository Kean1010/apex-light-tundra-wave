import { getFilter, type FilterId } from "./filters";
import type { Shot } from "./gallery";

export const CAPTURE_WIDTH = 720;
export const CAPTURE_HEIGHT = 960;

type Source =
  | { kind: "video"; el: HTMLVideoElement }
  | { kind: "canvas"; el: HTMLCanvasElement };

function sourceSize(source: Source): { sw: number; sh: number } {
  if (source.kind === "video") {
    return {
      sw: source.el.videoWidth || source.el.clientWidth,
      sh: source.el.videoHeight || source.el.clientHeight,
    };
  }
  return { sw: source.el.width, sh: source.el.height };
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  sw: number,
  sh: number,
  dw: number,
  dh: number,
) {
  const scale = Math.max(dw / sw, dh / sh);
  const dw2 = sw * scale;
  const dh2 = sh * scale;
  ctx.drawImage(image, (dw - dw2) / 2, (dh - dh2) / 2, dw2, dh2);
}

function drawVignette(ctx: CanvasRenderingContext2D, strength: number, w: number, h: number) {
  if (strength <= 0) return;
  const g = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h * 0.5, w * 0.78);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export function captureFrame(
  source: Source,
  filterId: FilterId,
  mirror: boolean,
): string | null {
  const { sw, sh } = sourceSize(source);
  if (!sw || !sh) return null;

  const canvas = document.createElement("canvas");
  canvas.width = CAPTURE_WIDTH;
  canvas.height = CAPTURE_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const filter = getFilter(filterId);

  ctx.save();
  if (mirror) {
    ctx.translate(CAPTURE_WIDTH, 0);
    ctx.scale(-1, 1);
  }
  ctx.filter = filter.css === "none" ? "none" : filter.css;
  drawCover(ctx, source.el, sw, sh, CAPTURE_WIDTH, CAPTURE_HEIGHT);
  ctx.restore();
  drawVignette(ctx, filter.vignette, CAPTURE_WIDTH, CAPTURE_HEIGHT);

  return canvas.toDataURL("image/jpeg", 0.88);
}

export function downloadDataUrl(src: string, filename: string) {
  const a = document.createElement("a");
  a.href = src;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function shotFilename(shot: Shot, ext = "jpg") {
  const d = new Date(shot.createdAt);
  const stamp = [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
    "-",
    String(d.getHours()).padStart(2, "0"),
    String(d.getMinutes()).padStart(2, "0"),
    String(d.getSeconds()).padStart(2, "0"),
  ].join("");
  return `flashbox-${stamp}.${ext}`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load photo"));
    img.src = src;
  });
}

export async function composeStrip(shots: Shot[]): Promise<string> {
  const take = shots.slice(0, 4);
  if (take.length === 0) throw new Error("No photos to print");

  const images = await Promise.all(take.map((shot) => loadImage(shot.src)));
  const W = 420;
  const PAD = 28;
  const GAP = 14;
  const PHOTO_W = W - PAD * 2;
  const PHOTO_H = Math.round(PHOTO_W * (CAPTURE_HEIGHT / CAPTURE_WIDTH));
  const FOOTER = 96;
  const H = PAD + take.length * PHOTO_H + (take.length - 1) * GAP + FOOTER;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not compose strip");

  ctx.fillStyle = "#f3eee6";
  ctx.fillRect(0, 0, W, H);

  images.forEach((img, i) => {
    const y = PAD + i * (PHOTO_H + GAP);
    ctx.fillStyle = "#1c1916";
    ctx.fillRect(PAD - 1, y - 1, PHOTO_W + 2, PHOTO_H + 2);
    ctx.drawImage(img, PAD, y, PHOTO_W, PHOTO_H);
  });

  ctx.fillStyle = "#1c1916";
  ctx.font = "600 28px Fraunces, Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("FLASHBOX", W / 2, H - 48);
  ctx.font = "500 13px Figtree, system-ui, sans-serif";
  ctx.fillStyle = "#6f6860";
  const when = new Date(take[0].createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  ctx.fillText(when, W / 2, H - 26);

  return canvas.toDataURL("image/jpeg", 0.92);
}

export function playShutterClick() {
  try {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const click = (time: number, freq: number, dur: number, gain: number) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, time + dur);
      g.gain.setValueAtTime(gain, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur + 0.02);
    };

    click(now, 420, 0.045, 0.12);
    click(now + 0.055, 180, 0.07, 0.16);
    window.setTimeout(() => void ctx.close(), 400);
  } catch {
    /* ignore autoplay / unsupported */
  }
}
