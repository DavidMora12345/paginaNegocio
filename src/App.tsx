import type React from "react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import LiaMorph from "./components/LiaMorph";

type CursorVariant = "default" | "link";

const WHATSAPP_NUMBER_E164 = "593979395224";
const WHATSAPP_NUMBER_DISPLAY = "+593 0979395224";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

const WHATSAPP_NUMBER2_E164 = "593969050140";
const WHATSAPP_NUMBER2_DISPLAY = "+593 0969050140";
const WHATSAPP_LINK2 = `https://wa.me/${WHATSAPP_NUMBER2_E164}`;

function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function CheckItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 shadow-sm hover-card-effect">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--orange)]">
        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">
        <span className="font-semibold text-[var(--navy)]">{title}</span> {text}
      </div>
    </div>
  );
}

function IndustryIcon({ kind }: { kind: "home" | "medical" | "restaurant" | "tools" | "education" | "shop" }) {
  const common = "h-5 w-5 text-[var(--navy)]";
  if (kind === "home") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z"
        />
      </svg>
    );
  }
  if (kind === "medical") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12h10M12 7v10" opacity="0.35" />
      </svg>
    );
  }
  if (kind === "restaurant") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 3v8a3 3 0 0 1-3 3H4V3" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M11 3v8" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 3v6a3 3 0 0 0 3 3h1v9" />
      </svg>
    );
  }
  if (kind === "tools") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2-2 2.2-2.2z"
        />
      </svg>
    );
  }
  if (kind === "education") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3l10 5-10 5L2 8l10-5z" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 10v6c0 1.7 2.7 3 6 3s6-1.3 6-3v-6" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 7h15l-1.5 9h-12L6 7z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 7l-2-3H1" />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      />
    </svg>
  );
}

function IndustryCard({
  title,
  points,
  icon,
}: {
  title: string;
  points: string[];
  icon: "home" | "medical" | "restaurant" | "tools" | "education" | "shop";
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 shadow-sm hover-card-effect">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl border border-[var(--border)] bg-white shadow-sm flex items-center justify-center">
            <IndustryIcon kind={icon} />
          </div>
          <p className="text-sm font-semibold text-[var(--navy)]">{title}</p>
        </div>
        <span className="text-[11px] text-slate-500">casos típicos</span>
      </div>
      <div className="mt-3 grid gap-2 text-[12px] text-slate-700">
        {points.map((p) => (
          <div key={p} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
            <span className="leading-relaxed">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type RGB = { r: number; g: number; b: number };

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

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function NodeMeshBackground() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<NodePoint[]>([]);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const root = document.documentElement;
    const styles = getComputedStyle(root);

    const navyRaw = styles.getPropertyValue("--navy").trim();
    const orangeRaw = styles.getPropertyValue("--orange").trim();

    const navy = parseCssColorToRgb(navyRaw) ?? { r: 8, g: 25, b: 56 };
    const orange = parseCssColorToRgb(orangeRaw) ?? { r: 255, g: 122, b: 31 };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = 30000;
      const count = Math.max(70, Math.min(150, Math.floor((w * h) / density)));
      const pts: NodePoint[] = [];

      for (let i = 0; i < count; i++) {
        const speed = 0.03 + Math.random() * 0.045;
        const angle = Math.random() * Math.PI * 2;
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.2 + Math.random() * 0.8,
        });
      }

      pointsRef.current = pts;
    };

    const draw = () => {
      const { w, h } = sizeRef.current;
      const pts = pointsRef.current;

      ctx.clearRect(0, 0, w, h);

      const maxDist = Math.min(190, Math.max(140, Math.floor(Math.sqrt(w * h) / 5.4)));

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxDist * maxDist) continue;

          const d = Math.sqrt(d2);
          let alpha = (1 - d / maxDist) * 0.24;
          ctx.strokeStyle = rgba(orange, Math.max(0, Math.min(0.62, alpha)));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of pts) {
        let alpha = 0.78;
        ctx.fillStyle = rgba(navy, alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      rafRef.current = window.requestAnimationFrame(loop);
    };

    setup();
    loop();

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-[0.67]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 10%, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.20) 30%, rgba(255,255,255,0.58) 66%, rgba(255,255,255,0.84) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 12%, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.32) 56%, rgba(255,255,255,0.72) 100%)",
        }}
      />
    </div>
  );
}

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMsg, setLeadMsg] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasFinePointer(mq.matches);

    const handleChange = (event: Event) => {
      const mql = event.currentTarget as MediaQueryList;
      setHasFinePointer(mql.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    let raf = 0;

    const handleMove = (event: MouseEvent) => {
      if (raf) return;

      const x = event.clientX;
      const y = event.clientY;

      raf = window.requestAnimationFrame(() => {
        setCursorPos({ x, y });
        raf = 0;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [hasFinePointer]);

  const cursorSize = cursorVariant === "default" ? 20 : 34;

  const cursorStyle: CSSProperties = {
    width: cursorSize,
    height: cursorSize,
    transform: `translate3d(${cursorPos.x - cursorSize / 2}px, ${cursorPos.y - cursorSize / 2}px, 0)`,
    transition: "transform 0.11s ease-out, width 0.11s ease-out, height 0.11s ease-out",
  };

  const heroReveal = useScrollReveal();
  const softwareReveal = useScrollReveal();
  const industriesReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const onInteractiveEnter = () => {
    if (hasFinePointer) setCursorVariant("link");
  };
  const onInteractiveLeave = () => {
    if (hasFinePointer) setCursorVariant("default");
  };

  const revealClasses = (isVisible: boolean) =>
    `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const liaBenefits = useMemo(
    () => [
      { title: "Responde al instante:", text: "no se te van clientes por “ya te respondo”." },
      { title: "Califica al interesado:", text: "pregunta lo justo para saber si es cliente real." },
      { title: "Deja todo ordenado:", text: "toma datos y contexto para que tú solo cierres." },
      { title: "Agenda y confirma:", text: "si hay cita, la deja encaminada y sin ida y vuelta." },
    ],
    []
  );

  const industries = useMemo(
    () => [
      {
        title: "Inmobiliarias",
        icon: "home" as const,
        points: ["Responde por propiedades", "Filtra interesados reales", "Agenda visitas y recorridos"],
      },
      {
        title: "Centros médicos",
        icon: "medical" as const,
        points: ["Agenda citas", "Confirma horarios", "Responde preguntas frecuentes"],
      },
      {
        title: "Restaurantes",
        icon: "restaurant" as const,
        points: ["Toma reservas", "Horarios y ubicación", "Menú y consultas rápidas"],
      },
      {
        title: "Servicios técnicos",
        icon: "tools" as const,
        points: ["Recibe pedidos", "Prioriza urgencias", "Coordina visitas y horarios"],
      },
      {
        title: "Educación",
        icon: "education" as const,
        points: ["Información de cursos", "Inscripciones", "Horarios y requisitos"],
      },
      {
        title: "Tiendas",
        icon: "shop" as const,
        points: ["Estado de pedidos", "Cambios y devoluciones", "Soporte post-venta"],
      },
    ],
    []
  );

  const openWhatsAppWithLead = (targetLink: string) => {
    const text = [
      "Hola 👋, quiero implementar LIA para vender más por WhatsApp.",
      leadName ? `Nombre: ${leadName}` : null,
      leadEmail ? `Email: ${leadEmail}` : null,
      leadMsg ? `Mensaje: ${leadMsg}` : null,
      "Interés: LIA (recepcionista) - demo y propuesta",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `${targetLink}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppWithLead(WHATSAPP_LINK);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden font-sans text-slate-900 ${hasFinePointer ? "cursor-none" : "cursor-auto"
        } bg-[var(--bg)]`}
    >
      <style>{`
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        .hover-card-effect {
          transition: all 0.25s ease;
        }
        .hover-card-effect:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 32px rgba(0,0,0,0.10);
          border-color: var(--orange);
        }
      `}</style>

      <NodeMeshBackground />

      {hasFinePointer && (
        <div
          className={`pointer-events-none fixed z-[9999] rounded-full border-2 ${cursorVariant === "default"
            ? "border-[var(--orange)] bg-[var(--orange)]"
            : "border-[var(--navy)] bg-[var(--navy)]"
            }`}
          style={cursorStyle}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <header className="sticky top-4 z-20 mb-6">
          <div className="rounded-2xl border border-[var(--border)] bg-white shadow-sm">
            <nav className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white border border-[var(--border)] shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="J&D" className="h-8 w-8 object-contain" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-[var(--navy)]">J&amp;D Ingeniería y Consultoría</span>
                  <span className="text-xs text-slate-600">Agentes IA</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 text-xs font-medium">
                {[
                  { href: "#software", label: "Agente LIA" },
                  { href: "#industrias", label: "Industrias" },
                  { href: "#contact", label: "Contacto" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="text-slate-700 hover:text-[var(--navy)] tracking-wide transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                onMouseEnter={onInteractiveEnter}
                onMouseLeave={onInteractiveLeave}
                className="hidden md:inline-flex text-xs px-4 py-2 rounded-full text-white font-semibold shadow-md transition-colors bg-[var(--orange)] hover:bg-[var(--orange-2)]"
              >
                Quiero una demo para vender más
              </a>
            </nav>
          </div>
        </header>

        <main className="pb-24">
          <section id="hero" className="pt-4 md:pt-8">
            <div
              ref={heroReveal.ref}
              className={`${revealClasses(heroReveal.isVisible)} md:flex md:items-center md:justify-between md:gap-10`}
            >
              <div className="max-w-3xl space-y-6">
                <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] text-white bg-[var(--navy)] px-4 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                  NO PIERDAS VENTAS · WHATSAPP 24/7
                </p>

                <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] text-[var(--navy)]">
                  No pierdas más ventas por responder tarde.{" "}
                  <span className="text-[var(--orange)]">LIA atiende</span> y te deja{" "}
                  <span className="text-[var(--orange)]">listo para cerrar</span> por WhatsApp 24/7.
                </h1>

                <div className="space-y-3 max-w-xl">
                  <p className="text-base md:text-lg text-slate-700">
                    Mientras tú trabajas (o duermes), LIA responde, hace preguntas simples y ordena todo para que tu equipo
                    solo entre a cerrar o confirmar.
                  </p>
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    Ideal para negocios en Cuenca, Guayaquil y todo Ecuador que reciben chats a cada rato.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center justify-center gap-2 rounded-full text-white shadow-lg transition-colors bg-[var(--orange)] hover:bg-[var(--orange-2)] px-6 py-3 text-sm font-semibold"
                  >
                    Quiero recuperar ventas ↗
                  </a>

                  <a
                    href="#software"
                    onClick={(e) => handleNavClick(e, "#software")}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)] bg-white px-6 py-3 text-sm font-semibold text-[var(--navy)] shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                  >
                    Ver cómo trabaja LIA
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                    Respuesta inmediata
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--navy)]" />
                    Citas y leads ordenados
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                    Tu equipo cierra más rápido
                  </span>
                </div>
              </div>

              <div className="mt-10 md:mt-0 w-full md:w-[520px] flex items-center justify-center md:justify-end">
                <div className="w-full max-w-[520px] aspect-square">
                  <div className="h-full w-full rounded-3xl bg-white border border-[var(--border)] shadow-md flex items-center justify-center">
                    <img src="/logo.png" alt="J&D" className="w-[72%] h-[72%] object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="software" className="mt-20 md:mt-24">
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-y border-[var(--border)]">
              <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <div ref={softwareReveal.ref} className={revealClasses(softwareReveal.isVisible)}>
                  <div className="space-y-5">
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy)]">
                          LIA, la recepcionista que te cuida las ventas.
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-slate-700 max-w-2xl">
                          Cuando alguien escribe, LIA responde al momento y guía la conversación. Y lo más importante:
                          te deja la conversación “ordenada” para que tú o tu equipo solo entren a cerrar.
                        </p>
                      </div>

                      <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact")}
                        onMouseEnter={onInteractiveEnter}
                        onMouseLeave={onInteractiveLeave}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)] bg-white px-4 py-2 text-xs font-semibold text-[var(--navy)] shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                      >
                        Quiero una demo ↗
                      </a>
                    </div>

                    <div className="rounded-3xl border border-[var(--border)] bg-white shadow-sm">
                      <div className="rounded-3xl p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                              En simple: LIA atiende primero, hace preguntas claras y registra lo importante.
                              Si ya toca que entre una persona, te pasa el caso “listo para rematar”.
                            </p>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {liaBenefits.map((b) => (
                                <CheckItem key={b.title} title={b.title} text={b.text} />
                              ))}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-[var(--border)] bg-white p-5 md:p-6 overflow-hidden min-h-[320px] md:min-h-[360px]">
                            <LiaMorph />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="px-3 py-1 rounded-full border border-[var(--orange)] bg-white text-[var(--orange)]">
                        Enfocado en ventas: respuesta rápida + seguimiento.
                      </span>
                      <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-white text-slate-700">
                        Útil si recibes muchos mensajes al día.
                      </span>
                      <span className="px-3 py-1 rounded-full border border-[var(--navy)] bg-white text-[var(--navy)]">
                        Suena humano, trabaja en serio.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="industrias" className="mt-20 md:mt-24">
            <div ref={industriesReveal.ref} className={revealClasses(industriesReveal.isVisible)}>
              <div className="rounded-3xl border border-[var(--border)] bg-white shadow-sm">
                <div className="rounded-3xl p-6 md:p-8">
                  <div className="flex items-end justify-between gap-6 flex-wrap">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy)]">
                        Industrias donde LIA te ayuda a cerrar más.
                      </h2>
                      <p className="mt-2 text-sm md:text-base text-slate-700 max-w-2xl">
                        Si tu negocio vive de WhatsApp, LIA te ayuda a no perder chats y a convertirlos en citas, pedidos o
                        prospectos listos.
                      </p>
                    </div>

                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, "#contact")}
                      onMouseEnter={onInteractiveEnter}
                      onMouseLeave={onInteractiveLeave}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)] bg-white px-4 py-2 text-xs font-semibold text-[var(--navy)] shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                    >
                      Ver si aplica a mi negocio ↗
                    </a>
                  </div>

                  <div className="mt-6 grid md:grid-cols-3 gap-4">
                    {industries.map((i) => (
                      <IndustryCard key={i.title} title={i.title} points={i.points} icon={i.icon} />
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-white text-slate-700">
                      Te sirve si pierdes clientes por tiempos de respuesta.
                    </span>
                    <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-white text-slate-700">
                      Te sirve si tu equipo no alcanza a contestar todo.
                    </span>
                    <span className="px-3 py-1 rounded-full border border-[var(--orange)] bg-white text-[var(--orange)]">
                      Te sirve si quieres cerrar más con el mismo flujo de chats.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="mt-20 md:mt-24">
            <div ref={contactReveal.ref} className={revealClasses(contactReveal.isVisible)}>
              <div className="rounded-3xl border border-[var(--border)] bg-white shadow-sm">
                <div className="rounded-3xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="md:flex-1">
                      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy)]">
                        Hablemos: ¿cuántos chats estás perdiendo al día?
                      </h2>
                      <p className="mt-2 text-sm md:text-base text-slate-700 max-w-2xl">
                        Llena esto y te abrimos WhatsApp con el mensaje listo. También puedes escribir directo a cualquiera
                        de estos números:{" "}
                        <span className="font-semibold text-[var(--navy)]">{WHATSAPP_NUMBER_DISPLAY}</span> o{" "}
                        <span className="font-semibold text-[var(--navy)]">{WHATSAPP_NUMBER2_DISPLAY}</span>.
                      </p>

                      <form onSubmit={onSubmitLead} className="mt-6 grid gap-3 max-w-xl">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="grid gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Nombre</label>
                            <input
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              className="h-11 rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-[var(--orange)]"
                              placeholder="Tu nombre"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Email (opcional)</label>
                            <input
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              type="email"
                              className="h-11 rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-[var(--orange)]"
                              placeholder="tu@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Mensaje</label>
                          <textarea
                            value={leadMsg}
                            onChange={(e) => setLeadMsg(e.target.value)}
                            rows={4}
                            className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-[var(--orange)]"
                            placeholder="Ej: agendar citas, responder precios, tomar reservas, filtrar clientes, etc."
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="submit"
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full text-white shadow-lg transition-colors bg-[var(--orange)] hover:bg-[var(--orange-2)] px-6 py-3 text-sm font-semibold"
                          >
                            Enviar por WhatsApp ↗
                          </button>

                          <button
                            type="button"
                            onClick={() => openWhatsAppWithLead(WHATSAPP_LINK2)}
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)] bg-white px-6 py-3 text-sm font-semibold text-[var(--navy)] shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                          >
                            Enviar al otro número ↗
                          </button>

                          <p className="text-xs text-slate-500">Si prefieres, también coordinamos una llamada por Meet / Zoom.</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                          >
                            Abrir chat directo (1)
                          </a>

                          <a
                            href={WHATSAPP_LINK2}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                          >
                            Abrir chat directo (2)
                          </a>
                        </div>
                      </form>
                    </div>

                    <div className="md:w-72 w-full">
                      <div className="rounded-3xl border border-[var(--border)] bg-white p-5 flex flex-col items-center text-center gap-3 hover-card-effect">
                        <p className="text-xs font-semibold text-[var(--navy)]">WhatsApp</p>

                        <div className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-left">
                          <p className="text-[11px] text-slate-500">Número</p>
                          <p className="text-sm font-semibold text-[var(--navy)]">{WHATSAPP_NUMBER_DISPLAY}</p>
                        </div>

                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={onInteractiveEnter}
                          onMouseLeave={onInteractiveLeave}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full text-white shadow-md transition-colors bg-[var(--navy)] hover:bg-[var(--navy-2)] px-5 py-2.5 text-sm font-semibold"
                        >
                          Ir al chat (1) ↗
                        </a>

                        <div className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-left">
                          <p className="text-[11px] text-slate-500">Número</p>
                          <p className="text-sm font-semibold text-[var(--navy)]">{WHATSAPP_NUMBER2_DISPLAY}</p>
                        </div>

                        <a
                          href={WHATSAPP_LINK2}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={onInteractiveEnter}
                          onMouseLeave={onInteractiveLeave}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full text-white shadow-md transition-colors bg-[var(--navy)] hover:bg-[var(--navy-2)] px-5 py-2.5 text-sm font-semibold"
                        >
                          Ir al chat (2) ↗
                        </a>

                        <div className="w-full">
                          <div className="bg-white rounded-3xl border border-[var(--border)] p-4">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                                WHATSAPP_LINK
                              )}`}
                              alt="Código QR de WhatsApp"
                              className="h-52 w-52 mx-auto object-contain"
                            />
                          </div>
                          <p className="mt-2 text-[11px] text-slate-500">QR para abrir el chat (número 1) en WhatsApp.</p>
                        </div>

                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-left text-xs text-slate-700 hover:border-[var(--orange)] transition-colors"
                        >
                          <span className="text-[11px] text-slate-500 block">Enlace (1)</span>
                          <span className="font-semibold">wa.me/{WHATSAPP_NUMBER_E164}</span>
                        </a>

                        <a
                          href={WHATSAPP_LINK2}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-left text-xs text-slate-700 hover:border-[var(--orange)] transition-colors"
                        >
                          <span className="text-[11px] text-slate-500 block">Enlace (2)</span>
                          <span className="font-semibold">wa.me/{WHATSAPP_NUMBER2_E164}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-slate-500">
                © {new Date().getFullYear()} J&amp;D Ingeniería y Consultoría. Hecho para responder rápido y vender mejor.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
