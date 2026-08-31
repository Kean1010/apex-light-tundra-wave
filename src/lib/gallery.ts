import type { FilterId } from "./filters";

export type Shot = {
  id: string;
  src: string;
  filter: FilterId;
  createdAt: number;
};

const KEY = "flashbox.shots.v1";
export const MAX_SHOTS = 12;

function isShot(value: unknown): value is Shot {
  if (!value || typeof value !== "object") return false;
  const shot = value as Shot;
  return (
    typeof shot.id === "string" &&
    typeof shot.src === "string" &&
    typeof shot.filter === "string" &&
    typeof shot.createdAt === "number"
  );
}

export function loadShots(): Shot[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isShot).slice(0, MAX_SHOTS);
  } catch {
    return [];
  }
}

export function persistShots(shots: Shot[]): Shot[] {
  const trimmed = shots.slice(0, MAX_SHOTS);
  try {
    localStorage.setItem(KEY, JSON.stringify(trimmed));
    return trimmed;
  } catch {
    const halved = trimmed.slice(0, Math.max(1, Math.floor(trimmed.length / 2)));
    try {
      localStorage.setItem(KEY, JSON.stringify(halved));
      return halved;
    } catch {
      localStorage.removeItem(KEY);
      return [];
    }
  }
}

export function addShot(shots: Shot[], next: Shot): Shot[] {
  return persistShots([next, ...shots]);
}

export function removeShot(shots: Shot[], id: string): Shot[] {
  return persistShots(shots.filter((shot) => shot.id !== id));
}

export function clearShots(): Shot[] {
  persistShots([]);
  return [];
}
