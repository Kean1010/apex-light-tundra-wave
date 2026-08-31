import { useCallback, useEffect, useRef, useState } from "react";

export type CameraStatus =
  | "idle"
  | "requesting"
  | "live"
  | "demo"
  | "denied"
  | "unavailable"
  | "error";

export type Facing = "user" | "environment";

function classifyError(err: unknown): { status: CameraStatus; message: string } {
  const name = err instanceof DOMException ? err.name : "";
  const message = err instanceof Error ? err.message : "Camera failed to start.";

  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return {
      status: "denied",
      message: "Camera access is blocked. Allow it in the browser, or try the studio demo.",
    };
  }
  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return {
      status: "unavailable",
      message: "No camera was found on this device. You can still shoot in studio demo.",
    };
  }
  if (name === "NotReadableError" || name === "TrackStartError") {
    return {
      status: "error",
      message: "The camera is already in use by another app. Close it and try again.",
    };
  }
  if (name === "OverconstrainedError" || name === "ConstraintNotSatisfiedError") {
    return {
      status: "error",
      message: "This camera does not support the requested view. Try flipping or the demo.",
    };
  }
  if (name === "SecurityError") {
    return {
      status: "unavailable",
      message: "This page cannot use the camera in the current context.",
    };
  }
  return { status: "error", message };
}

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [facing, setFacing] = useState<Facing>("user");
  const [deviceCount, setDeviceCount] = useState(0);
  const [mirror, setMirror] = useState(true);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      setDeviceCount(all.filter((d) => d.kind === "videoinput").length);
    } catch {
      /* labels may be empty before permission */
    }
  }, []);

  const attachStream = useCallback(async (stream: MediaStream) => {
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

  const start = useCallback(
    async (nextFacing: Facing = facing) => {
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

      const attempts: MediaStreamConstraints[] = [
        {
          audio: false,
          video: {
            facingMode: { ideal: nextFacing },
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
        },
        { audio: false, video: { facingMode: nextFacing } },
        { audio: false, video: true },
      ];

      let lastError: unknown;
      for (const constraints of attempts) {
        try {
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
      }

      const classified = classifyError(lastError);
      setStatus(classified.status);
      setMessage(classified.message);
    },
    [attachStream, facing, stopStream],
  );

  const startDemo = useCallback(() => {
    stopStream();
    setStatus("demo");
    setMirror(true);
    setMessage(null);
  }, [stopStream]);

  const stop = useCallback(() => {
    stopStream();
    setStatus("idle");
    setMessage(null);
  }, [stopStream]);

  const flip = useCallback(async () => {
    const next: Facing = facing === "user" ? "environment" : "user";
    await start(next);
  }, [facing, start]);

  useEffect(() => {
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
    flip,
  };
}
