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

    const handleMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
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
      { title: "Responde al instante:", text: "atiende a tus clientes por WhatsApp aunque tú estés ocupado." },
      { title: "Hace las preguntas correctas:", text: "entiende qué necesita la persona sin marearla." },
      { title: "No se le va nada:", text: "va anotando datos importantes y deja todo ordenado." },
      { title: "Agenda por ti:", text: "si quieren una cita, la deja lista y tú solo confirmas." },
    ],
    []
  );

  const marqueeTech = useMemo(() => {
    const base = TECHNOLOGIES.slice(0, 22);
    return [...base, ...base];
  }, []);

  const openWhatsAppWithLead = (targetLink: string) => {
    const text = [
      "Hola 👋, quiero conocer a LIA (agente recepcionista).",
      leadName ? `Nombre: ${leadName}` : null,
      leadEmail ? `Email: ${leadEmail}` : null,
      leadMsg ? `Mensaje: ${leadMsg}` : null,
      "Interés: LIA para mi negocio",
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
      className={`relative min-h-screen overflow-hidden font-sans text-slate-900 ${
        hasFinePointer ? "cursor-none" : "cursor-auto"
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
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 26s linear infinite;
          will-change: transform;
        }
      `}</style>

      {hasFinePointer && (
        <div
          className={`pointer-events-none fixed z-[9999] rounded-full border-2 ${
            cursorVariant === "default"
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
                Ver cómo tener a LIA
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
                  AGENTE IA · LIA RECEPCIONISTA
                </p>

                <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] text-[var(--navy)]">
                  Atiende a tus clientes{" "}
                  <span className="text-[var(--orange)]">por WhatsApp</span> con LIA,{" "}
                  <span className="text-[var(--orange)]">tu recepcionista</span>.
                </h1>

                <div className="space-y-3 max-w-xl">
                  <p className="text-base md:text-lg text-slate-700">
                    LIA contesta rápido, pregunta lo necesario, toma los datos y deja todo listo para que tú solo
                    cierres la venta o confirmes una cita.
                  </p>
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    Para el cliente se siente como hablar con una persona: simple, claro y directo.
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
                    Pedir info de LIA <span className="text-base">↗</span>
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
                    Responde 24/7
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--navy)]" />
                    Deja todo ordenado
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 shadow-sm text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                    Agenda y confirma citas
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
                          LIA, el agente recepcionista que no se cansa.
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-slate-700 max-w-2xl">
                          Cuando alguien te escribe, LIA le responde al momento, entiende lo que busca y guía la conversación.
                          Si el cliente ya habló antes, LIA reconoce el contexto y sigue sin volver a preguntar lo mismo.
                        </p>
                      </div>

                      <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact")}
                        onMouseEnter={onInteractiveEnter}
                        onMouseLeave={onInteractiveLeave}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)] bg-white px-4 py-2 text-xs font-semibold text-[var(--navy)] shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                      >
                        Quiero LIA para mi negocio ↗
                      </a>
                    </div>

                    <div className="rounded-3xl border border-[var(--border)] bg-white shadow-sm">
                      <div className="rounded-3xl p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                              En simple: LIA es como tu primera línea de atención. Contesta, pregunta, registra y organiza.
                              Y si la conversación ya necesita a una persona, te la pasa con todo listo para que tú solo entres
                              a rematar.
                            </p>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {liaBenefits.map((b) => (
                                <CheckItem key={b.title} title={b.title} text={b.text} />
                              ))}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-[var(--border)] bg-white p-5 md:p-6 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-[var(--navy)]">Se conecta con tus herramientas</p>
                              <p className="text-xs text-slate-500">fluido y sin fricción</p>
                            </div>

                            <div className="relative mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
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
                              <div className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 shadow-sm">
                                <span className="font-semibold text-[var(--navy)]">Atención</span>: rápida y amable
                              </div>
                              <div className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 shadow-sm">
                                <span className="font-semibold text-[var(--navy)]">Orden</span>: datos bien guardados
                              </div>
                              <div className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 shadow-sm">
                                <span className="font-semibold text-[var(--navy)]">Citas</span>: agenda sin enredos
                              </div>
                              <div className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 shadow-sm">
                                <span className="font-semibold text-[var(--navy)]">Acompañamiento</span>: soporte por plan
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="px-3 py-1 rounded-full border border-[var(--orange)] bg-white text-[var(--orange)]">
                        Planes según tu tipo de negocio (ventas, citas, soporte).
                      </span>
                      <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-white text-slate-700">
                        Ideal para responder preguntas frecuentes y capturar prospectos.
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

          <section id="contact" className="mt-20 md:mt-24">
            <div ref={contactReveal.ref} className={revealClasses(contactReveal.isVisible)}>
              <div className="rounded-3xl border border-[var(--border)] bg-white shadow-sm">
                <div className="rounded-3xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="md:flex-1">
                      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy)]">
                        Pide una propuesta para LIA (sin fricción).
                      </h2>
                      <p className="mt-2 text-sm md:text-base text-slate-700 max-w-2xl">
                        Cuéntanos tu negocio y qué quieres que atienda LIA. Te respondemos con un plan simple y claro.
                        Puedes escribirnos por WhatsApp a cualquiera de estos números:{" "}
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
                            <label className="text-xs font-semibold text-slate-700">Email</label>
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
                            placeholder="Cuéntanos qué haces, qué te preguntan los clientes y qué te gustaría que LIA resuelva."
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="submit"
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full text-white shadow-lg transition-colors bg-[var(--orange)] hover:bg-[var(--orange-2)] px-6 py-3 text-sm font-semibold"
                          >
                            Enviar al WhatsApp 1 ↗
                          </button>

                          <button
                            type="button"
                            onClick={() => openWhatsAppWithLead(WHATSAPP_LINK2)}
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)] bg-white px-6 py-3 text-sm font-semibold text-[var(--navy)] shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                          >
                            Enviar al WhatsApp 2 ↗
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
                            Abrir chat directo (WhatsApp 1)
                          </a>

                          <a
                            href={WHATSAPP_LINK2}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={onInteractiveEnter}
                            onMouseLeave={onInteractiveLeave}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                          >
                            Abrir chat directo (WhatsApp 2)
                          </a>
                        </div>
                      </form>
                    </div>

                    <div className="md:w-72 w-full">
                      <div className="rounded-3xl border border-[var(--border)] bg-white p-5 flex flex-col items-center text-center gap-3 hover-card-effect">
                        <p className="text-xs font-semibold text-[var(--navy)]">WhatsApp</p>

                        <div className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-left">
                          <p className="text-[11px] text-slate-500">Número 1</p>
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
                          <p className="text-[11px] text-slate-500">Número 2</p>
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
                          <p className="mt-2 text-[11px] text-slate-500">
                            QR para abrir el chat (número 1) en WhatsApp.
                          </p>
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
                © {new Date().getFullYear()} J&amp;D Ingeniería y Consultoría. Atención automatizada que se siente humana.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
