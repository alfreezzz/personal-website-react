import { useState, useEffect, type MouseEvent, type ReactNode } from "react";
import { projects, type Project } from "../data/projects";
import { techStackRegistry } from "../data/techStack";
import WarpText from "../components/WarpText";

interface ProjectProps {
  onMissingProjectUrl?: () => void;
}

type CardVariant = "desktop" | "mobile";

// Membungkus children dan memicu class animasi masuk saat elemen terlihat di viewport.
// Observer per-instance sehingga tiap kartu punya trigger scroll sendiri-sendiri.
function RevealOnScroll({
  children,
  animation,
  delay = 0,
  threshold = 0.15,
  className = "",
}: {
  children: ReactNode;
  animation: string;
  delay?: number;
  threshold?: number;
  className?: string;
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, inView]);

  return (
    <div
      ref={setNode}
      className={`${className} ${inView ? animation : "opacity-0"}`}
      style={inView ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

export default function Project({ onMissingProjectUrl }: ProjectProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (projectTitle: string) => {
    setExpanded((prev) => ({
      ...prev,
      [projectTitle]: !prev[projectTitle],
    }));
  };

  const handleProjectLink = (event: MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (!project.url) {
      event.preventDefault();
      onMissingProjectUrl?.();
    }
  };

  // Shared card content — used by both the desktop (alternating) layout
  // and the mobile (horizontal slider) layout. `variant` controls the
  // structural classes so mobile cards can stretch to equal height while
  // desktop cards keep their original proportions.
  const renderCard = (project: Project, reverse: boolean, variant: CardVariant): ReactNode => {
    const isExpanded = !!expanded[project.title];
    const shouldTruncate = project.description.length > 150;
    const descriptionText = shouldTruncate && !isExpanded
      ? `${project.description.slice(0, 150)}...`
      : project.description;

    const isMobile = variant === "mobile";

    return (
      <div
        className={
          isMobile
            ? "flex flex-col w-full h-full"
            : `flex items-start lg:items-stretch w-full max-lg:flex-col ${
                reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`
        }
      >
        <a
          href={project.url ?? "#"}
          className={isMobile ? "w-full block shrink-0" : "w-full lg:w-[40%]"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => handleProjectLink(event, project)}
        >
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/40">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-auto transition duration-500 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 transition duration-500 pointer-events-none bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100" />
          </div>
        </a>
        <div
          className={
            isMobile
              ? "flex flex-col flex-1 w-full mt-4"
              : `w-full lg:w-[60%] max-lg:mt-4 lg:flex lg:flex-col ${
                  reverse ? "lg:mr-8" : "lg:ml-8"
                }`
          }
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <a
              href={project.url ?? "#"}
              className="min-w-0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => handleProjectLink(event, project)}
            >
              <h2 className="text-lg font-semibold tracking-tight transition-colors sm:text-2xl">
                {project.title}
              </h2>
            </a>
            <h3 className="mt-1 text-base tracking-wide text-right text-gray-500 shrink-0 sm:text-lg">
              {project.date}
            </h3>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide transition duration-200 border rounded-full w-fit border-[#0077C0]/40 bg-[#0077C0]/10 text-[#C7EEFF] group-hover:border-[#0077C0]/70 group-hover:bg-[#0077C0]/20">
            {project.category}
          </span>
          <p
            className={`mt-4 text-[15px] leading-relaxed text-gray-300 ${
              isMobile ? "flex-1" : "lg:flex-1"
            }`}
            id={`project-description-${project.title}`}
          >
            <span className="description-text">{descriptionText}</span>
            {shouldTruncate && (
              <button
                type="button"
                onClick={() => toggleExpanded(project.title)}
                className="font-semibold text-[#C7EEFF] hover:underline read-more ml-1"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
          <div
            className={`flex items-center justify-between gap-4 mt-6 lg:mt-7 ${
              isMobile ? "mt-4" : "lg:mt-auto"
            }`}
          >
            {/* Tech Stack */}
            <div className="flex flex-wrap">
              {project.techStack.map((stackKey) => {
                const tech = techStackRegistry[stackKey];

                return (
                  <div
                    key={`${project.title}-${stackKey}`}
                    className="
                      flex items-center justify-center
                      w-9 h-9 sm:w-10 sm:h-10
                      rounded-full
                      border border-white/15
                      bg-white/5
                      backdrop-blur-sm
                      transition duration-200
                      hover:-translate-y-1
                      hover:border-[#C7EEFF]/60
                      hover:bg-[#C7EEFF]/10
                      shrink-0
                    "
                    title={tech.name}
                  >
                    {tech.type === "image" ? (
                      <img
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        alt={tech.name}
                        src={tech.logo}
                      />
                    ) : (
                      <i className={tech.logo}></i>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Preview */}
            <a
              href={project.url ?? "#"}
              className="
                inline-flex shrink-0 items-center
                whitespace-nowrap
                rounded-full
                border border-[#0077C0]
                px-4 py-1.5 sm:px-5 sm:py-2
                text-sm sm:text-base
                font-medium
                text-[#C7EEFF]
                transition duration-200
                hover:bg-[#0077C0]
                hover:text-white
              "
              target={project.url ? "_blank" : undefined}
              rel={project.url ? "noopener noreferrer" : undefined}
              onClick={(event) => handleProjectLink(event, project)}
            >
              Live preview
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      id="project"
      className="w-full min-w-0 px-3 mx-auto overflow-hidden xl:px-32 sm:px-5"
    >
      <div className="relative">
        <div className="relative z-0">
          <WarpText
            text="Projects"
            color="#f8f5ff"
            warpStrength={0.08}
            warpScale={1.7}
            speed={0.55}
            pointerInfluence={0.42}
            pointerStrength={0.38}
            refraction={0.018}
            ripple
            fontSize={72}
            fontWeight={800}
            style={{ height: "320px" }}
            fontFamily="inherit"
            letterSpacing={-0.06}
            className="-mb-28"
          />
        </div>

        <RevealOnScroll animation="proj-anim-fadeup" threshold={0.3}>
          <h2 className="relative z-10 mb-3 text-xs italic tracking-wider text-center font-extralight lg:text-base mobile-m:text-sm max-lg:-mt-3">
            Some collection of the{" "}
            <span className="font-semibold">projects</span> I've{" "}
            <span className="font-semibold">made</span>.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll animation="proj-anim-line" delay={0.15} threshold={0.3}>
          <div className="relative z-10 w-24 h-px mx-auto bg-linear-to-r from-transparent via-[#0077C0] to-transparent" />
        </RevealOnScroll>

        {/* Desktop / large screens: vertical layout, alternating image/text sides */}
        <div className="relative z-10 hidden lg:flex flex-col gap-24 mx-auto mt-12">
          {projects.map((project, index) => (
            <RevealOnScroll
              key={project.title}
              className="group"
              animation={index % 2 === 1 ? "proj-anim-slide-left" : "proj-anim-slide-right"}
              threshold={0.15}
            >
              {renderCard(project, index % 2 === 1, "desktop")}
            </RevealOnScroll>
          ))}
        </div>

        {/* Mobile / tablet: horizontal snap slider, every card the same height */}
        <RevealOnScroll animation="proj-anim-fadeup" threshold={0.1} className="relative z-10 lg:hidden mt-10 -mx-3 sm:-mx-5">
          <div className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-3 sm:px-5 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {projects.map((project) => (
              <div
                key={project.title}
                className="snap-center shrink-0 flex w-[85vw] mobile-l:w-[75vw] sm:w-[60vw]"
              >
                {renderCard(project, false, "mobile")}
              </div>
            ))}
          </div>
          {/* Dots indicating there are multiple projects to scroll through */}
          <div className="flex justify-center gap-2 mt-3">
            {projects.map((project) => (
              <span
                key={`dot-${project.title}`}
                className="rounded-full w-1.5 h-1.5 bg-[#C7EEFF]/40"
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        @keyframes projFadeUp {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes projLineGrow {
            0% {
                opacity: 0;
                transform: scaleX(0);
            }
            100% {
                opacity: 1;
                transform: scaleX(1);
            }
        }

        @keyframes projSlideLeft {
            0% {
                opacity: 0;
                transform: translateX(-40px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes projSlideRight {
            0% {
                opacity: 0;
                transform: translateX(40px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .proj-anim-fadeup {
            animation: projFadeUp 0.6s ease-out forwards;
        }

        .proj-anim-line {
            animation: projLineGrow 0.5s ease-out forwards;
        }

        .proj-anim-slide-left {
            animation: projSlideLeft 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .proj-anim-slide-right {
            animation: projSlideRight 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}