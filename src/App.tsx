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

  // Secciones con animación
  const heroReveal = useScrollReveal();
  const softwareReveal = useScrollReveal();
  const scrumReveal = useScrollReveal();
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
                  CN
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-slate-900">
                    Código Naranja
                  </span>
                  <span className="text-xs text-slate-500">
                    Ingeniería &amp; Consultoría de Software
                  </span>
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
                Ver promociones y planes
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
              )} max-w-3xl space-y-6`}
            >
              <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] text-orange-700 bg-orange-50 border border-orange-200 px-4 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                SOFTWARE A MEDIDA · SCRUM · PROMOCIONES
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                Software a la medida y consultoría Scrum con enfoque de
                ingeniería.
              </h1>
              <p className="text-sm md:text-base text-slate-700 max-w-xl">
                Servicios para digitalizar negocios, modernizar sistemas y
                ordenar proyectos de desarrollo, con precios competitivos y
                prácticas de ingeniería modernas: arquitectura limpia, pruebas,
                automatización y despliegues estables.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#software"
                  onClick={(e) => handleNavClick(e, "#software")}
                  onMouseEnter={onInteractiveEnter}
                  onMouseLeave={onInteractiveLeave}
                  className="cta-pulse inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition-colors"
                >
                  Ver software a medida
                  <span className="text-base">↗</span>
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

              <div className="flex flex-wrap gap-3 text-[11px] text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Promociones activas y planes escalables
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  Trabajo de ingeniería con buenas prácticas
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Precios accesibles según el tamaño del proyecto
                </span>
              </div>
            </div>
          </section>

          {/* SECCIÓN 1: SOFTWARE A LA MEDIDA */}
          <section id="software" className="mt-20 md:mt-24">
            <div
              ref={softwareReveal.ref}
              className={revealClasses(softwareReveal.isVisible)}
            >
              <div className="flex flex-col gap-8">
                <div className="space-y-5">
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    Desarrollo de software a la medida y colaboración en
                    proyectos.
                  </h2>

                  {/* MISMO ESTILO DE CARD QUE CONTACTO */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                      Se diseñan y construyen soluciones digitales completas:
                      páginas web, paneles internos, apps móviles, backends y
                      APIs, siempre con arquitectura pensada para crecer y
                      mantenerse en el tiempo.
                    </p>
                    <p className="mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                      El foco está en digitalizar negocios y procesos: pasar de
                      hojas de cálculo y tareas manuales a sistemas claros,
                      trazables y fáciles de usar. Los precios son competitivos
                      y se ajustan al tamaño del proyecto, sin sacrificar
                      calidad de ingeniería.
                    </p>

                    <ul className="mt-4 text-sm md:text-base text-slate-700 space-y-2 list-disc list-inside">
                      <li>
                        Desarrollo a medida en la tecnología que ya usas.
                      </li>
                      <li>
                        Integración con sistemas existentes y bases de datos.
                      </li>
                      <li>
                        Diseño pensando en rendimiento, seguridad y
                        mantenibilidad.
                      </li>
                      <li>
                        Pruebas, documentación básica y código versionado.
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700">
                      Promociones por paquete (web + backend + soporte).
                    </span>
                    <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700">
                      Precios accesibles según alcance y complejidad.
                    </span>
                    <span className="px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700">
                      Trabajo de ingeniería garantizado y con buenas prácticas.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: CONSULTORÍA SCRUM */}
          <section id="scrum" className="mt-20 md:mt-24">
            <div
              ref={scrumReveal.ref}
              className={revealClasses(scrumReveal.isVisible)}
            >
              <div className="flex flex-col gap-8">
                <div className="space-y-5">
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    Consultoría en Scrum y agilidad para empresas.
                  </h2>

                  {/* MISMO ESTILO DE CARD QUE CONTACTO */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                      Scrum bien aplicado ayuda a reducir el caos, priorizar lo
                      importante y entregar valor de forma constante. La idea es
                      que los proyectos tengan rumbo claro, plazos realistas y
                      menos apagafuegos.
                    </p>
                    <p className="mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                      La consultoría se centra en aterrizar Scrum a la realidad
                      de cada empresa: tamaño del equipo, tipo de proyecto y
                      contexto. No se vende teoría suelta, sino acompañamiento
                      práctico con enfoque de ingeniería de software.
                    </p>

                    <ul className="mt-4 text-sm md:text-base text-slate-700 space-y-2 list-disc list-inside">
                      <li>
                        Implementación de Scrum desde cero en equipos de
                        desarrollo.
                      </li>
                      <li>
                        Rescate de proyectos trabados o con entregas
                        desordenadas.
                      </li>
                      <li>
                        Revisión de tableros, ceremonias, métricas y definición
                        de roles.
                      </li>
                      <li>
                        Alineamiento entre negocio y equipo técnico para
                        priorizar bien.
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700">
                      Diagnóstico inicial de madurez ágil incluido en
                      promociones.
                    </span>
                    <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700">
                      Planes por equipo, por proyecto o por sesiones.
                    </span>
                    <span className="px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700">
                      Aplicación de Scrum con enfoque de ingeniería, no solo
                      teoría.
                    </span>
                  </div>
                </div>
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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="md:flex-1">
                    <h2 className="text-xl md:text-2xl font-semibold mb-3 text-slate-900">
                      Solicita una propuesta y revisa las promociones vigentes.
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 mb-5 max-w-xl">
                      Se puede solicitar una propuesta para software a medida,
                      colaboración en proyectos o consultoría Scrum. La respuesta
                      incluye alcance sugerido, tiempos aproximados, tecnología
                      recomendada y opciones de presupuesto con promociones
                      aplicables.
                    </p>
                    <div className="flex
 flex-wrap items-center gap-4">
                      <a
                        href="mailto:tu-correo@ejemplo.com?subject=Consultor%C3%ADa%20en%20desarrollo%20de%20software%20y%20Scrum"
                        onMouseEnter={onInteractiveEnter}
                        onMouseLeave={onInteractiveLeave}
                        className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all"
                      >
                        Pedir catálogo de promociones
                      </a>
                      <p className="text-xs text-slate-500">
                        También se puede coordinar una llamada rápida por Google
                        Meet o Zoom para aclarar dudas y elegir el plan adecuado.
                      </p>
                    </div>
                  </div>

                  {/* QR WhatsApp */}
                  <div className="md:w-60 w-full">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col items-center text-center gap-3">
                      <p className="text-xs font-semibold text-slate-800">
                        ¿Prefieres escribir por WhatsApp?
                      </p>
                      <div className="bg-white rounded-2xl border border-slate-200 p-3">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://wa.me/593999999999"
                          alt="Código QR de contacto por WhatsApp"
                          className="h-40 w-40 object-contain"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Escanea el código y envía un mensaje indicando si buscas
                        software a medida o consultoría Scrum, y se comparte la
                        información de promociones disponibles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-slate-500">
                © {new Date().getFullYear()} Código Naranja Ingeniería &amp;
                Consultoría. Trabajo de ingeniería de software con buenas
                prácticas y servicios orientados a resultados.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
