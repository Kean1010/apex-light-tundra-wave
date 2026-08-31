import { format } from "date-fns";
import { Download, Images, Rows3 } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import type { Shot } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const TILTS = [-1.6, 1.2, -0.9, 1.5, -1.3, 0.8, -1.1, 1.4];

type GalleryStripProps = {
  shots: Shot[];
  onOpen: (shot: Shot) => void;
  onDownloadStrip: () => void;
  stripBusy: boolean;
};

export function GalleryStrip({ shots, onOpen, onDownloadStrip, stripBusy }: GalleryStripProps) {
  return (
    <section className="mt-2 rounded-2xl bg-bg-elevated px-3 py-3 shadow-[var(--shadow-border)] sm:px-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-fg">
          <Images className="size-4 text-fg-muted" />
          <h2 className="text-sm font-medium">Strip</h2>
          <span className="text-xs tabular-nums text-fg-subtle">{shots.length}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDownloadStrip}
          disabled={shots.length === 0 || stripBusy}
          className="text-fg-muted hover:text-fg"
        >
          <Rows3 />
          {stripBusy ? "Printing…" : "Save strip"}
        </Button>
      </div>

      {shots.length === 0 ? (
        <div className="flex items-center gap-3 overflow-hidden px-1 py-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-28 w-20 shrink-0 rounded-md bg-bg-subtle shadow-[var(--shadow-border)]"
              aria-hidden
            />
          ))}
          <p className="pl-2 text-sm text-fg-muted">Your strip is empty. Take a shot.</p>
        </div>
      ) : (
        <ul className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((shot, i) => (
            <li key={shot.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onOpen(shot)}
                className={cn(
                  "polaroid-in block w-[5.5rem] rounded-md bg-paper p-1.5 pb-5 text-left shadow-[var(--shadow-soft)]",
                  "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:-translate-y-0.5",
                )}
                style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
                aria-label={`Open photo from ${format(shot.createdAt, "h:mm a")}`}
              >
                <img
                  src={shot.src}
                  alt=""
                  className="aspect-[3/4] w-full rounded-sm object-cover outline outline-1 -outline-offset-1 outline-ink/10"
                />
                <span className="mt-1.5 block px-0.5 font-display text-[10px] tracking-wide text-ink/70">
                  {format(shot.createdAt, "h:mm a")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function ShotViewer({
  shot,
  filterLabel,
  onClose,
  onDownload,
  onDelete,
}: {
  shot: Shot;
  filterLabel: string;
  onClose: () => void;
  onDownload: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo preview"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-paper p-3 pb-5 shadow-[var(--shadow-stage)]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={shot.src}
          alt={`Captured with ${filterLabel} filter`}
          className="aspect-[3/4] w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
        <div className="mt-4 flex items-start justify-between gap-3 px-1">
          <div>
            <p className="font-display text-lg font-medium text-ink">{filterLabel}</p>
            <p className="text-xs text-fg-subtle">{format(shot.createdAt, "MMM d, yyyy · h:mm a")}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            variant="primary"
            className="flex-1 bg-ink text-paper hover:bg-ink/90"
            onClick={onDownload}
          >
            <Download />
            Download
          </Button>
          <Button
            type="button"
            variant="outline"
            className="text-ink shadow-none ring-1 ring-ink/15"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full py-2 text-center text-sm text-fg-subtle hover:text-ink"
        >
          Close
        </button>
      </div>
    </div>
  );
}
