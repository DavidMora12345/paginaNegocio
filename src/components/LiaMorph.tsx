import { useEffect, useRef } from "react";

type RGB = { r: number; g: number; b: number };
type Point = { x: number; y: number };
type Particle = { seed: number; r: number };
type Edge = { a: number; b: number };
type ShapeName = "scatter" | "lia" | "heart";
type Seg = { from: ShapeName; to: ShapeName; t: number; form: number };

function parseCssColorToRgb(input: string): RGB | null {
  const s = input.trim();
  if (!s) return null;

  if (s.startsWith("#")) {
    const hex = s.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex.length === 6
          ? hex
          : null;
    if (!full) return null;
    const n = Number.parseInt(full, 16);
    if (Number.isNaN(n)) return null;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  const rgbMatch = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (rgbMatch) {
    return {
      r: Math.max(0, Math.min(255, Number(rgbMatch[1]))),
      g: Math.max(0, Math.min(255, Number(rgbMatch[2]))),
      b: Math.max(0, Math.min(255, Number(rgbMatch[3]))),
    };
  }

  return null;
}

function rgba(c: RGB, a: number) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  t = clamp01(t);
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function addSegmentPoints(points: Point[], edges: Edge[], a: Point, b: Point, count: number, skipFirst: boolean) {
  const c = Math.max(2, count);
  let prev = points.length - 1;

  for (let i = 0; i < c; i++) {
    if (skipFirst && i === 0) continue;

    const t = i / (c - 1);
    points.push({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
    const idx = points.length - 1;

    if (idx !== prev && prev >= 0) edges.push({ a: prev, b: idx });
    prev = idx;
  }
}

function buildLiaGeometry(w: number, h: number, targetN: number) {
  const points: Point[] = [];
  const edges: Edge[] = [];

  const cx = w * 0.58;
  const cy = h * 0.52;

  const H = Math.min(h * 0.70, w * 0.78);
  const letterW = H * 0.23;
  const gap = letterW * 0.48;

  const totalW = letterW * 3 + gap * 2;
  const x0 = cx - totalW / 2;
  const y0 = cy - H / 2;
  const y1 = cy + H / 2;

  const Lx = x0;
  const Ix = x0 + letterW + gap;
  const Ax = x0 + (letterW + gap) * 2;

  const L_top: Point = { x: Lx, y: y0 };
  const L_bot: Point = { x: Lx, y: y1 };
  const L_right: Point = { x: Lx + letterW, y: y1 };

  const I_top: Point = { x: Ix + letterW * 0.5, y: y0 };
  const I_bot: Point = { x: Ix + letterW * 0.5, y: y1 };

  const A_apex: Point = { x: Ax + letterW * 0.5, y: y0 };
  const A_bl: Point = { x: Ax, y: y1 };
  const A_br: Point = { x: Ax + letterW, y: y1 };

  const crossY = y0 + H * 0.58;
  const A_crossL: Point = { x: Ax + letterW * 0.28, y: crossY };
  const A_crossR: Point = { x: Ax + letterW * 0.72, y: crossY };

  const lenL = H + letterW;
  const lenI = H;
  const leg = Math.hypot(letterW * 0.5, H);
  const lenA = leg * 2 + (letterW * 0.44);
  const totalLen = lenL + lenI + lenA;

  const minSeg = 8;
  const alloc = (segLen: number) => Math.max(minSeg, Math.round((targetN * segLen) / totalLen));

  const nL1 = alloc(H);
  const nL2 = alloc(letterW);
  const nI = alloc(H);
  const nA1 = alloc(leg);
  const nA2 = alloc(leg);
  const nA3 = alloc(letterW * 0.44);

  points.push(L_top);
  addSegmentPoints(points, edges, L_top, L_bot, nL1, true);
  addSegmentPoints(points, edges, L_bot, L_right, nL2, true);

  points.push(I_top);
  addSegmentPoints(points, edges, I_top, I_bot, nI, true);

  points.push(A_bl);
  addSegmentPoints(points, edges, A_bl, A_apex, nA1, true);
  addSegmentPoints(points, edges, A_apex, A_br, nA2, true);

  points.push(A_crossL);
  addSegmentPoints(points, edges, A_crossL, A_crossR, nA3, true);

  const N = Math.max(190, Math.min(320, points.length));
  if (points.length > N) {
    const keep: Point[] = [];
    const map = new Int32Array(points.length).fill(-1);
    const step = points.length / N;

    for (let k = 0; k < N; k++) {
      const idx = Math.min(points.length - 1, Math.floor(k * step));
      map[idx] = keep.length;
      keep.push(points[idx]);
    }

    const newEdges: Edge[] = [];
    for (const e of edges) {
      const a = map[e.a];
      const b = map[e.b];
      if (a >= 0 && b >= 0 && a !== b) newEdges.push({ a, b });
    }

    return { points: keep, edges: newEdges };
  }

  return { points, edges };
}

function heartRaw(t: number) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x, y };
}

function resampleClosedPath(path: Point[], outN: number) {
  const n = path.length;
  const d: number[] = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const a = path[i];
    const b = path[(i + 1) % n];
    d[i + 1] = d[i] + Math.hypot(b.x - a.x, b.y - a.y);
  }
  const perim = d[n] || 1;

  const out: Point[] = [];
  for (let k = 0; k < outN; k++) {
    const target = (k / outN) * perim;

    let lo = 0;
    let hi = n;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (d[mid] < target) lo = mid + 1;
      else hi = mid;
    }
    const i = Math.max(0, lo - 1);
    const segStart = path[i];
    const segEnd = path[(i + 1) % n];
    const segLen = (d[i + 1] - d[i]) || 1;
    const t = (target - d[i]) / segLen;

    out.push({ x: lerp(segStart.x, segEnd.x, t), y: lerp(segStart.y, segEnd.y, t) });
  }
  return out;
}

function buildHeartGeometry(N: number, w: number, h: number) {
  const cx = w * 0.58;
  const cy = h * 0.52;
  const s = Math.min(w, h) * 0.23;

  const outlineCount = Math.max(120, Math.floor(N * 0.72));
  const insideCount = Math.max(0, N - outlineCount);

  const raw: Point[] = [];
  const rawN = 240;
  for (let i = 0; i < rawN; i++) {
    const t = (i / rawN) * Math.PI * 2;
    const p = heartRaw(t);
    raw.push({ x: p.x, y: -p.y });
  }

  let maxAbs = 1;
  for (const p of raw) {
    maxAbs = Math.max(maxAbs, Math.abs(p.x), Math.abs(p.y));
  }
  const scaled = raw.map((p) => ({ x: cx + (p.x / maxAbs) * s, y: cy + (p.y / maxAbs) * s }));
  const outline = resampleClosedPath(scaled, outlineCount);

  const points: Point[] = [];
  const edges: Edge[] = [];

  for (let i = 0; i < outline.length; i++) points.push(outline[i]);
  for (let i = 0; i < outline.length; i++) edges.push({ a: i, b: (i + 1) % outline.length });

  for (let i = 0; i < insideCount; i++) {
    const t = Math.random() * Math.PI * 2;
    const p = heartRaw(t);

    const fill = Math.pow(Math.random(), 0.78);
    const nx = (p.x / 18) * fill;
    const ny = (-p.y / 18) * fill;

    const jitter = s * 0.010;
    points.push({
      x: cx + nx * s + (Math.random() - 0.5) * jitter,
      y: cy + ny * s + (Math.random() - 0.5) * jitter,
    });
  }

  return { points, edges };
}

function buildRandomEdges(n: number, edgeCount: number) {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  const cap = Math.max(1, Math.min(edgeCount, Math.floor((n * (n - 1)) / 2)));

  while (edges.length < cap) {
    const a0 = (Math.random() * n) | 0;
    let b0 = (Math.random() * n) | 0;
    if (b0 === a0) b0 = (b0 + 1) % n;

    const a = Math.min(a0, b0);
    const b = Math.max(a0, b0);

    const key = `${a}-${b}`;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push({ a, b });
  }

  return edges;
}

export default function LiaMorph() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const lastDrawRef = useRef(0);

  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  const scatterRef = useRef<Point[]>([]);
  const liaRef = useRef<Point[]>([]);
  const heartRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const randEdgesRef = useRef<Edge[]>([]);
  const liaEdgesRef = useRef<Edge[]>([]);
  const heartEdgesRef = useRef<Edge[]>([]);
  const posXRef = useRef<Float32Array | null>(null);
  const posYRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const styles = getComputedStyle(document.documentElement);
    const navy = parseCssColorToRgb(styles.getPropertyValue("--navy")) ?? { r: 8, g: 25, b: 56 };
    const orangeStrong =
      parseCssColorToRgb(styles.getPropertyValue("--orange-2")) ??
      parseCssColorToRgb(styles.getPropertyValue("--orange")) ??
      { r: 255, g: 80, b: 0 };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FPS = 30;
    const CYCLE_MS = 14000;

    const LIA_IN_END = 0.36;
    const LIA_HOLD_END = 0.56;
    const HEART_IN_END = 0.86;
    const HEART_HOLD_END = 0.95;

    const buildAll = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      sizeRef.current = { w, h, dpr };

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetByArea = Math.floor((w * h) / 1650);
      const targetN = Math.max(200, Math.min(300, targetByArea));

      const liaGeo = buildLiaGeometry(w, h, targetN);
      const N = liaGeo.points.length;

      liaRef.current = liaGeo.points;
      liaEdgesRef.current = liaGeo.edges;

      const heartGeo = buildHeartGeometry(N, w, h);
      heartRef.current = heartGeo.points;
      heartEdgesRef.current = heartGeo.edges;

      const scatter: Point[] = [];
      for (let i = 0; i < N; i++) scatter.push({ x: Math.random() * w, y: Math.random() * h });
      scatterRef.current = scatter;

      const particles: Particle[] = [];
      for (let i = 0; i < N; i++) {
        particles.push({
          seed: Math.random() * 1000,
          r: 1.25 + Math.random() * 0.85,
        });
      }
      particlesRef.current = particles;

      randEdgesRef.current = buildRandomEdges(N, Math.floor(N * 1.2));

      posXRef.current = new Float32Array(N);
      posYRef.current = new Float32Array(N);
    };

    const getSegment = (p: number): Seg => {
      if (p < LIA_IN_END) {
        const t = easeInOut(p / LIA_IN_END);
        return { from: "scatter", to: "lia", t, form: t };
      }
      if (p < LIA_HOLD_END) {
        return { from: "lia", to: "lia", t: 1, form: 1 };
      }
      if (p < HEART_IN_END) {
        const t = easeInOut((p - LIA_HOLD_END) / (HEART_IN_END - LIA_HOLD_END));
        return { from: "lia", to: "heart", t, form: 1 };
      }
      if (p < HEART_HOLD_END) {
        return { from: "heart", to: "heart", t: 1, form: 1 };
      }
      const t = easeInOut((p - HEART_HOLD_END) / (1 - HEART_HOLD_END));
      return { from: "heart", to: "scatter", t, form: 1 - t };
    };

    const draw = (now: number) => {
      const { w, h } = sizeRef.current;
      const scatter = scatterRef.current;
      const lia = liaRef.current;
      const heart = heartRef.current;
      const P = particlesRef.current;
      const randEdges = randEdgesRef.current;
      const liaEdges = liaEdgesRef.current;
      const heartEdges = heartEdgesRef.current;
      const posX = posXRef.current;
      const posY = posYRef.current;

      if (!w || !h || !P.length || !posX || !posY) return;

      const p = ((now % CYCLE_MS) / CYCLE_MS) % 1;
      const seg = getSegment(p);

      const getPoints = (name: ShapeName) => {
        if (name === "scatter") return scatter;
        if (name === "lia") return lia;
        return heart;
      };

      const A = getPoints(seg.from);
      const B = getPoints(seg.to);

      const isScatterToLia = seg.from === "scatter" && seg.to === "lia";
      const isLiaHold = seg.from === "lia" && seg.to === "lia";
      const isLiaToHeart = seg.from === "lia" && seg.to === "heart";
      const isHeartHold = seg.from === "heart" && seg.to === "heart";
      const isHeartToScatter = seg.from === "heart" && seg.to === "scatter";

      let liaAlpha = 0;
      if (isScatterToLia) liaAlpha = lerp(0, 1, seg.t);
      else if (isLiaHold) liaAlpha = 1;
      else if (isLiaToHeart) liaAlpha = lerp(1, 0, seg.t);

      let heartAlpha = 0;
      if (isLiaToHeart) heartAlpha = lerp(0, 1, seg.t);
      else if (isHeartHold) heartAlpha = 1;
      else if (isHeartToScatter) heartAlpha = lerp(1, 0, seg.t);

      ctx.clearRect(0, 0, w, h);

      const wobbleScatter = Math.min(w, h) * 0.030;
      const wobbleForm = Math.min(w, h) * 0.0018;
      const wobble = lerp(wobbleScatter, wobbleForm, seg.form);

      for (let i = 0; i < P.length; i++) {
        const a = A[i];
        const b = B[i];
        const s = P[i].seed;

        let x = lerp(a.x, b.x, seg.t) + Math.sin(now * 0.00033 + s) * wobble;
        let y = lerp(a.y, b.y, seg.t) + Math.cos(now * 0.00029 + s * 1.07) * wobble;

        if (seg.from === "scatter" || seg.to === "scatter") {
          if (x < -20) x = w + 20;
          if (x > w + 20) x = -20;
          if (y < -20) y = h + 20;
          if (y > h + 20) y = -20;
        }

        posX[i] = x;
        posY[i] = y;
      }

      const distScatter = Math.min(w, h) * 0.64;
      const distForm = Math.min(w, h) * 0.26;
      const maxDist = lerp(distScatter, distForm, seg.form);
      const maxDist2 = maxDist * maxDist;

      ctx.lineCap = "round";

      const randBase = lerp(0.42, 0.22, seg.form);
      ctx.strokeStyle = rgba(orangeStrong, 1);
      ctx.lineWidth = 1;

      for (let i = 0; i < randEdges.length; i++) {
        const e = randEdges[i];
        const ax = posX[e.a];
        const ay = posY[e.a];
        const bx = posX[e.b];
        const by = posY[e.b];

        const dx = ax - bx;
        const dy = ay - by;
        const d2 = dx * dx + dy * dy;
        if (d2 > maxDist2) continue;

        const a = (1 - d2 / maxDist2) * 0.9;
        ctx.globalAlpha = randBase * a;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      if (liaAlpha > 0.02) {
        ctx.globalAlpha = liaAlpha;
        ctx.strokeStyle = rgba(orangeStrong, 1);
        ctx.lineWidth = 2;

        for (let i = 0; i < liaEdges.length; i++) {
          const e = liaEdges[i];
          const ax = posX[e.a];
          const ay = posY[e.a];
          const bx = posX[e.b];
          const by = posY[e.b];

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      if (heartAlpha > 0.02) {
        ctx.globalAlpha = heartAlpha;
        ctx.strokeStyle = rgba(orangeStrong, 1);
        ctx.lineWidth = 2;

        for (let i = 0; i < heartEdges.length; i++) {
          const e = heartEdges[i];
          const ax = posX[e.a];
          const ay = posY[e.a];
          const bx = posX[e.b];
          const by = posY[e.b];

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = rgba(navy, 0.95);

      const boost = Math.max(liaAlpha, heartAlpha);
      const rBoost = lerp(0.0, 0.25, boost);

      ctx.beginPath();
      for (let i = 0; i < P.length; i++) {
        const x = posX[i];
        const y = posY[i];
        const r = P[i].r + rBoost;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const loop = (now: number) => {
      if (!runningRef.current) return;

      const minDt = 1000 / FPS;
      if (now - lastDrawRef.current >= minDt) {
        lastDrawRef.current = now;
        draw(now);
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      lastDrawRef.current = 0;
      rafRef.current = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      runningRef.current = false;
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    buildAll();

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      if (resizeRaf) return;
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = 0;
        buildAll();
      });
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0.1 }
    );
    io.observe(wrap);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      if (resizeRaf) window.cancelAnimationFrame(resizeRaf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full min-h-[260px]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
