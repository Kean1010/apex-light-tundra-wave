import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Images, c as Camera, i as Rows3, l as CameraOff, n as Timer, o as FlipHorizontal, r as SwitchCamera, s as Download, t as TriangleAlert, u as Aperture } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-i4XlRMun.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-[background-color,color,box-shadow,opacity,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-paper text-ink shadow-[var(--shadow-soft)] hover:bg-paper-edge",
			secondary: "bg-bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-fg hover:bg-bg-subtle",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:bg-bg-subtle"
		},
		size: {
			sm: "h-9 rounded-[var(--radius-sm)] px-3",
			md: "h-11 rounded-[var(--radius-md)] px-4",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-base",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), "active:not-disabled:scale-[0.96]", className),
		...props
	});
}
var COUNTDOWN_COPY = {
	3: "Ready",
	2: "Hold still",
	1: "Smile"
};
function CameraStage({ videoRef, canvasRef, status, message, filterCss, vignette, mirror, counting, canFlip, onStart, onDemo, onFlip }) {
	const streaming = status === "live" || status === "demo";
	const filterStyle = {
		filter: filterCss === "none" ? void 0 : filterCss,
		transform: mirror ? "scaleX(-1)" : void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative mx-auto w-full max-w-md lg:max-w-[30rem]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-stage)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 rounded-2xl p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-full overflow-hidden rounded-xl bg-bg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sprocket-track pointer-events-none absolute inset-y-3 left-0 z-10 w-4 opacity-70",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sprocket-track pointer-events-none absolute inset-y-3 right-0 z-10 w-4 opacity-70",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							ref: videoRef,
							className: cn("absolute inset-0 size-full object-cover", status === "live" ? "opacity-100" : "pointer-events-none opacity-0"),
							style: status === "live" ? filterStyle : void 0,
							muted: true,
							playsInline: true,
							autoPlay: true
						}),
						status === "demo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: canvasRef,
							className: "absolute inset-0 size-full object-cover",
							style: filterStyle
						}) : null,
						vignette > 0 && streaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-0",
							style: { background: `radial-gradient(circle at 50% 42%, transparent 38%, rgb(0 0 0 / ${vignette}) 100%)` },
							"aria-hidden": true
						}),
						!streaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdlePanel, {
							status,
							message,
							onStart,
							onDemo
						}),
						streaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 left-3 z-20 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status })
						}),
						canFlip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "icon",
							className: "absolute top-3 right-3 z-20 size-11 bg-bg/70 text-fg backdrop-blur-sm",
							onClick: onFlip,
							"aria-label": "Flip camera",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchCamera, {})
						}),
						counting !== null && counting > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 z-30 grid place-items-center bg-bg/35",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "countdown-pop text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-7xl font-medium leading-none tracking-[-0.04em] text-paper tabular-nums sm:text-8xl",
									children: counting
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-sans text-sm font-medium tracking-[0.18em] text-paper uppercase",
									children: COUNTDOWN_COPY[counting] ?? "Hold still"
								})]
							}, counting)
						})
					]
				})
			})
		})
	});
}
function StatusChip({ status }) {
	const live = status === "live" || status === "demo";
	const label = status === "demo" ? "Demo" : status === "live" ? "Live" : status;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex h-8 items-center gap-2 rounded-full bg-bg/70 px-3 text-xs font-medium tracking-wide text-fg backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-1.5 rounded-full", live ? "bg-live" : "bg-fg-subtle"),
			"aria-hidden": true
		}), label]
	});
}
function IdlePanel({ status, message, onStart, onDemo }) {
	const requesting = status === "requesting";
	const blocked = status === "denied" || status === "unavailable" || status === "error";
	const Icon = blocked ? status === "denied" ? CameraOff : TriangleAlert : Aperture;
	const title = status === "requesting" ? "Waiting for permission" : status === "denied" ? "Camera is blocked" : status === "unavailable" ? "No camera available" : status === "error" ? "Camera hiccup" : "Step into the booth";
	const body = message ?? "Open your camera for a live preview, or try the studio demo with filters, countdown, and capture.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_32%,rgb(243_238_230/0.08),transparent_58%)] px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in flex max-w-xs flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mb-4 grid size-14 place-items-center rounded-full bg-bg-subtle text-fg", requesting && "animate-pulse"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-6",
						strokeWidth: 1.6
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-[-0.03em] text-fg",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-fg-muted",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex w-full flex-col gap-2 sm:flex-row sm:justify-center",
					children: [status !== "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "primary",
						onClick: onStart,
						disabled: requesting,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {}), requesting ? "Asking…" : blocked ? "Try camera again" : "Open camera"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: onDemo,
						disabled: requesting,
						children: "Studio demo"
					})]
				})
			]
		})
	});
}
var TILTS = [
	-1.6,
	1.2,
	-.9,
	1.5,
	-1.3,
	.8,
	-1.1,
	1.4
];
function GalleryStrip({ shots, onOpen, onDownloadStrip, stripBusy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-2 rounded-2xl bg-bg-elevated px-3 py-3 shadow-[var(--shadow-border)] sm:px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-4 text-fg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Strip"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums text-fg-subtle",
						children: shots.length
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: onDownloadStrip,
				disabled: shots.length === 0 || stripBusy,
				className: "text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rows3, {}), stripBusy ? "Printing…" : "Save strip"]
			})]
		}), shots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 overflow-hidden px-1 py-2",
			children: [[
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-28 w-20 shrink-0 rounded-md bg-bg-subtle shadow-[var(--shadow-border)]",
				"aria-hidden": true
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pl-2 text-sm text-fg-muted",
				children: "Your strip is empty. Take a shot."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			children: shots.map((shot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onOpen(shot),
					className: cn("polaroid-in block w-[5.5rem] rounded-md bg-paper p-1.5 pb-5 text-left shadow-[var(--shadow-soft)]", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:-translate-y-0.5"),
					style: { "--tilt": `${TILTS[i % TILTS.length]}deg` },
					"aria-label": `Open photo from ${format(shot.createdAt, "h:mm a")}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: shot.src,
						alt: "",
						className: "aspect-[3/4] w-full rounded-sm object-cover outline outline-1 -outline-offset-1 outline-ink/10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1.5 block px-0.5 font-display text-[10px] tracking-wide text-ink/70",
						children: format(shot.createdAt, "h:mm a")
					})]
				})
			}, shot.id))
		})]
	});
}
function ShotViewer({ shot, filterLabel, onClose, onDownload, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Photo preview",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-2xl bg-paper p-3 pb-5 shadow-[var(--shadow-stage)]",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: shot.src,
					alt: `Captured with ${filterLabel} filter`,
					className: "aspect-[3/4] w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex items-start justify-between gap-3 px-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-medium text-ink",
						children: filterLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-fg-subtle",
						children: format(shot.createdAt, "MMM d, yyyy · h:mm a")
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "primary",
						className: "flex-1 bg-ink text-paper hover:bg-ink/90",
						onClick: onDownload,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						className: "text-ink shadow-none ring-1 ring-ink/15",
						onClick: onDelete,
						children: "Delete"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "mt-3 w-full py-2 text-center text-sm text-fg-subtle hover:text-ink",
					children: "Close"
				})
			]
		})
	});
}
function classifyError(err) {
	const name = err instanceof DOMException ? err.name : "";
	const message = err instanceof Error ? err.message : "Camera failed to start.";
	if (name === "NotAllowedError" || name === "PermissionDeniedError") return {
		status: "denied",
		message: "Camera access is blocked. Allow it in the browser, or try the studio demo."
	};
	if (name === "NotFoundError" || name === "DevicesNotFoundError") return {
		status: "unavailable",
		message: "No camera was found on this device. You can still shoot in studio demo."
	};
	if (name === "NotReadableError" || name === "TrackStartError") return {
		status: "error",
		message: "The camera is already in use by another app. Close it and try again."
	};
	if (name === "OverconstrainedError" || name === "ConstraintNotSatisfiedError") return {
		status: "error",
		message: "This camera does not support the requested view. Try flipping or the demo."
	};
	if (name === "SecurityError") return {
		status: "unavailable",
		message: "This page cannot use the camera in the current context."
	};
	return {
		status: "error",
		message
	};
}
function useCamera() {
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)(null);
	const [facing, setFacing] = (0, import_react.useState)("user");
	const [deviceCount, setDeviceCount] = (0, import_react.useState)(0);
	const [mirror, setMirror] = (0, import_react.useState)(true);
	const stopStream = (0, import_react.useCallback)(() => {
		streamRef.current?.getTracks().forEach((track) => track.stop());
		streamRef.current = null;
		if (videoRef.current) videoRef.current.srcObject = null;
	}, []);
	const refreshDevices = (0, import_react.useCallback)(async () => {
		if (!navigator.mediaDevices?.enumerateDevices) return;
		try {
			const all = await navigator.mediaDevices.enumerateDevices();
			setDeviceCount(all.filter((d) => d.kind === "videoinput").length);
		} catch {}
	}, []);
	const attachStream = (0, import_react.useCallback)(async (stream) => {
		streamRef.current = stream;
		const video = videoRef.current;
		if (video) {
			video.srcObject = stream;
			video.muted = true;
			video.playsInline = true;
			await video.play();
		}
		await refreshDevices();
	}, [refreshDevices]);
	const start = (0, import_react.useCallback)(async (nextFacing = facing) => {
		if (typeof window === "undefined") return;
		if (!window.isSecureContext) {
			setStatus("unavailable");
			setMessage("Camera needs a secure page. Use the studio demo instead.");
			return;
		}
		if (!navigator.mediaDevices?.getUserMedia) {
			setStatus("unavailable");
			setMessage("This browser cannot open a camera. Use the studio demo instead.");
			return;
		}
		setStatus("requesting");
		setMessage(null);
		stopStream();
		const attempts = [
			{
				audio: false,
				video: {
					facingMode: { ideal: nextFacing },
					width: { ideal: 1280 },
					height: { ideal: 960 }
				}
			},
			{
				audio: false,
				video: { facingMode: nextFacing }
			},
			{
				audio: false,
				video: true
			}
		];
		let lastError;
		for (const constraints of attempts) try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			await attachStream(stream);
			setFacing(nextFacing);
			setMirror(nextFacing === "user");
			setStatus("live");
			setMessage(null);
			return;
		} catch (err) {
			lastError = err;
		}
		const classified = classifyError(lastError);
		setStatus(classified.status);
		setMessage(classified.message);
	}, [
		attachStream,
		facing,
		stopStream
	]);
	const startDemo = (0, import_react.useCallback)(() => {
		stopStream();
		setStatus("demo");
		setMirror(true);
		setMessage(null);
	}, [stopStream]);
	const stop = (0, import_react.useCallback)(() => {
		stopStream();
		setStatus("idle");
		setMessage(null);
	}, [stopStream]);
	const flip = (0, import_react.useCallback)(async () => {
		await start(facing === "user" ? "environment" : "user");
	}, [facing, start]);
	(0, import_react.useEffect)(() => {
		return () => {
			streamRef.current?.getTracks().forEach((track) => track.stop());
		};
	}, []);
	return {
		videoRef,
		status,
		message,
		facing,
		mirror,
		setMirror,
		deviceCount,
		canFlip: deviceCount > 1 && status === "live",
		start,
		startDemo,
		stop,
		flip
	};
}
var FILTERS = [
	{
		id: "clear",
		label: "Clear",
		hint: "True color",
		css: "none",
		vignette: 0
	},
	{
		id: "noir",
		label: "Noir",
		hint: "High-contrast mono",
		css: "grayscale(1) contrast(1.22) brightness(0.92)",
		vignette: .5
	},
	{
		id: "honey",
		label: "Honey",
		hint: "Warm tungsten",
		css: "sepia(0.28) saturate(1.18) hue-rotate(-12deg) brightness(1.06)",
		vignette: .16
	},
	{
		id: "ice",
		label: "Ice",
		hint: "Cool daylight",
		css: "saturate(0.78) hue-rotate(16deg) contrast(1.08) brightness(1.04)",
		vignette: .12
	},
	{
		id: "faded",
		label: "Faded",
		hint: "Sun-bleached print",
		css: "sepia(0.38) contrast(0.88) brightness(1.08) saturate(0.72)",
		vignette: .38
	},
	{
		id: "pop",
		label: "Pop",
		hint: "Punchy color",
		css: "saturate(1.42) contrast(1.14) brightness(1.04)",
		vignette: 0
	},
	{
		id: "soft",
		label: "Soft",
		hint: "Diffused glow",
		css: "brightness(1.1) contrast(0.86) saturate(0.88)",
		vignette: .22
	},
	{
		id: "paper",
		label: "Paper",
		hint: "Newsprint",
		css: "grayscale(0.88) contrast(1.1) brightness(1.12)",
		vignette: .28
	}
];
function getFilter(id) {
	return FILTERS.find((filter) => filter.id === id) ?? FILTERS[0];
}
function sourceSize(source) {
	if (source.kind === "video") return {
		sw: source.el.videoWidth || source.el.clientWidth,
		sh: source.el.videoHeight || source.el.clientHeight
	};
	return {
		sw: source.el.width,
		sh: source.el.height
	};
}
function drawCover(ctx, image, sw, sh, dw, dh) {
	const scale = Math.max(dw / sw, dh / sh);
	const dw2 = sw * scale;
	const dh2 = sh * scale;
	ctx.drawImage(image, (dw - dw2) / 2, (dh - dh2) / 2, dw2, dh2);
}
function drawVignette(ctx, strength, w, h) {
	if (strength <= 0) return;
	const g = ctx.createRadialGradient(w / 2, h / 2, w * .2, w / 2, h * .5, w * .78);
	g.addColorStop(0, "rgba(0,0,0,0)");
	g.addColorStop(1, `rgba(0,0,0,${strength})`);
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
}
function captureFrame(source, filterId, mirror) {
	const { sw, sh } = sourceSize(source);
	if (!sw || !sh) return null;
	const canvas = document.createElement("canvas");
	canvas.width = 720;
	canvas.height = 960;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	const filter = getFilter(filterId);
	ctx.save();
	if (mirror) {
		ctx.translate(720, 0);
		ctx.scale(-1, 1);
	}
	ctx.filter = filter.css === "none" ? "none" : filter.css;
	drawCover(ctx, source.el, sw, sh, 720, 960);
	ctx.restore();
	drawVignette(ctx, filter.vignette, 720, 960);
	return canvas.toDataURL("image/jpeg", .88);
}
function downloadDataUrl(src, filename) {
	const a = document.createElement("a");
	a.href = src;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
}
function shotFilename(shot, ext = "jpg") {
	const d = new Date(shot.createdAt);
	return `flashbox-${[
		d.getFullYear(),
		String(d.getMonth() + 1).padStart(2, "0"),
		String(d.getDate()).padStart(2, "0"),
		"-",
		String(d.getHours()).padStart(2, "0"),
		String(d.getMinutes()).padStart(2, "0"),
		String(d.getSeconds()).padStart(2, "0")
	].join("")}.${ext}`;
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not load photo"));
		img.src = src;
	});
}
async function composeStrip(shots) {
	const take = shots.slice(0, 4);
	if (take.length === 0) throw new Error("No photos to print");
	const images = await Promise.all(take.map((shot) => loadImage(shot.src)));
	const W = 420;
	const PAD = 28;
	const GAP = 14;
	const PHOTO_W = 364;
	const PHOTO_H = Math.round(PHOTO_W * (960 / 720));
	const H = PAD + take.length * PHOTO_H + (take.length - 1) * GAP + 96;
	const canvas = document.createElement("canvas");
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not compose strip");
	ctx.fillStyle = "#f3eee6";
	ctx.fillRect(0, 0, W, H);
	images.forEach((img, i) => {
		const y = PAD + i * 499;
		ctx.fillStyle = "#1c1916";
		ctx.fillRect(27, y - 1, 366, 487);
		ctx.drawImage(img, PAD, y, PHOTO_W, PHOTO_H);
	});
	ctx.fillStyle = "#1c1916";
	ctx.font = "600 28px Fraunces, Georgia, serif";
	ctx.textAlign = "center";
	ctx.fillText("FLASHBOX", W / 2, H - 48);
	ctx.font = "500 13px Figtree, system-ui, sans-serif";
	ctx.fillStyle = "#6f6860";
	const when = new Date(take[0].createdAt).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
	ctx.fillText(when, W / 2, H - 26);
	return canvas.toDataURL("image/jpeg", .92);
}
function playShutterClick() {
	try {
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		if (!AudioCtx) return;
		const ctx = new AudioCtx();
		const now = ctx.currentTime;
		const click = (time, freq, dur, gain) => {
			const osc = ctx.createOscillator();
			const g = ctx.createGain();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(freq, time);
			osc.frequency.exponentialRampToValueAtTime(freq * .4, time + dur);
			g.gain.setValueAtTime(gain, time);
			g.gain.exponentialRampToValueAtTime(1e-4, time + dur);
			osc.connect(g);
			g.connect(ctx.destination);
			osc.start(time);
			osc.stop(time + dur + .02);
		};
		click(now, 420, .045, .12);
		click(now + .055, 180, .07, .16);
		window.setTimeout(() => void ctx.close(), 400);
	} catch {}
}
/** Stylized studio sitter used when the webcam is unavailable. */
function drawDemoScene(ctx, w, h, t) {
	const cx = w / 2;
	const bob = Math.sin(t * 1.35) * (h * .006);
	const breath = 1 + Math.sin(t * 1.1) * .01;
	const bg = ctx.createLinearGradient(0, 0, 0, h);
	bg.addColorStop(0, "#261c16");
	bg.addColorStop(.5, "#17120f");
	bg.addColorStop(1, "#0e0b09");
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, w, h);
	const gelWarm = ctx.createRadialGradient(w * .12, h * .28, 0, w * .12, h * .28, w * .58);
	gelWarm.addColorStop(0, "rgba(140, 96, 68, 0.32)");
	gelWarm.addColorStop(1, "rgba(0,0,0,0)");
	ctx.fillStyle = gelWarm;
	ctx.fillRect(0, 0, w, h);
	const gelCool = ctx.createRadialGradient(w * .92, h * .18, 0, w * .92, h * .18, w * .5);
	gelCool.addColorStop(0, "rgba(72, 98, 104, 0.26)");
	gelCool.addColorStop(1, "rgba(0,0,0,0)");
	ctx.fillStyle = gelCool;
	ctx.fillRect(0, 0, w, h);
	for (const [ox, oy, or] of [
		[
			.16,
			.2,
			.045
		],
		[
			.84,
			.16,
			.055
		],
		[
			.1,
			.58,
			.032
		],
		[
			.9,
			.52,
			.04
		],
		[
			.74,
			.8,
			.028
		]
	]) {
		const pulse = 1 + Math.sin(t * .85 + ox * 10) * .1;
		const g = ctx.createRadialGradient(w * ox, h * oy, 0, w * ox, h * oy, w * or * pulse);
		g.addColorStop(0, "rgba(236, 220, 186, 0.28)");
		g.addColorStop(1, "rgba(236, 220, 186, 0)");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);
	}
	const spot = ctx.createRadialGradient(cx, h * .26, w * .04, cx, h * .42, w * .7);
	spot.addColorStop(0, "rgba(255, 232, 204, 0.2)");
	spot.addColorStop(.4, "rgba(255, 220, 180, 0.06)");
	spot.addColorStop(1, "rgba(0,0,0,0)");
	ctx.fillStyle = spot;
	ctx.fillRect(0, 0, w, h);
	ctx.save();
	ctx.translate(cx, h * .54 + bob);
	ctx.scale(breath, breath);
	ctx.fillStyle = "#2a3942";
	ctx.beginPath();
	ctx.ellipse(0, h * .3, w * .3, h * .24, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#1f2c33";
	ctx.beginPath();
	ctx.moveTo(-w * .09, h * .08);
	ctx.quadraticCurveTo(0, h * .2, w * .09, h * .08);
	ctx.lineTo(w * .07, h * .02);
	ctx.quadraticCurveTo(0, h * .08, -w * .07, h * .02);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#c4a07e";
	ctx.beginPath();
	ctx.roundRect(-w * .048, -h * .02, w * .096, h * .12, w * .04);
	ctx.fill();
	const headY = -h * .155;
	const headR = w * .148;
	ctx.fillStyle = "#c4a07e";
	ctx.beginPath();
	ctx.ellipse(-headR * .96, headY + headR * .12, headR * .18, headR * .26, .1, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(headR * .96, headY + headR * .12, headR * .18, headR * .26, -.1, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#d4b28c";
	ctx.beginPath();
	ctx.ellipse(0, headY, headR, headR * 1.14, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#2a2018";
	ctx.beginPath();
	ctx.ellipse(0, headY - headR * .42, headR * 1.08, headR * .78, 0, Math.PI * 1.08, -.08, true);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(-headR * .88, headY - headR * .02, headR * .3, headR * .58, .25, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(headR * .88, headY - headR * .02, headR * .3, headR * .58, -.25, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "rgba(186, 86, 74, 0.2)";
	ctx.beginPath();
	ctx.ellipse(-headR * .46, headY + headR * .28, headR * .22, headR * .12, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(headR * .46, headY + headR * .28, headR * .22, headR * .12, 0, 0, Math.PI * 2);
	ctx.fill();
	const blinkCycle = t % 4.4;
	const blink = blinkCycle > 4.15 ? Math.abs(Math.sin((blinkCycle - 4.15) / .25 * Math.PI)) : 0;
	const eyeH = Math.max(headR * .02, headR * .13 * (1 - blink * .94));
	ctx.fillStyle = "#1a1410";
	ctx.beginPath();
	ctx.ellipse(-headR * .33, headY, headR * .115, eyeH, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(headR * .33, headY, headR * .115, eyeH, 0, 0, Math.PI * 2);
	ctx.fill();
	if (blink < .55) {
		ctx.fillStyle = "rgba(255,255,255,0.55)";
		ctx.beginPath();
		ctx.ellipse(-headR * .28, headY - headR * .05, headR * .032, headR * .032, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(headR * .38, headY - headR * .05, headR * .032, headR * .032, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.strokeStyle = "#2a2018";
	ctx.lineWidth = Math.max(2, w * .0075);
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(-headR * .5, headY - headR * .24);
	ctx.quadraticCurveTo(-headR * .32, headY - headR * .32, -headR * .14, headY - headR * .23);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(headR * .5, headY - headR * .24);
	ctx.quadraticCurveTo(headR * .32, headY - headR * .32, headR * .14, headY - headR * .23);
	ctx.stroke();
	ctx.strokeStyle = "rgba(92, 58, 40, 0.5)";
	ctx.lineWidth = Math.max(1.5, w * .006);
	ctx.beginPath();
	ctx.moveTo(0, headY + headR * .04);
	ctx.lineTo(-headR * .055, headY + headR * .3);
	ctx.quadraticCurveTo(0, headY + headR * .36, headR * .08, headY + headR * .3);
	ctx.stroke();
	ctx.strokeStyle = "rgba(92, 48, 42, 0.75)";
	ctx.lineWidth = Math.max(2, w * .007);
	ctx.beginPath();
	ctx.arc(0, headY + headR * .4, headR * .3, .18, Math.PI - .18);
	ctx.stroke();
	ctx.restore();
	const vig = ctx.createRadialGradient(cx, h * .42, w * .18, cx, h * .5, w * .82);
	vig.addColorStop(0, "rgba(0,0,0,0)");
	vig.addColorStop(1, "rgba(0,0,0,0.5)");
	ctx.fillStyle = vig;
	ctx.fillRect(0, 0, w, h);
}
var KEY = "flashbox.shots.v1";
function isShot(value) {
	if (!value || typeof value !== "object") return false;
	const shot = value;
	return typeof shot.id === "string" && typeof shot.src === "string" && typeof shot.filter === "string" && typeof shot.createdAt === "number";
}
function loadShots() {
	if (typeof localStorage === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isShot).slice(0, 12);
	} catch {
		return [];
	}
}
function persistShots(shots) {
	const trimmed = shots.slice(0, 12);
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
function addShot(shots, next) {
	return persistShots([next, ...shots]);
}
function removeShot(shots, id) {
	return persistShots(shots.filter((shot) => shot.id !== id));
}
var COUNTDOWN_OPTIONS = [
	0,
	3,
	5
];
function PhotoBooth() {
	const camera = useCamera();
	const demoCanvasRef = (0, import_react.useRef)(null);
	const frozenRef = (0, import_react.useRef)(false);
	const [filterId, setFilterId] = (0, import_react.useState)("clear");
	const [countdownSec, setCountdownSec] = (0, import_react.useState)(3);
	const [counting, setCounting] = (0, import_react.useState)(null);
	const [flash, setFlash] = (0, import_react.useState)(false);
	const [shots, setShots] = (0, import_react.useState)([]);
	const [activeShot, setActiveShot] = (0, import_react.useState)(null);
	const [stripBusy, setStripBusy] = (0, import_react.useState)(false);
	const filter = getFilter(filterId);
	const streaming = camera.status === "live" || camera.status === "demo";
	const inCountdown = counting !== null;
	(0, import_react.useEffect)(() => {
		setShots(loadShots());
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		if (camera.status !== "demo") return;
		const canvas = demoCanvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = 720;
		canvas.height = 960;
		let raf = 0;
		const t0 = performance.now();
		drawDemoScene(ctx, canvas.width, canvas.height, 0);
		const loop = (now) => {
			if (!frozenRef.current) drawDemoScene(ctx, canvas.width, canvas.height, (now - t0) / 1e3);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [camera.status]);
	const snap = (0, import_react.useCallback)(() => {
		const source = camera.status === "live" && camera.videoRef.current ? {
			kind: "video",
			el: camera.videoRef.current
		} : camera.status === "demo" && demoCanvasRef.current ? {
			kind: "canvas",
			el: demoCanvasRef.current
		} : null;
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
			const shot = {
				id: crypto.randomUUID(),
				src,
				filter: filterId,
				createdAt: Date.now()
			};
			setShots((prev) => addShot(prev, shot));
		} else toast.error("Could not capture that frame.");
		window.setTimeout(() => {
			setFlash(false);
			frozenRef.current = false;
			if (source.kind === "video") source.el.play();
		}, 420);
	}, [
		camera.mirror,
		camera.status,
		camera.videoRef,
		filterId
	]);
	(0, import_react.useEffect)(() => {
		if (counting === null) return;
		if (counting <= 0) {
			setCounting(null);
			snap();
			return;
		}
		const id = window.setTimeout(() => {
			setCounting((c) => c === null ? null : c - 1);
		}, 1e3);
		return () => window.clearTimeout(id);
	}, [counting, snap]);
	const cancelCountdown = (0, import_react.useCallback)(() => setCounting(null), []);
	const handleShutter = (0, import_react.useCallback)(() => {
		if (inCountdown) {
			cancelCountdown();
			return;
		}
		if (!streaming) {
			if (camera.status === "unavailable") {
				camera.startDemo();
				return;
			}
			camera.start();
			return;
		}
		if (countdownSec === 0) {
			snap();
			return;
		}
		setCounting(countdownSec);
	}, [
		camera,
		cancelCountdown,
		countdownSec,
		inCountdown,
		snap,
		streaming
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") {
				if (activeShot) {
					setActiveShot(null);
					return;
				}
				if (inCountdown) cancelCountdown();
				return;
			}
			if (e.code !== "Space") return;
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
			e.preventDefault();
			handleShutter();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		activeShot,
		cancelCountdown,
		handleShutter,
		inCountdown
	]);
	const handleDownloadStrip = async () => {
		if (shots.length === 0) return;
		setStripBusy(true);
		try {
			downloadDataUrl(await composeStrip(shots), `flashbox-strip-${Date.now()}.jpg`);
			toast.success("Strip saved");
		} catch {
			toast.error("Could not print the strip.");
		} finally {
			setStripBusy(false);
		}
	};
	const shutterLabel = inCountdown ? "Cancel countdown" : streaming ? countdownSec === 0 ? "Take photo" : `Start ${countdownSec} second countdown` : "Open camera";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "film-grain",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-8 pt-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mb-5 flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-fg-subtle uppercase",
							children: "Photo booth"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-medium italic tracking-[-0.03em] text-fg sm:text-4xl",
							children: "Flashbox"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden max-w-[16rem] text-right text-xs leading-relaxed text-fg-muted sm:block",
							children: "Live preview, film looks, a countdown, and a strip of recent shots."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col gap-5 lg:flex-row lg:items-start lg:gap-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraStage, {
								videoRef: camera.videoRef,
								canvasRef: demoCanvasRef,
								status: camera.status,
								message: camera.message,
								filterCss: filter.css,
								vignette: filter.vignette,
								mirror: camera.mirror,
								counting,
								canFlip: camera.canFlip,
								onStart: () => void camera.start(),
								onDemo: camera.startDemo,
								onFlip: () => void camera.flip()
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "flex w-full flex-col gap-5 lg:w-72 lg:shrink-0 lg:pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShutterButton, {
											counting,
											disabled: camera.status === "requesting",
											label: shutterLabel,
											onClick: handleShutter
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-3.5" }), "Timer"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-1 rounded-full bg-bg-elevated p-1 shadow-[var(--shadow-border)]",
												children: COUNTDOWN_OPTIONS.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setCountdownSec(sec),
													className: cn("h-9 min-w-11 rounded-full px-2.5 text-sm font-medium tabular-nums transition-colors duration-[var(--motion-quick)]", countdownSec === sec ? "bg-paper text-ink" : "text-fg-muted hover:text-fg"),
													"aria-pressed": countdownSec === sec,
													children: sec === 0 ? "Off" : `${sec}s`
												}, sec))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-center text-xs text-fg-subtle",
											children: inCountdown ? "Press again to cancel." : "Space snaps. Escape cancels."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-[11px] font-medium tracking-[0.14em] text-fg-subtle uppercase",
									children: "Looks"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-2 lg:overflow-visible",
									children: FILTERS.map((item) => {
										const selected = item.id === filterId;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setFilterId(item.id),
											className: cn("flex min-h-11 min-w-[7.5rem] items-center gap-2.5 rounded-lg px-2.5 py-2 text-left", "transition-[background-color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", selected ? "bg-paper text-ink shadow-[var(--shadow-soft)]" : "bg-bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"),
											"aria-pressed": selected,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "filter-swatch size-7 shrink-0 rounded-full",
												style: { filter: item.css === "none" ? void 0 : item.css },
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-sm font-medium leading-none",
													children: item.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("mt-1 block truncate text-[11px]", selected ? "text-ink/55" : "text-fg-subtle"),
													children: item.hint
												})]
											})]
										}, item.id);
									})
								})] }),
								streaming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => camera.setMirror((m) => !m),
										"aria-pressed": camera.mirror,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipHorizontal, {}), camera.mirror ? "Mirrored" : "Unmirrored"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: camera.stop,
										children: "Close camera"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryStrip, {
							shots,
							onOpen: setActiveShot,
							onDownloadStrip: () => void handleDownloadStrip(),
							stripBusy
						})
					})
				]
			}),
			flash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flash-burst pointer-events-none fixed inset-0 z-40 bg-paper",
				"aria-hidden": true
			}),
			activeShot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotViewer, {
				shot: activeShot,
				filterLabel: getFilter(activeShot.filter).label,
				onClose: () => setActiveShot(null),
				onDownload: () => downloadDataUrl(activeShot.src, shotFilename(activeShot)),
				onDelete: () => {
					setShots((prev) => removeShot(prev, activeShot.id));
					setActiveShot(null);
				}
			})
		]
	});
}
function ShutterButton({ counting, disabled, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-label": label,
		disabled,
		onClick,
		className: cn("relative grid size-[5.5rem] place-items-center rounded-full", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg", "active:not-disabled:scale-[0.96] disabled:opacity-40"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-bg-subtle shadow-[var(--shadow-border)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-1.5 rounded-full bg-bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("absolute inset-3 grid place-items-center rounded-full bg-paper text-ink", counting !== null && "bg-ink text-paper"),
				children: counting !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl font-medium tabular-nums leading-none",
					children: counting
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-7 rounded-full border-[3px] border-ink/80" })
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoBooth, {});
}
//#endregion
export { Home as component };
