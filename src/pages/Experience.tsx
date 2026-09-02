import { useState, useEffect, useCallback, useRef } from "react";
import { experience } from "../data/experiences";
import { certificate } from "../data/certificates";

type Tab = "experience" | "certificate";

function useScrollProgress(node: HTMLElement | null) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const total = rect.height + viewportHeight;
    const scrolled = viewportHeight - rect.top;
    const p = Math.min(Math.max(scrolled / total, 0), 1);
    setProgress(p);
  }, [node]);

  useEffect(() => {
    if (!node) return;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [node, update]);

  return progress;
}

// Trigger sekali saat section masuk viewport — dipakai untuk animasi masuk (entrance)
function useInView(node: HTMLElement | null, threshold = 0.15) {
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

  return inView;
}

export default function Experience() {
  const [tab, setTab] = useState<Tab>("experience");

  const [expNode, setExpNode] = useState<HTMLDivElement | null>(null);
  const [certNode, setCertNode] = useState<HTMLDivElement | null>(null);
  const expProgress = useScrollProgress(expNode);
  const certProgress = useScrollProgress(certNode);

  const [sectionNode, setSectionNode] = useState<HTMLDivElement | null>(null);
  const inView = useInView(sectionNode);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    return () => cancelAnimationFrame(id);
  }, [tab]);

  // Offset kartu belakang: nilainya SELALU lebih kecil dari padding cadangan
  // pada wrapper stack (pr-3/pb-4 ... lg:pr-5/pb-6), jadi tidak pernah overflow.
  const cardStyle = (which: Tab): React.CSSProperties => {
    const isFront = tab === which;
    return {
      gridColumn: 1,
      gridRow: 1,
      transform: isFront
        ? "translate(0px, 0px) scale(1)"
        : "translate(1.35em, 1.7em) scale(0.97)",
      zIndex: isFront ? 20 : 10,
      opacity: isFront ? 1 : 0.85,
      pointerEvents: isFront ? "auto" : "none",
      transition:
        "transform 500ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms ease, opacity 500ms ease, background-color 500ms ease, border-color 500ms ease",
    };
  };

  const cardClass = (which: Tab) =>
    `rounded-2xl backdrop-blur-sm lg:p-6 sm:p-5 p-4 border ${
      tab === which
        ? "bg-[#101d2e]/90 border-[#0077C0]/60"
        : "bg-[#0a121c] border-[#0077C0]/20"
    }`;

  return (
    <div
      id="experience"
      ref={setSectionNode}
      className="relative xl:mx-32 lg:mx-10 mx-4 overflow-hidden rounded-2xl sm:rounded-3xl"
    >
      {/* Ambient glow di belakang section */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-12 h-40 sm:h-48 bg-[#0077C0]/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={`relative rounded-2xl sm:rounded-3xl border border-[#0077C0]/30 bg-linear-to-b from-[#0b1420]/40 to-[#0b1420]/30 backdrop-blur-sm shadow-[0_0_70px_-20px_rgba(0,119,192,0.4)] lg:px-10 sm:px-6 px-4 pt-8 sm:pt-10 pb-6 sm:pb-8 overflow-hidden ${
          inView ? "exp-anim-panel" : "opacity-0"
        }`}
      >

        {/* HEADER */}
        <div className={`flex flex-col items-center mb-8 sm:mb-10 ${inView ? "exp-anim-header" : "opacity-0"}`}>
          <h1 className="text-center lg:text-4xl sm:text-3xl text-xl font-bold tracking-wide bg-linear-to-b from-white via-[#C7EEFF] to-[#0077C0] bg-clip-text text-transparent px-2">
            Experience &amp; Certificate
          </h1>

          <div className="relative mt-5 sm:mt-6 flex w-full max-w-[16rem] sm:max-w-[18rem] p-1 rounded-full border border-[#0077C0]/40 bg-black/30">
            <div
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[#0077C0] shadow-[0_0_16px_rgba(0,119,192,0.6)] transition-transform duration-300 ease-out"
              style={{
                transform: tab === "experience" ? "translateX(0%)" : "translateX(calc(100%))",
              }}
            />
            <button
              type="button"
              onClick={() => setTab("experience")}
              className={`relative z-10 flex-1 py-2 text-[11px] sm:text-sm font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap ${
                tab === "experience" ? "text-white" : "text-[#C7EEFF]/60 hover:text-[#C7EEFF]"
              }`}
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => setTab("certificate")}
              className={`relative z-10 flex-1 py-2 text-[11px] sm:text-sm font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap ${
                tab === "certificate" ? "text-white" : "text-[#C7EEFF]/60 hover:text-[#C7EEFF]"
              }`}
            >
              Certificate
            </button>
          </div>
        </div>

        {/* WRAPPER STACK — menyediakan ruang cadangan di kanan-bawah untuk "intip" kartu belakang */}
        <div
          className={`relative pr-3 pb-4 sm:pr-4 sm:pb-5 lg:pr-5 lg:pb-6 rounded-2xl ${
            inView ? "exp-anim-stack" : "opacity-0"
          }`}
        >
          <div className="grid">
            {/* EXPERIENCE CARD */}
            <div style={cardStyle("experience")} className={cardClass("experience")}>
              <h2 className="relative z-10 mb-4 sm:mb-5 text-[11px] italic tracking-wider text-center font-extralight lg:text-base sm:text-sm text-[#C7EEFF]/80">
                <span className="font-medium text-white">Internships</span>,{" "}
                <span className="font-medium text-white">freelance work</span>, and{" "}
                <span className="font-medium text-white">personal projects</span>.
              </h2>

              <div data-timeline ref={setExpNode} className="relative pl-1">
                <div className="absolute left-1 sm:left-32 lg:left-44 w-px inset-y-0 bg-[#C7EEFF]/20 z-0 pointer-events-none" />
                <div
                  className="absolute left-1 sm:left-32 lg:left-44 w-px top-0 bg-[#0077C0] z-0 pointer-events-none transition-[height] duration-150 ease-out"
                  style={{ height: `${expProgress * 100}%` }}
                />
                <div
                  className="timeline-circle absolute sm:w-5 sm:h-5 w-3.5 h-3.5 bg-[#0077C0] rounded-full left-1 sm:left-32 lg:left-44 top-0"
                  style={{ transform: "translateX(-50%)", zIndex: 2 }}
                />

                <div className="mt-8 space-y-10 sm:space-y-12 timeline-content">
                  {experience.map((item, i) => (
                    <div
                      key={`${item.company}-${item.position}`}
                      className={`relative flex ${inView ? "exp-anim-item" : "opacity-0"}`}
                      style={{ animationDelay: inView ? `${0.5 + i * 0.12}s` : undefined }}
                    >
                      <div className="flex">
                        <div className="max-sm:hidden font-light tracking-widest lg:w-36 w-26 lg:text-base text-sm text-[#C7EEFF]/70">
                          {item.startDate} - <span className="text-right">{item.endDate ?? "Present"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center opacity-0">
                        <div className="w-4 h-4 rounded-full sm:w-5 sm:h-5" />
                      </div>
                      <div className="ml-4 sm:ml-5 lg:ml-10 min-w-0">
                        <div className="text-xs font-light tracking-widest sm:hidden text-[#C7EEFF]/70">
                          {item.startDate} - {item.endDate ?? "Present"}
                        </div>
                        <h2 className="mb-1.5 sm:mb-2 text-sm sm:text-base font-semibold tracking-wide lg:text-lg text-white">
                          {item.company} - {item.position}
                        </h2>
                        <p className="text-xs sm:text-sm font-light leading-normal tracking-wider lg:text-base text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CERTIFICATE CARD */}
            <div style={cardStyle("certificate")} className={cardClass("certificate")}>
              <h2 className="relative z-10 mb-4 sm:mb-5 text-[11px] italic tracking-wider text-center font-extralight lg:text-base sm:text-sm text-[#C7EEFF]/80">
                <span className="font-medium text-white">Certifications</span> and{" "}
                <span className="font-medium text-white">credentials</span> earned along the way.
              </h2>

              <div data-timeline ref={setCertNode} className="relative pl-1">
                <div className="absolute left-1 sm:left-32 lg:left-44 w-px inset-y-0 bg-[#C7EEFF]/20 z-0 pointer-events-none" />
                <div
                  className="absolute left-1 sm:left-32 lg:left-44 w-px top-0 bg-[#0077C0] z-0 pointer-events-none transition-[height] duration-150 ease-out"
                  style={{ height: `${certProgress * 100}%` }}
                />
                <div
                  className="timeline-circle absolute sm:w-5 sm:h-5 w-3.5 h-3.5 bg-[#0077C0] rounded-full left-1 sm:left-32 lg:left-44 top-0"
                  style={{ transform: "translateX(-50%)", zIndex: 2 }}
                />

                <div className="mt-8 space-y-10 sm:space-y-12 timeline-content">
                  {certificate.map((item, i) => (
                    <div
                      key={`${item.name}-${item.issuer}`}
                      className={`relative flex ${inView ? "exp-anim-item" : "opacity-0"}`}
                      style={{ animationDelay: inView ? `${0.5 + i * 0.12}s` : undefined }}
                    >
                      <div className="flex">
                        <div className="max-sm:hidden font-light tracking-widest lg:w-36 w-26 lg:text-base text-sm text-[#C7EEFF]/70">
                          {item.startDate} {item.endDate ? `- ${item.endDate}` : ""}
                        </div>
                      </div>
                      <div className="flex flex-col items-center opacity-0">
                        <div className="w-4 h-4 rounded-full sm:w-5 sm:h-5" />
                      </div>
                      <div className="ml-4 sm:ml-5 lg:ml-10 min-w-0">
                        <div className="text-xs font-light tracking-widest sm:hidden text-[#C7EEFF]/70">
                          {item.startDate} {item.endDate ? `- ${item.endDate}` : ""}
                        </div>

                        <h2 className="text-sm sm:text-base font-semibold tracking-wide lg:text-lg text-white">
                          {item.name}
                        </h2>
                        <p className="mb-1 lg:mb-2 text-xs sm:text-sm font-medium tracking-wide text-[#0077C0] lg:text-base">
                          {item.issuer}
                        </p>
                        {item.credentialId && (
                          <p className="mb-3 sm:mb-4 text-[11px] font-light tracking-wider text-gray-400 sm:text-xs lg:text-sm break-all">
                            Credential ID:{" "}
                            <span className="font-medium text-gray-300">{item.credentialId}</span>
                          </p>
                        )}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex group drop-shadow-[0_1px_3px_rgb(199,238,255)] hover:brightness-150 font-semibold bg-black border border-[#C7EEFF] items-center justify-center rounded-full sm:px-4 px-3 sm:py-1.5 py-1 transition"
                        >
                          <span className="sm:text-xs text-[11px] text-[#C7EEFF]">Show Credential</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1 group-hover:translate-x-1.5 transition group-hover:-translate-y-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes expPanelFadeIn {
            0% {
                opacity: 0;
                transform: translateY(24px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes expHeaderFadeUp {
            0% {
                opacity: 0;
                transform: translateY(-14px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes expStackScaleIn {
            0% {
                opacity: 0;
                transform: scale(0.96);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes expItemSlideIn {
            0% {
                opacity: 0;
                transform: translateX(-16px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .exp-anim-panel {
            animation: expPanelFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .exp-anim-header {
            animation: expHeaderFadeUp 0.6s ease-out 0.15s forwards;
            opacity: 0;
        }

        .exp-anim-stack {
            animation: expStackScaleIn 0.6s ease-out 0.3s forwards;
            opacity: 0;
        }

        .exp-anim-item {
            animation: expItemSlideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}