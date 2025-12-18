import type React from "react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type CursorVariant = "default" | "link";

type Technology = {
  name: string;
  logo: string;
};

const TECHNOLOGIES: Technology[] = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
  { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
  { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Nuxt.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Svelte", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Material UI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "jQuery", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Android", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
  { name: "Electron", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "NestJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: ".NET Core", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "Rails", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MariaDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
  { name: "Elasticsearch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "NGINX", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
];

const scrumImage = "https://bambu-mobile.com/wp-content/uploads/2025/05/scrum-logo.png";

// Para enlace wa.me debe ir sin el 0 inicial del celular
const WHATSAPP_NUMBER_E164 = "593979395224";
const WHATSAPP_NUMBER_DISPLAY = "+593 0979395224";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

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
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur px-4 py-3 shadow-sm hover-card-effect">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100">
        <svg className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">
        <span className="font-semibold text-slate-900">{title}</span> {text}
      </div>
    </div>
  );
}

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
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

    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (event.clientX / innerWidth - 0.5) * 2;
      const yNorm = (event.clientY / innerHeight - 0.5) * 2;

      setCursorPos({ x: event.clientX, y: event.clientY });
      setParallax({ x: xNorm, y: yNorm });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hasFinePointer]);

  const cursorSize = cursorVariant === "default" ? 20 : 34;

  const cursorStyle: CSSProperties = {
    width: cursorSize,
    height: cursorSize,
    transform: `translate3d(${cursorPos.x - cursorSize / 2}px, ${cursorPos.y - cursorSize / 2}px, 0)`,
    transition:
      "transform 0.11s ease-out, width 0.11s ease-out, height 0.11s ease-out, background-color 0.11s ease-out, border-color 0.11s ease-out",
  };

  const heroReveal = useScrollReveal();
  const softwareReveal = useScrollReveal();
  const scrumReveal = useScrollReveal();
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

  const softwareBenefits = useMemo(
    () => [
      { title: "Desarrollo personalizado:", text: "Soluciones sobre las tecnologías que tu empresa ya utiliza." },
      { title: "Integración total:", text: "Conectamos nuevas herramientas con tus sistemas y bases de datos actuales." },
      { title: "Ingeniería de calidad:", text: "Diseño orientado a rendimiento, seguridad y mantenibilidad." },
      { title: "Garantía técnica:", text: "Documentación funcional + pruebas para entregas estables." },
    ],
    []
  );

  const scrumBenefits = useMemo(
    () => [
      { title: "Implementación estratégica:", text: "Scrum desde cero para equipos en formación o reestructura." },
      { title: "Recuperación de proyectos:", text: "Intervención en desarrollos estancados o con entregas desordenadas." },
      { title: "Optimización operativa:", text: "Métricas, ceremonias y roles claros para operar sin caos." },
      { title: "Alineación técnica:", text: "Objetivos de negocio sincronizados con la capacidad del equipo." },
    ],
    []
  );

  const marqueeTech = useMemo(() => {
    const base = TECHNOLOGIES.slice(0, 22);
    return [...base, ...base];
  }, []);

  const openWhatsAppWithLead = () => {
    const text = [
      "Hola 👋, quiero una propuesta.",
      leadName ? `Nombre: ${leadName}` : null,
      leadEmail ? `Email: ${leadEmail}` : null,
      leadMsg ? `Mensaje: ${leadMsg}` : null,
      "Servicio: (Software a medida / Scrum)",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppWithLead();
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden font-sans text-slate-900 ${
        hasFinePointer ? "cursor-none" : "cursor-auto"
      } bg-gradient-to-br from-orange-50 via-white to-sky-50`}
    >
      <style>{`
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        .hover-card-effect {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .hover-card-effect:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -5px rgba(249, 115, 22, 0.20);
          border-color: rgba(249, 115, 22, 0.35);
        }
        .tech-icon {
          filter: grayscale(55%);
          opacity: 0.85;
          transition: all 0.25s ease;
        }
        .tech-icon:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.08);
        }
        .cursor-glow {
          box-shadow:
            0 0 0 10px rgba(249, 115, 22, 0.08),
            0 0 40px rgba(56, 189, 248, 0.10);
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 26s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-orange-300/45 blur-3xl"
          style={{ transform: `translate3d(${parallax.x * 26}px, ${parallax.y * 26}px, 0)` }}
        />
        <div
          className="absolute top-1/3 -right-48 h-[34rem] w-[34rem] rounded-full bg-sky-300/40 blur-3xl"
          style={{ transform: `translate3d(${parallax.x * -30}px, ${parallax.y * -12}px, 0)` }}
        />
        <div
          className="absolute bottom-[-7rem] left-1/4 h-[24rem] w-[24rem] rounded-full bg-orange-200/40 blur-3xl"
          style={{ transform: `translate3d(${parallax.x * 14}px, ${parallax.y * -18}px, 0)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/0 to-white/25" />
      </div>

      {hasFinePointer && (
        <div
          className={`pointer-events-none fixed z-[9999] rounded-full border cursor-glow ${
            cursorVariant === "default"
              ? "border-orange-400/80 bg-orange-400/20"
              : "border-sky-400/90 bg-sky-400/25"
          }`}
          style={cursorStyle}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <header className="sticky top-4 z-20 mb-6">
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-orange-200/80 via-sky-200/70 to-orange-200/80 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
            <div className="backdrop-blur bg-white/85 border border-white/40 rounded-2xl">
              <nav className="flex items-center justify-between px-4 py-3 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/90 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <img src="/logo.png" alt="J&D" className="h-8 w-8 object-contain" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-slate-900">J&amp;D Ingeniería y Consultoría</span>
                    <span className="text-xs text-slate-500">Desarrollo de software &amp; Scrum</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-6 text-xs font-medium">
                  {[
                    { href: "#software", label: "Software a medida" },
                    { href: "#scrum", label: "Consultoría Scrum" },
                    { href: "#contact", label: "Contacto" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      onMouseEnter={onInteractiveEnter}
                      onMouseLeave={onInteractiveLeave}
                      className="text-slate-700 hover:text-orange-700 tracking-wide transition-colors"
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
                  className="hidden md:inline-flex text-xs px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all
                             bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                             hover:ring-4 ring-orange-200/70"
                >
                  Ver promociones y planes
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="pb-24">
          <section id="hero" className="pt-4 md:pt-8">
            <div
              ref={heroReveal.ref}
              className={`${revealClasses(heroReveal.isVisible)} md:flex md:items-center md:justify-between md:gap-10`}
            >
              <div className="max-w-3xl space-y-6">
                <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] text-orange-800 bg-orange-50/90 border border-orange-200 px-4 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  SOFTWARE A MEDIDA · SCRUM · PROMOCIONES
                </p>

                <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] text-slate-900">
                  ¡Lleva tu negocio al siguiente nivel{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                    con software que sí funciona
                  </span>
                  !
                </h1>

                <div className="space-y-3 max-w-xl">
                  <p className="text-base md:text-lg text-slate-700">
                    ¿Proyectos estancados? ¿Sistemas lentos? Te ayudamos a ordenar, modernizar y digitalizar tu empresa
                    con prácticas de ingeniería que se notan en producción.
                  </p>
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    Calidad, precios justos y entregas sin sorpresas.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="cta-pulse inline-flex items-center justify-center gap-2 rounded-full text-white shadow-lg transition-all
                               bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                               hover:ring-4 ring-orange-200/70 px-6 py-3 text-sm font-semibold"
                  >
                    Pedir propuesta ahora <span className="text-base">↗</span>
                  </a>

                  <a
                    href="#software"
                    onClick={(e) => handleNavClick(e, "#software")}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:border-orange-200 hover:text-orange-700 transition-colors"
                  >
                    Ver software a medida
                  </a>

                  <a
                    href="#scrum"
                    onClick={(e) => handleNavClick(e, "#scrum")}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-sky-700 transition-colors"
                  >
                    Ver consultoría Scrum
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 backdrop-blur px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Diagnóstico inicial incluido
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 backdrop-blur px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    Entregas con buenas prácticas
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 backdrop-blur px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    Planes escalables
                  </span>
                </div>
              </div>

              <div className="mt-10 md:mt-0 w-full md:w-[520px] flex items-center justify-center md:justify-end">
                <div className="relative w-full max-w-[520px] aspect-square">
                  <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-orange-200/70 via-sky-200/60 to-orange-200/70 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
                    <div className="h-full w-full rounded-3xl bg-white/65 backdrop-blur border border-white/40 hover-card-effect" />
                  </div>

                  <div className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl bg-orange-400/20 blur-xl" />
                  <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-sky-400/18 blur-xl" />

                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ animation: "floaty 5.5s ease-in-out infinite" }}
                  >
                    <div className="relative w-[86%] h-[86%] rounded-3xl bg-gradient-to-b from-white/85 to-white/45 border border-orange-200/55 shadow-[0_18px_50px_rgba(249,115,22,0.14)] flex items-center justify-center">
                      <div className="absolute top-6 left-6 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-700">
                        Arquitectura · QA · Deploy
                      </div>

                      <div className="absolute bottom-6 right-6 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-700">
                        Scrum aplicado
                      </div>

                      <div className="grid gap-3 w-[80%]">
                        <div className="rounded-2xl border border-slate-200 bg-white/92 px-4 py-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-900">Backend & APIs</span>
                            <span className="text-[11px] text-slate-500">Estable</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full w-[78%] rounded-full bg-orange-500/70" />
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white/92 px-4 py-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-900">Front & UX</span>
                            <span className="text-[11px] text-slate-500">Claro</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full w-[86%] rounded-full bg-sky-500/65" />
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white/92 px-4 py-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-900">Scrum & Delivery</span>
                            <span className="text-[11px] text-slate-500">Constante</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full w-[72%] rounded-full bg-emerald-500/60" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute -right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center">
                        <span className="text-lg font-bold text-orange-600">&lt;/&gt;</span>
                      </div>

                      <div className="absolute -left-5 top-1/3 h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center">
                        <svg className="h-6 w-6 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5 20l2.5-7L2 9h7l3-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="software" className="mt-20 md:mt-24">
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-slate-50/70 border-y border-slate-200/60">
              <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <div ref={softwareReveal.ref} className={revealClasses(softwareReveal.isVisible)}>
                  <div className="space-y-5">
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                          Software a medida que te ahorra tiempo y errores.
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-slate-700 max-w-2xl">
                          Construimos soluciones que escalan: web, apps, paneles internos y backends. Todo con enfoque de
                          mantenimiento a largo plazo.
                        </p>
                      </div>

                      <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact")}
                        onMouseEnter={onInteractiveEnter}
                        onMouseLeave={onInteractiveLeave}
                        className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 backdrop-blur px-4 py-2 text-xs font-semibold text-orange-700 shadow-sm hover:bg-orange-100 transition-colors"
                      >
                        Cotizar paquete (web + backend) ↗
                      </a>
                    </div>

                    <div className="rounded-3xl p-[1px] bg-gradient-to-r from-orange-200/70 via-sky-200/60 to-orange-200/70 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                      <div className="rounded-3xl border border-white/40 bg-white/75 backdrop-blur p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                              Transformación operativa real: convertimos procesos manuales y hojas de cálculo en sistemas
                              automatizados, trazables y fáciles de usar.
                            </p>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {softwareBenefits.map((b) => (
                                <CheckItem key={b.title} title={b.title} text={b.text} />
                              ))}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-slate-200/70 bg-white/65 backdrop-blur p-5 md:p-6 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-slate-900">Stack / Tecnologías</p>
                              <p className="text-xs text-slate-500">más color + hover</p>
                            </div>

                            <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
                              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

                              <div className="marquee-track flex w-[200%] gap-6 py-5">
                                {marqueeTech.map((tech, idx) => (
                                  <div key={`${tech.name}-${idx}`} className="flex items-center gap-2 min-w-max px-2">
                                    <img src={tech.logo} alt={tech.name} className="h-7 w-7 object-contain tech-icon" />
                                    <span className="text-xs font-medium text-slate-700">{tech.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-700">
                              <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                <span className="font-semibold text-slate-900">Entrega</span>: por hitos claros
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                <span className="font-semibold text-slate-900">Calidad</span>: pruebas + versionado
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                <span className="font-semibold text-slate-900">Seguridad</span>: buenas prácticas
                              </div>
                              <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                <span className="font-semibold text-slate-900">Soporte</span>: escalable por plan
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700">
                        Promociones por paquete (web + backend + soporte).
                      </span>
                      <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700">
                        Precios accesibles según alcance y complejidad.
                      </span>
                      <span className="px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700">
                        Ingeniería aplicada, no “solo código”.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="scrum" className="mt-20 md:mt-24">
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-sky-50/60 border-y border-sky-200/60">
              <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <div ref={scrumReveal.ref} className={revealClasses(scrumReveal.isVisible)}>
                  <div className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                      Scrum aplicado para resultados medibles (sin teoría suelta).
                    </h2>

                    <div className="rounded-3xl p-[1px] bg-gradient-to-r from-sky-200/60 via-orange-200/55 to-sky-200/60 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                      <div className="rounded-3xl border border-white/40 bg-white/75 backdrop-blur p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6 items-start">
                          <div className="space-y-3">
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                              Un marco ágil bien ejecutado reduce el caos y mejora la entrega de valor. Rumbo, plazos
                              realistas y operación sin crisis constantes.
                            </p>

                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                              Acompañamiento práctico adaptado al tamaño del equipo y al contexto del negocio, con
                              mentalidad de ingeniería de software.
                            </p>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {scrumBenefits.map((b) => (
                                <CheckItem key={b.title} title={b.title} text={b.text} />
                              ))}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                              <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700">
                                Diagnóstico inicial de madurez ágil incluido.
                              </span>
                              <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700">
                                Planes por equipo / proyecto / sesiones.
                              </span>
                              <span className="px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700">
                                Enfoque de ingeniería, no solo teoría.
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="w-full max-w-sm rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover-card-effect">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-900">Agilidad visible</p>
                                <p className="text-xs text-slate-500">Scrum</p>
                              </div>
                              <div className="mt-4 h-44 rounded-2xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
                                <img src={scrumImage} alt="Scrum / Agile" className="w-full h-full object-contain" />
                              </div>
                              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-700">
                                <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                  <span className="font-semibold text-slate-900">Entrega</span>: cadencia
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                  <span className="font-semibold text-slate-900">Foco</span>: prioridades
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                  <span className="font-semibold text-slate-900">Transparencia</span>: tablero
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                                  <span className="font-semibold text-slate-900">Mejora</span>: retro
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="mt-20 md:mt-24">
            <div ref={contactReveal.ref} className={revealClasses(contactReveal.isVisible)}>
              <div className="rounded-3xl p-[1px] bg-gradient-to-r from-orange-200/70 via-sky-200/60 to-orange-200/70 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="rounded-3xl border border-white/40 bg-white/80 backdrop-blur p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="md:flex-1">
                      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Pide una propuesta (sin fricción).</h2>
                      <p className="mt-2 text-sm md:text-base text-slate-700 max-w-2xl">
                        Envíanos tu idea y te respondemos con alcance sugerido, tiempos aproximados y un plan de presupuesto.
                        También puedes escribir directo al WhatsApp: <span className="font-semibold text-slate-900">{WHATSAPP_NUMBER_DISPLAY}</span>.
                      </p>

                      <form onSubmit={onSubmitLead} className="mt-6 grid gap-3 max-w-xl">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="grid gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Nombre</label>
                            <input
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              className="h-11 rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200/70"
                              placeholder="Tu nombre"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Email</label>
                            <input
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              type="email"
                              className="h-11 rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200/70"
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
                            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200/70"
                            placeholder="Cuéntanos qué necesitas (software / scrum) y contexto."
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="submit"
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full text-white shadow-lg transition-all
                                       bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                                       hover:ring-4 ring-orange-200/70 px-6 py-3 text-sm font-semibold"
                          >
                            Enviar por WhatsApp ↗
                          </button>

                          <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-100 transition-colors"
                          >
                            Abrir WhatsApp directo
                          </a>

                          <p className="text-xs text-slate-500">
                            Si prefieres, también coordinamos una llamada por Google Meet / Zoom.
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="md:w-72 w-full">
                      <div className="rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur p-5 flex flex-col items-center text-center gap-3 hover-card-effect">
                        <p className="text-xs font-semibold text-slate-800">WhatsApp</p>

                        <div className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-left">
                          <p className="text-[11px] text-slate-500">Número</p>
                          <p className="text-sm font-semibold text-slate-900">{WHATSAPP_NUMBER_DISPLAY}</p>
                        </div>

                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={onInteractiveEnter}
                          onMouseLeave={onInteractiveLeave}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full text-white shadow-md transition-all
                                     bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700
                                     hover:ring-4 ring-emerald-200/70 px-5 py-2.5 text-sm font-semibold"
                        >
                          Ir al chat ↗
                        </a>

                        <div className="w-full">
                          <div className="bg-white rounded-3xl border border-slate-200 p-4">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                                WHATSAPP_LINK
                              )}`}
                              alt="Código QR de WhatsApp"
                              className="h-52 w-52 mx-auto object-contain"
                            />
                          </div>
                          <p className="mt-2 text-[11px] text-slate-500">
                            QR para abrir el chat en WhatsApp (útil en desktop).
                          </p>
                        </div>

                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-left text-xs text-slate-700 hover:border-emerald-200 transition-colors"
                        >
                          <span className="text-[11px] text-slate-500 block">Enlace</span>
                          <span className="font-semibold">wa.me/{WHATSAPP_NUMBER_E164}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-slate-500">
                © {new Date().getFullYear()} J&amp;D Ingeniería y Consultoría. Servicios orientados a resultados.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
