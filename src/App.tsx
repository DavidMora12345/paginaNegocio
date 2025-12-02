import { useEffect, useRef, useState, type CSSProperties } from "react";

type CursorVariant = "default" | "link";

type Technology = {
  name: string;
  logo: string;
};

const TECHNOLOGIES: Technology[] = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
];

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

function App() {
  // Cursor custom
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const cursorSize = cursorVariant === "default" ? 22 : 36;

  const cursorStyle: CSSProperties = {
    width: cursorSize,
    height: cursorSize,
    transform: `translate3d(${cursorPos.x - cursorSize / 2}px, ${
      cursorPos.y - cursorSize / 2
    }px, 0)`,
    transition:
      "transform 0.12s ease-out, width 0.12s ease-out, height 0.12s ease-out, background-color 0.12s ease-out, border-color 0.12s ease-out",
  };

  const heroReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const techReveal = useScrollReveal();
  const projectsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const onInteractiveEnter = () => setCursorVariant("link");
  const onInteractiveLeave = () => setCursorVariant("default");

  const revealClasses = (isVisible: boolean) =>
    `transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans cursor-none">
      {/* Fondos gradientes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/3 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),transparent_55%)]" />
      </div>

      {/* Cursor custom */}
      <div
        className={`pointer-events-none fixed z-[9999] rounded-full border backdrop-blur-sm ${
          cursorVariant === "default"
            ? "border-sky-400/70 bg-sky-400/10"
            : "border-emerald-400/80 bg-emerald-400/15"
        }`}
        style={cursorStyle}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Navbar */}
        <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/70 border-b border-slate-800/60">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
                <span className="text-sm font-semibold text-sky-300">
                  DM
                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">David Mora</span>
                <span className="text-xs text-slate-400">
                  Consultor en desarrollo de software
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm">
              {[
                { href: "#about", label: "Sobre mí" },
                { href: "#services", label: "Servicios" },
                { href: "#stack", label: "Tecnologías" },
                { href: "#projects", label: "Proyectos" },
                { href: "#contact", label: "Contacto" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onMouseEnter={onInteractiveEnter}
                  onMouseLeave={onInteractiveLeave}
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onMouseEnter={onInteractiveEnter}
              onMouseLeave={onInteractiveLeave}
              className="hidden md:inline-flex text-xs px-4 py-2 rounded-full border border-sky-500/60 bg-sky-500/10 hover:bg-sky-500/20 hover:border-sky-400/80 text-sky-100 transition-colors"
            >
              Agenda una llamada
            </a>
          </nav>
        </header>

        <main className="pb-24">
          {/* HERO */}
          <section id="hero" className="pt-16 md:pt-20">
            <div
              ref={heroReveal.ref}
              className={`${revealClasses(
                heroReveal.isVisible
              )} flex flex-col md:flex-row items-center gap-12`}
            >
              <div className="flex-1 space-y-6">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
                  Consultoría en desarrollo · Frontend · Web
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                  Diseño y construyo experiencias web
                  <span className="text-sky-400"> claras, rápidas </span>
                  y pensadas para el negocio.
                </h1>
                <p className="text-sm md:text-base text-slate-300 max-w-xl">
                  Soy estudiante de Ingeniería de Software especializado en
                  frontend. Te ayudo a convertir ideas en productos digitales
                  reales, con código limpio y tecnologías modernas.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-colors"
                  >
                    Hablemos de tu proyecto
                    <span className="text-base">↗</span>
                  </a>
                  <a
                    href="#projects"
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="text-sm text-slate-300 hover:text-sky-300 underline underline-offset-4 decoration-slate-600 hover:decoration-sky-400 transition-colors"
                  >
                    Ver proyectos y soluciones
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 text-[11px] text-slate-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Disponible para proyectos freelance
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-3 py-1">
                    <span className="text-sky-300">★</span>
                    React · TypeScript · Tailwind
                  </span>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="relative h-64 w-64 md:h-72 md:w-72 rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur-sm shadow-[0_0_80px_rgba(56,189,248,0.25)] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.4),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(129,140,248,0.7),transparent_55%)] opacity-80" />
                  <div className="relative z-10 flex h-full flex-col justify-between p-5">
                    <div className="flex items-center justify-between text-xs text-slate-200">
                      <span className="px-2 py-1 rounded-full bg-slate-950/60 border border-slate-700/80">
                        Frontend Consultant
                      </span>
                      <span className="text-slate-300">Cuenca · EC</span>
                    </div>
                    <div className="space-y-3 text-xs text-slate-100">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">
                        Stack principal
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div className="rounded-xl bg-slate-950/70 border border-sky-500/40 px-2 py-2">
                          <p className="font-medium text-sky-100">React</p>
                          <p className="text-[10px] text-slate-400">
                            SPAs, dashboards y landings.
                          </p>
                        </div>
                        <div className="rounded-xl bg-slate-950/70 border border-emerald-400/40 px-2 py-2">
                          <p className="font-medium text-emerald-100">
                            TypeScript
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Código seguro y escalable.
                          </p>
                        </div>
                        <div className="rounded-xl bg-slate-950/70 border border-purple-400/40 px-2 py-2">
                          <p className="font-medium text-purple-100">
                            Tailwind
                          </p>
                          <p className="text-[10px] text-slate-400">
                            UI moderna y responsiva.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-300">
                      <span>+ proyectos académicos y freelance</span>
                      <span className="font-medium text-sky-200">
                        Ingeniería de Software
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SOBRE MÍ */}
          <section id="about" className="mt-20 md:mt-28">
            <div
              ref={aboutReveal.ref}
              className={`${revealClasses(aboutReveal.isVisible)} max-w-3xl`}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Sobre mí
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Soy David Esteban Mora Cabrera, estudiante de Ingeniería de
                Software y desarrollador frontend. Me gusta combinar{" "}
                <span className="text-sky-300">
                  buenas prácticas de ingeniería
                </span>{" "}
                con un diseño cuidado para que cada proyecto sea entendible tanto
                para negocio como para el equipo técnico.
              </p>
              <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed">
                Trabajo principalmente con el ecosistema JavaScript/TypeScript,
                React y Tailwind, pero soy flexible con las tecnologías según lo
                que el proyecto necesite.
              </p>
            </div>
          </section>

          {/* SERVICIOS */}
          <section id="services" className="mt-20 md:mt-24">
            <div
              ref={servicesReveal.ref}
              className={revealClasses(servicesReveal.isVisible)}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                Servicios que ofrezco
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-sky-500/60 hover:bg-slate-900/90 transition-colors">
                  <h3 className="font-medium mb-2 text-sky-100">
                    Landings de alto impacto
                  </h3>
                  <p className="text-sm text-slate-300">
                    Páginas de presentación optimizadas para comunicar tu
                    propuesta de valor y convertir visitantes en clientes.
                  </p>
                </div>
                <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-400/60 hover:bg-slate-900/90 transition-colors">
                  <h3 className="font-medium mb-2 text-emerald-100">
                    Interfaces a medida
                  </h3>
                  <p className="text-sm text-slate-300">
                    Dashboards, paneles internos o aplicaciones web adaptadas al
                    flujo de tu negocio.
                  </p>
                </div>
                <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-purple-400/70 hover:bg-slate-900/90 transition-colors">
                  <h3 className="font-medium mb-2 text-purple-100">
                    Acompañamiento técnico
                  </h3>
                  <p className="text-sm text-slate-300">
                    Asesoría para elegir stack, estructurar frontend y mejorar la
                    calidad del código en proyectos existentes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TECNOLOGÍAS */}
          <section id="stack" className="mt-20 md:mt-24">
            <div
              ref={techReveal.ref}
              className={revealClasses(techReveal.isVisible)}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold">
                    Usamos la tecnología que{" "}
                    <span className="text-sky-300">tu proyecto necesite</span>.
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-slate-300 max-w-xl">
                    Desde landings simples hasta arquitecturas más complejas:
                    frontend moderno, APIs, bases de datos y despliegue en la
                    nube.
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  Logos a modo ilustrativo.  
                  Me adapto a las herramientas que ya uses.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 py-5">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />

                <div className="flex gap-10 animate-marquee">
                  {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800/80 min-w-max"
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="h-8 w-8 object-contain"
                      />
                      <span className="text-sm text-slate-100">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROYECTOS */}
          <section id="projects" className="mt-20 md:mt-24">
            <div
              ref={projectsReveal.ref}
              className={revealClasses(projectsReveal.isVisible)}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                Algunos tipos de proyectos
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-sky-300 mb-1">
                      Landing · React
                    </p>
                    <h3 className="font-medium mb-2">
                      Página para consultor independiente
                    </h3>
                    <p className="text-sm text-slate-300">
                      Branding personal, sección de servicios y formulario de
                      contacto integrado.
                    </p>
                  </div>
                </article>
                <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-emerald-300 mb-1">
                      Dashboard · TS + Tailwind
                    </p>
                    <h3 className="font-medium mb-2">
                      Panel interno para negocio
                    </h3>
                    <p className="text-sm text-slate-300">
                      Tablas, filtros y visualización de métricas clave para la
                      toma de decisiones.
                    </p>
                  </div>
                </article>
                <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-purple-300 mb-1">
                      Prototipo · UI/UX
                    </p>
                    <h3 className="font-medium mb-2">
                      MVP rápido para validar ideas
                    </h3>
                    <p className="text-sm text-slate-300">
                      Prototipos navegables listos para mostrar a clientes o
                      inversionistas.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* CONTACTO */}
          <section id="contact" className="mt-20 md:mt-28">
            <div
              ref={contactReveal.ref}
              className={revealClasses(contactReveal.isVisible)}
            >
              <div className="rounded-3xl border border-sky-500/40 bg-gradient-to-r from-sky-500/10 via-slate-900 to-purple-500/10 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  ¿Hablamos de tu próximo proyecto?
                </h2>
                <p className="text-sm md:text-base text-slate-100 mb-5 max-w-xl">
                  Cuéntame en pocas líneas qué necesitas y te respondo con una
                  propuesta clara: alcance, tiempos y stack recomendado.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:tu-correo@ejemplo.com?subject=Quiero%20hablar%20sobre%20un%20proyecto"
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950/90 px-5 py-2.5 text-sm font-medium text-sky-100 border border-sky-500/70 hover:bg-sky-500/10 hover:text-sky-50 transition-colors"
                  >
                    Escribir un correo
                  </a>
                  <p className="text-xs text-slate-300">
                    También podemos coordinar una llamada rápida por Google
                    Meet o Zoom.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-slate-500">
                © {new Date().getFullYear()} David Mora. Construido con React +
                TypeScript + Tailwind CSS.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
