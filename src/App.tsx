import type React from "react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type CursorVariant = "default" | "link";

type Technology = {
  name: string;
  logo: string;
};

const TECHNOLOGIES: Technology[] = [
  // Lenguajes
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    name: "Rust",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  {
    name: "Ruby",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  },
  {
    name: "Kotlin",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Swift",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  {
    name: "Dart",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },

  // Frontend / UI
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Nuxt.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
  },
  {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Svelte",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Material UI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "jQuery",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  },

  // Mobile / multiplataforma
  {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "Android",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  {
    name: "Electron",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
  },

  // Backend / runtimes / APIs
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "NestJS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  },
  {
    name: "Django",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    name: "Flask",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    name: "Laravel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  {
    name: "Spring",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: ".NET Core",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    name: "Rails",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",
  },
  {
    name: "GraphQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },

  // Bases de datos / búsqueda
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "MariaDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "SQLite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  {
    name: "Elasticsearch",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
  },

  // DevOps / Cloud / Infra
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Kubernetes",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "NGINX",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
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
  // Cursor + parallax con colores planos
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (event.clientX / innerWidth - 0.5) * 2;
      const yNorm = (event.clientY / innerHeight - 0.5) * 2;

      setCursorPos({ x: event.clientX, y: event.clientY });
      setParallax({ x: xNorm, y: yNorm });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const cursorSize = cursorVariant === "default" ? 20 : 34;

  const cursorStyle: CSSProperties = {
    width: cursorSize,
    height: cursorSize,
    transform: `translate3d(${cursorPos.x - cursorSize / 2}px, ${
      cursorPos.y - cursorSize / 2
    }px, 0)`,
    transition:
      "transform 0.11s ease-out, width 0.11s ease-out, height 0.11s ease-out, background-color 0.11s ease-out, border-color 0.11s ease-out",
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

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    event.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const half = Math.ceil(TECHNOLOGIES.length / 2);
  const rowA = TECHNOLOGIES.slice(0, half);
  const rowB = TECHNOLOGIES.slice(half);

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 overflow-hidden font-sans cursor-none">
      {/* Fondos parallax SIN degradados: solo círculos de color liso */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-orange-200 blur-3xl"
          style={{
            transform: `translate3d(${parallax.x * 20}px, ${
              parallax.y * 20
            }px, 0)`,
          }}
        />
        <div
          className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-sky-200 blur-3xl"
          style={{
            transform: `translate3d(${parallax.x * -25}px, ${
              parallax.y * -10
            }px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[-5rem] left-1/4 h-72 w-72 rounded-full bg-orange-100 blur-3xl"
          style={{
            transform: `translate3d(${parallax.x * 10}px, ${
              parallax.y * -15
            }px, 0)`,
          }}
        />
      </div>

      {/* Cursor custom */}
      <div
        className={`pointer-events-none fixed z-[9999] rounded-full border cursor-glow ${
          cursorVariant === "default"
            ? "border-orange-400/80 bg-orange-400/20"
            : "border-sky-400/90 bg-sky-400/30"
        }`}
        style={cursorStyle}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Navbar */}
        <header className="sticky top-4 z-20 mb-6">
          <div className="backdrop-blur bg-white/95 border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
            <nav className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-semibold">
                  DM
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-slate-900">
                    David Mora
                  </span>
                  <span className="text-xs text-slate-500">
                    Consultor en desarrollo de software
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 text-xs font-medium">
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
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="text-slate-600 hover:text-orange-600 tracking-wide transition-colors"
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
                className="hidden md:inline-flex text-xs px-4 py-2 rounded-full bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-colors"
              >
                Agenda una llamada
              </a>
            </nav>
          </div>
        </header>

        <main className="pb-24">
          {/* HERO */}
          <section id="hero" className="pt-4 md:pt-8">
            <div
              ref={heroReveal.ref}
              className={`${revealClasses(
                heroReveal.isVisible
              )} grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center gap-10`}
            >
              <div className="space-y-6">
                <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] text-orange-700 bg-orange-50 border border-orange-200 px-4 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  CONSULTORÍA · FRONTEND · WEB
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                  Diseño experiencias web{" "}
                  <span className="text-orange-600">claras y rápidas</span>{" "}
                  que conectan negocio y tecnología.
                </h1>
                <p className="text-sm md:text-base text-slate-700 max-w-xl">
                  Te ayudo a pasar de idea a producto: landings, interfaces y
                  paneles internos. Tomo decisiones técnicas pensando en
                  rendimiento, claridad y en que tú puedas entender qué se está
                  haciendo.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="cta-pulse inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition-colors"
                  >
                    Hablemos de tu proyecto
                    <span className="text-base">↗</span>
                  </a>
                  <a
                    href="#projects"
                    onClick={(e) => handleNavClick(e, "#projects")}
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-sky-700 transition-colors"
                  >
                    Ver proyectos y soluciones
                    <span className="text-xs text-slate-400">● ● ●</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 text-[11px] text-slate-700">
                  <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Disponible para proyectos freelance
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    React · TypeScript · Tailwind
                  </span>
                </div>
              </div>

              <div className="flex md:justify-end">
                <div className="relative h-64 w-64 md:h-72 md:w-72 rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] overflow-hidden float-card">
                  <div className="relative z-10 flex h-full flex-col justify-between p-5">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700">
                        Frontend Consultant
                      </span>
                      <span className="text-slate-400">Cuenca · EC</span>
                    </div>
                    <div className="space-y-3 text-xs text-slate-800">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                        Stack principal
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div className="rounded-xl bg-slate-50 border border-slate-200 px-2 py-2 shadow-sm">
                          <p className="font-medium text-slate-900">React</p>
                          <p className="text-[10px] text-slate-500">
                            SPAs, dashboards y landings.
                          </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 border border-slate-200 px-2 py-2 shadow-sm">
                          <p className="font-medium text-slate-900">
                            TypeScript
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Código seguro y escalable.
                          </p>
                        </div>
                        <div className="rounded-xl bg-orange-50 border border-orange-200 px-2 py-2 shadow-sm">
                          <p className="font-medium text-orange-700">
                            Tailwind
                          </p>
                          <p className="text-[10px] text-slate-500">
                            UI moderna y responsiva.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>+ proyectos académicos y freelance</span>
                      <span className="font-medium text-sky-700">
                        Ingeniería de Software
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SOBRE MÍ */}
          <section id="about" className="mt-18 md:mt-20">
            <div
              ref={aboutReveal.ref}
              className={`${revealClasses(
                aboutReveal.isVisible
              )} max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)] p-6 md:p-8`}
            >
              <h2 className="section-heading text-xl md:text-2xl font-semibold mb-3">
                Sobre mí
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Soy David Esteban Mora Cabrera, estudiante de Ingeniería de
                Software y desarrollador frontend. Me interesa que tu producto
                se vea bien, funcione bien y que también entiendas por qué se
                tomó cada decisión.
              </p>
              <p className="mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                Trabajo principalmente con JavaScript/TypeScript, React y
                Tailwind. Me gusta mantener el frontend organizado, con
                componentes reutilizables y una interfaz donde cada elemento
                tiene un propósito claro.
              </p>
            </div>
          </section>

          {/* SERVICIOS */}
          <section id="services" className="mt-20 md:mt-24">
            <div
              ref={servicesReveal.ref}
              className={revealClasses(servicesReveal.isVisible)}
            >
              <h2 className="section-heading text-xl md:text-2xl font-semibold mb-6">
                Servicios que ofrezco
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    title: "Landings enfocadas en negocio",
                    desc: "Páginas de presentación para explicar bien qué haces y guiar al usuario a la siguiente acción.",
                  },
                  {
                    title: "Interfaces y paneles internos",
                    desc: "Dashboards y herramientas internas para que tu equipo vea datos y procesos sin perderse.",
                  },
                  {
                    title: "Acompañamiento técnico",
                    desc: "Revisión de frontend, definición de stack y apoyo en buenas prácticas para tu equipo.",
                  },
                ].map((card, index) => (
                  <article
                    key={card.title}
                    className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all ${
                      index === 0
                        ? "border-orange-300"
                        : "border-slate-200"
                    }`}
                  >
                    {index === 0 && (
                      <span className="absolute top-0 left-0 h-1 w-full bg-orange-500" />
                    )}
                    <div className="relative z-10">
                      <h3 className="font-semibold mb-2 text-slate-900">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-700">{card.desc}</p>
                    </div>
                  </article>
                ))}
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
                  <h2 className="section-heading text-xl md:text-2xl font-semibold">
                    Tecnologías con las que me muevo cómodo.
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-slate-700 max-w-xl">
                    Lenguajes, frameworks, bases de datos y herramientas de
                    infraestructura. Puedo integrarme al stack que ya use tu
                    equipo o ayudarte a definir uno nuevo.
                  </p>
                </div>
                <p className="text-xs text-slate-500 max-w-xs">
                  Los logos son ilustrativos. La clave no es usar todo, sino
                  elegir bien en qué vale la pena invertir complejidad.
                </p>
              </div>

              <div className="marquee-container relative overflow-hidden rounded-3xl border border-slate-200 bg-white py-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <div className="absolute inset-y-0 left-0 w-24 bg-white pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-white pointer-events-none" />

                <div className="space-y-4">
                  {/* Fila 1: acento naranja */}
                  <div className="marquee-row flex gap-6 min-w-max">
                    {[...rowA, ...rowA].map((tech, index) => (
                      <div
                        key={`${tech.name}-a-${index}`}
                        className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-orange-50 border border-orange-200 min-w-max hover:border-orange-500 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-full bg-white border border-orange-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={tech.logo}
                            alt={tech.name}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                        <span className="text-sm text-slate-900">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Fila 2: acento azul */}
                  <div className="marquee-row reverse flex gap-6 min-w-max">
                    {[...rowB, ...rowB].map((tech, index) => (
                      <div
                        key={`${tech.name}-b-${index}`}
                        className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-sky-50 border border-sky-200 min-w-max hover:border-sky-500 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-full bg-white border border-sky-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={tech.logo}
                            alt={tech.name}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                        <span className="text-sm text-slate-900">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
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
              <h2 className="section-heading text-xl md:text-2xl font-semibold mb-6">
                Tipos de proyectos en los que encajo
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                <article className="rounded-2xl border border-orange-300 bg-white p-4 flex flex-col justify-between shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                  <div>
                    <p className="text-xs text-orange-600 mb-1">
                      Landing · React
                    </p>
                    <h3 className="font-semibold mb-2 text-slate-900">
                      Marca personal o consultoría
                    </h3>
                    <p className="text-sm text-slate-700">
                      Una landing pensada para explicar qué haces y por qué
                      deberían trabajar contigo, sin parecer un template más.
                    </p>
                  </div>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                  <div>
                    <p className="text-xs text-sky-600 mb-1">
                      Dashboard · TS + Tailwind
                    </p>
                    <h3 className="font-semibold mb-2 text-slate-900">
                      Panel interno para equipo
                    </h3>
                    <p className="text-sm text-slate-700">
                      Herramientas internas para que tu equipo pueda ver
                      métricas, estados y procesos de manera clara.
                    </p>
                  </div>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                  <div>
                    <p className="text-xs text-orange-500 mb-1">
                      Prototipo · UI/UX
                    </p>
                    <h3 className="font-semibold mb-2 text-slate-900">
                      MVP para validar ideas
                    </h3>
                    <p className="text-sm text-slate-700">
                      Prototipos navegables para testear con usuarios, clientes
                      o inversionistas antes de invertir en desarrollo completo.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* CONTACTO */}
          <section id="contact" className="mt-20 md:mt-24">
            <div
              ref={contactReveal.ref}
              className={revealClasses(contactReveal.isVisible)}
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <h2 className="section-heading text-xl md:text-2xl font-semibold mb-3 text-slate-900">
                  ¿Hablamos de tu próximo proyecto?
                </h2>
                <p className="text-sm md:text-base text-slate-700 mb-5 max-w-xl">
                  Cuéntame en pocas líneas qué necesitas y puedo devolverte una
                  propuesta sincera: alcance, tiempos y stack recomendado.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:tu-correo@ejemplo.com?subject=Proyecto%20de%20desarrollo%20web"
                    onMouseEnter={onInteractiveEnter}
                    onMouseLeave={onInteractiveLeave}
                    className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all"
                  >
                    Escribir un correo
                  </a>
                  <p className="text-xs text-slate-500">
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
