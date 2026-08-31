/** Stylized studio sitter used when the webcam is unavailable. */
export function drawDemoScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const cx = w / 2;
  const bob = Math.sin(t * 1.35) * (h * 0.006);
  const breath = 1 + Math.sin(t * 1.1) * 0.01;

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#261c16");
  bg.addColorStop(0.5, "#17120f");
  bg.addColorStop(1, "#0e0b09");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const gelWarm = ctx.createRadialGradient(
    w * 0.12,
    h * 0.28,
    0,
    w * 0.12,
    h * 0.28,
    w * 0.58,
  );
  gelWarm.addColorStop(0, "rgba(140, 96, 68, 0.32)");
  gelWarm.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gelWarm;
  ctx.fillRect(0, 0, w, h);

  const gelCool = ctx.createRadialGradient(
    w * 0.92,
    h * 0.18,
    0,
    w * 0.92,
    h * 0.18,
    w * 0.5,
  );
  gelCool.addColorStop(0, "rgba(72, 98, 104, 0.26)");
  gelCool.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gelCool;
  ctx.fillRect(0, 0, w, h);

  const orbs: Array<[number, number, number]> = [
    [0.16, 0.2, 0.045],
    [0.84, 0.16, 0.055],
    [0.1, 0.58, 0.032],
    [0.9, 0.52, 0.04],
    [0.74, 0.8, 0.028],
  ];
  for (const [ox, oy, or] of orbs) {
    const pulse = 1 + Math.sin(t * 0.85 + ox * 10) * 0.1;
    const g = ctx.createRadialGradient(
      w * ox,
      h * oy,
      0,
      w * ox,
      h * oy,
      w * or * pulse,
    );
    g.addColorStop(0, "rgba(236, 220, 186, 0.28)");
    g.addColorStop(1, "rgba(236, 220, 186, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  const spot = ctx.createRadialGradient(
    cx,
    h * 0.26,
    w * 0.04,
    cx,
    h * 0.42,
    w * 0.7,
  );
  spot.addColorStop(0, "rgba(255, 232, 204, 0.2)");
  spot.addColorStop(0.4, "rgba(255, 220, 180, 0.06)");
  spot.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(cx, h * 0.54 + bob);
  ctx.scale(breath, breath);

  ctx.fillStyle = "#2a3942";
  ctx.beginPath();
  ctx.ellipse(0, h * 0.3, w * 0.3, h * 0.24, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1f2c33";
  ctx.beginPath();
  ctx.moveTo(-w * 0.09, h * 0.08);
  ctx.quadraticCurveTo(0, h * 0.2, w * 0.09, h * 0.08);
  ctx.lineTo(w * 0.07, h * 0.02);
  ctx.quadraticCurveTo(0, h * 0.08, -w * 0.07, h * 0.02);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#c4a07e";
  ctx.beginPath();
  ctx.roundRect(-w * 0.048, -h * 0.02, w * 0.096, h * 0.12, w * 0.04);
  ctx.fill();

  const headY = -h * 0.155;
  const headR = w * 0.148;

  ctx.fillStyle = "#c4a07e";
  ctx.beginPath();
  ctx.ellipse(-headR * 0.96, headY + headR * 0.12, headR * 0.18, headR * 0.26, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(headR * 0.96, headY + headR * 0.12, headR * 0.18, headR * 0.26, -0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d4b28c";
  ctx.beginPath();
  ctx.ellipse(0, headY, headR, headR * 1.14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#2a2018";
  ctx.beginPath();
  ctx.ellipse(0, headY - headR * 0.42, headR * 1.08, headR * 0.78, 0, Math.PI * 1.08, -0.08, true);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-headR * 0.88, headY - headR * 0.02, headR * 0.3, headR * 0.58, 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(headR * 0.88, headY - headR * 0.02, headR * 0.3, headR * 0.58, -0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(186, 86, 74, 0.2)";
  ctx.beginPath();
  ctx.ellipse(-headR * 0.46, headY + headR * 0.28, headR * 0.22, headR * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(headR * 0.46, headY + headR * 0.28, headR * 0.22, headR * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  const blinkCycle = t % 4.4;
  const blink =
    blinkCycle > 4.15
      ? Math.abs(Math.sin(((blinkCycle - 4.15) / 0.25) * Math.PI))
      : 0;
  const eyeH = Math.max(headR * 0.02, headR * 0.13 * (1 - blink * 0.94));

  ctx.fillStyle = "#1a1410";
  ctx.beginPath();
  ctx.ellipse(-headR * 0.33, headY, headR * 0.115, eyeH, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(headR * 0.33, headY, headR * 0.115, eyeH, 0, 0, Math.PI * 2);
  ctx.fill();

  if (blink < 0.55) {
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.ellipse(-headR * 0.28, headY - headR * 0.05, headR * 0.032, headR * 0.032, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(headR * 0.38, headY - headR * 0.05, headR * 0.032, headR * 0.032, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "#2a2018";
  ctx.lineWidth = Math.max(2, w * 0.0075);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-headR * 0.5, headY - headR * 0.24);
  ctx.quadraticCurveTo(-headR * 0.32, headY - headR * 0.32, -headR * 0.14, headY - headR * 0.23);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(headR * 0.5, headY - headR * 0.24);
  ctx.quadraticCurveTo(headR * 0.32, headY - headR * 0.32, headR * 0.14, headY - headR * 0.23);
  ctx.stroke();

  ctx.strokeStyle = "rgba(92, 58, 40, 0.5)";
  ctx.lineWidth = Math.max(1.5, w * 0.006);
  ctx.beginPath();
  ctx.moveTo(0, headY + headR * 0.04);
  ctx.lineTo(-headR * 0.055, headY + headR * 0.3);
  ctx.quadraticCurveTo(0, headY + headR * 0.36, headR * 0.08, headY + headR * 0.3);
  ctx.stroke();

  ctx.strokeStyle = "rgba(92, 48, 42, 0.75)";
  ctx.lineWidth = Math.max(2, w * 0.007);
  ctx.beginPath();
  ctx.arc(0, headY + headR * 0.4, headR * 0.3, 0.18, Math.PI - 0.18);
  ctx.stroke();

  ctx.restore();

  const vig = ctx.createRadialGradient(cx, h * 0.42, w * 0.18, cx, h * 0.5, w * 0.82);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}
