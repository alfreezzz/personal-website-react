import { useState, useEffect } from "react";
import { experience } from "../data/experiences";
import { certificate } from "../data/certificates";

type Tab = "experience" | "certificate";

export default function Experience() {
  const [tab, setTab] = useState<Tab>("experience");

  // Mimics Alpine's $nextTick(() => dispatch scroll) so any scroll-based
  // libraries listening on window recalc positions after the tab content swaps.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    return () => cancelAnimationFrame(id);
  }, [tab]);

  return (
    <div
      id="experience"
      className="mt-32 lg:px-8 sm:px-5 px-3 pt-3 pb-6 xl:mx-32 mx-5 border border-[#C7EEFF] rounded-lg shadow-lg shadow-[#C7EEFF] relative"
    >
      <h1 className="text-center lg:text-4xl sm:text-2xl text-lg font-bold tracking-wide lg:py-3 pb-5 sm:pb-4 bg-gradient-to-b from-[#0077C0] via-[#0077C0] to-[#C7EEFF] bg-clip-text text-transparent">
        --
        <button
          type="button"
          onClick={() => setTab("experience")}
          className={`p-0 m-0 align-baseline transition-all bg-transparent border-0 ${
            tab === "experience" ? "underline underline-offset-8 decoration-4" : "no-underline"
          }`}
        >
          Experience
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => setTab("certificate")}
          className={`p-0 m-0 align-baseline transition-all bg-transparent border-0 ${
            tab === "certificate" ? "underline underline-offset-8 decoration-4" : "no-underline"
          }`}
        >
          Certificate
        </button>
        --
      </h1>

      {tab === "experience" && (
        <h2 className="mb-5 text-xs italic tracking-wider text-center font-extralight lg:text-base mobile-m:text-sm max-lg:-mt-3">
          <span className="font-medium">Internships</span>,{" "}
          <span className="font-medium">freelance work</span>, and{" "}
          <span className="font-medium">personal projects</span>.
        </h2>
      )}

      {tab === "certificate" && (
        <h2 className="mb-5 text-xs italic tracking-wider text-center font-extralight lg:text-base mobile-m:text-sm max-lg:-mt-3">
          <span className="font-medium">Certifications</span> and{" "}
          <span className="font-medium">credentials</span> earned along the way.
        </h2>
      )}

      {/* EXPERIENCE TAB */}
      {tab === "experience" && (
        <div data-timeline>
          <div className="absolute left-4 sm:left-32 lg:left-44 w-px top-24 sm:top-20 lg:top-32 bottom-9 lg:bottom-10 bg-[#C7EEFF]"></div>
          <div
            className="timeline-circle absolute sm:w-5 sm:h-5 w-4 h-4 bg-[#0077C0] top-24 sm:top-20 lg:top-32 rounded-full left-4 sm:left-32 lg:left-44"
            style={{ transform: "translateX(-50%)", zIndex: 2 }}
          ></div>

          <div className="mt-8 mb-4 space-y-12 timeline-content lg:mt-12">
            {experience.map((item) => (
              <div key={`${item.company}-${item.position}`} className="relative flex">
                <div className="flex">
                  <div className="max-sm:hidden font-light tracking-widest lg:w-36 w-[6.5rem] lg:text-base text-sm">
                    {item.startDate} - <span className="text-right">{item.endDate ?? "Present"}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center opacity-0">
                  <div className="w-4 h-4 rounded-full sm:w-5 sm:h-5"></div>
                </div>
                <div className="ml-1 lg:ml-10 sm:ml-5">
                  <div className="text-xs font-light tracking-widest sm:hidden">
                    {item.startDate} - {item.endDate ?? "Present"}
                  </div>
                  <h2 className="mb-2 text-base font-semibold tracking-wide lg:text-lg sm:font-bold">
                    {item.company} - {item.position}
                  </h2>
                  <p className="text-sm font-light leading-normal tracking-wider text-justify lg:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CERTIFICATE TAB */}
      {tab === "certificate" && (
        <div data-timeline>
          <div className="absolute left-4 sm:left-32 lg:left-44 w-px top-24 sm:top-20 lg:top-32 bottom-9 lg:bottom-10 bg-[#C7EEFF]"></div>
          <div
            className="timeline-circle absolute sm:w-5 sm:h-5 w-4 h-4 bg-[#0077C0] top-24 sm:top-20 lg:top-32 rounded-full left-4 sm:left-32 lg:left-44"
            style={{ transform: "translateX(-50%)", zIndex: 2 }}
          ></div>

          <div className="mt-8 mb-4 space-y-12 timeline-content lg:mt-12">
            {certificate.map((item) => (
              <div key={`${item.name}-${item.issuer}`} className="relative flex">
                <div className="flex">
                  <div className="max-sm:hidden font-light tracking-widest lg:w-36 w-[6.5rem] lg:text-base text-sm">
                    {item.startDate} {item.endDate ? `- ${item.endDate}` : ""}
                  </div>
                </div>
                <div className="flex flex-col items-center opacity-0">
                  <div className="w-4 h-4 rounded-full sm:w-5 sm:h-5"></div>
                </div>
                <div className="ml-1 lg:ml-10 sm:ml-5">
                  <div className="text-xs font-light tracking-widest sm:hidden">
                    {item.startDate} {item.endDate ? `- ${item.endDate}` : ""}
                  </div>

                  <h2 className="text-base font-semibold tracking-wide lg:text-lg sm:font-bold">
                    {item.name}
                  </h2>
                  <p className="mb-1 lg:mb-2 text-sm font-medium tracking-wide text-[#0077C0] lg:text-base">
                    {item.issuer}
                  </p>
                  {item.credentialId && (
                    <p className="mb-4 text-xs font-light tracking-wider text-gray-500 lg:text-sm">
                      Credential ID:{" "}
                      <span className="font-medium text-gray-600">{item.credentialId}</span>
                    </p>
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex group drop-shadow-[0_1px_3px_rgb(199,238,255)] hover:brightness-150 font-semibold bg-black border-1 border-[#C7EEFF] items-center justify-center rounded-full sm:px-4 px-3 sm:py-1.5 py-1 transition"
                  >
                    <span className="sm:text-xs text-sm text-[#C7EEFF]">Show Credential</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 lg:w-5 lg:h-5 ml-1 group-hover:translate-x-1.5 transition group-hover:-translate-y-0.5"
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
      )}
    </div>
  );
}