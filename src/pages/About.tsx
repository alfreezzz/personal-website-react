import { useState, useEffect, useRef } from "react";
import profileImage from "../assets/images/Iza.webp";
import cvFile from "../assets/files/CV_Alfriza Akhmad Rahadi.pdf";
import { skills } from "../data/skills";
import { techStackRegistry } from "../data/techStack";
import DepthText from "../components/DepthText";

interface GithubUser {
  public_repos: number;
}

export default function About() {
  const [repos, setRepos] = useState<number>(0);
  const [fileSize, setFileSize] = useState<string>("Loading...");
  const [visible, setVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/alfreezzz")
      .then((response) => response.json())
      .then((data: GithubUser) => setRepos(data.public_repos))
      .catch(() => setRepos(0));
  }, []);

  useEffect(() => {
    const getFileSize = async () => {
      try {
        const res = await fetch(cvFile, { method: "HEAD" });
        const bytes = res.headers.get("content-length");
        if (bytes) {
          const mb = Number(bytes) / (1024 * 1024);
          setFileSize(
            mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(Number(bytes) / 1024)} KB`
          );
        } else {
          setFileSize("PDF");
        }
      } catch {
        setFileSize("PDF");
      }
    };
    getFileSize();
  }, []);

  useEffect(() => {
    const PROXIMITY = 160;

    const handleMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('.glow-border').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const nearestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
        const nearestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
        const dist = Math.hypot(e.clientX - nearestX, e.clientY - nearestY);
        const intensity = Math.max(0, 1 - dist / PROXIMITY);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--intensity', `${intensity}`);
      });
    };

    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, []);

  // Trigger entrance animation saat section About masuk ke viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animasi hanya main sekali
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="about" ref={sectionRef} className="px-3 xl:px-32 sm:px-5">
      <div className="flex justify-center">
        <div className={visible ? "about-anim-title" : "opacity-0"}>
          <DepthText
            text="Me!"
            layers={34}
            depth={2.4}
            faceColor="#f8fafc"
            depthColor="#7c3aed"
            tilt={7.5}
            pointerTracking
            smoothing={0.14}
            perspective={900}
            autoOrbit
            orbitSpeed={0.35}
            fontWeight={900}
            className="text-center lg:text-6xl sm:text-4xl text-6xl font-bold tracking-wide -mb-4 sm:mb-4 lg:mb-0"
            shadow
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center px-3 about sm:flex-row lg:gap-0 sm:gap-12 lg:px-8 sm:px-5">
        {/* Image Container with Centered Circle */}
        <div
          className={`relative z-0 w-full py-8 sm:w-2/5 ${visible ? "about-anim-image" : "opacity-0"}`}
        >
          <div className="absolute w-10/12 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 lg:w-64 sm:w-56 aspect-square">
            <svg
              viewBox="0 0 220 220"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+40px)] h-[calc(100%+40px)] z-[-2]"
            >
              <defs>
                <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#0077c0", stopOpacity: 1 }} />
                  <stop offset="45%" style={{ stopColor: "#7c3aed", stopOpacity: 0.85 }} />
                  <stop offset="100%" style={{ stopColor: "#c7eeff", stopOpacity: 0 }} />
                </linearGradient>
                <mask id="fade-mask">
                  <circle cx="110" cy="110" r="105" fill="white" />
                  <rect x="0" y="110" width="220" height="110" fill="url(#bottomFadeGradient)" />
                </mask>
                <linearGradient id="bottomFadeGradient">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="110"
                cy="110"
                r="105"
                fill="none"
                stroke="url(#gradientLine)"
                strokeWidth="4"
                strokeLinecap="round"
                mask="url(#fade-mask)"
                filter="url(#ringGlow)"
                className="origin-center animate-spin-slow"
              />
            </svg>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-64 sm:w-56 w-10/12 aspect-square">
            <div className="w-full h-full rounded-full bg-linear-to-br from-[#0077C0] via-[#40A8DC] to-[#C7EEFF] shadow-[0_0_35px_-5px_rgba(0,119,192,0.6)] animate-pulse-slow"></div>
          </div>

          <img
            src={profileImage}
            alt="Iza"
            className="sm:w-72 w-full mx-auto relative z-10 drop-shadow-[0_0_12px_rgba(0,0,0,1)] hover:scale-105 transition hover:-translate-y-1"
          />
        </div>

        <div className="w-full sm:w-3/5">
          <div
            className={`font-light leading-relaxed tracking-wide text-[#E3E4ED] sm:text-sm lg:text-base ${visible ? "about-anim-text" : "opacity-0"}`}
          >
            <p>
              Hi, my name is <span className="font-medium">Alfriza Akhmad Rahadi</span>, you can
              call me <span className="font-medium">Iza</span> or{" "}
              <span className="font-medium">Alfriza</span>. I grew up in a small village located
              in <span className="font-medium">Bogor, West Java, Indonesia. </span>
              I am currently studying at{" "}
              <a
                className="font-medium underline"
                href="https://www.upi.edu/id"
                target="_blank"
                rel="noopener noreferrer"
              >
                Universitas Pendidikan Indonesia
              </a>{" "}
              with a <span className="font-medium bg-linear-to-r from-[#0077C0] to-[#003a60] px-0.5 rounded-sm">Computer Science</span> Major.
            </p>
            <br />
            <p>
              Since I was young, I have always been passionate about gaming. Playing games made
              me curious about how they were created, which led me to explore programming. I
              started learning basic coding, and over time, I became more interested in web
              development.
            </p>
          </div>

          <div className="flex lg:gap-2 sm:gap-1.5 gap-1.5 flex-wrap lg:mt-3 mt-2">
            {skills.map((skill, i) => {
              const item = techStackRegistry[skill.techStack];
              const colorClasses: Record<string, string> = {
                red: "border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10",
                cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10",
                sky: "border-sky-500/30 hover:border-sky-500/60 hover:bg-sky-500/10",
                neutral: "border-neutral-500/30 hover:border-neutral-500/60 hover:bg-neutral-500/10",
                rose: "border-rose-500/30 hover:border-rose-500/60 hover:bg-rose-500/10",
              };

              return (
                <span
                  key={skill.techStack}
                  style={visible ? { animationDelay: `${0.5 + i * 0.06}s` } : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full border bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-sm transition-colors duration-200 ${colorClasses[skill.color] ?? "border-gray-500/30 hover:border-gray-500/60 hover:bg-gray-500/10"} ${visible ? "about-anim-skill" : "opacity-0"}`}
                >
                  {item.type === "image" ? (
                    <img src={item.logo} alt={item.name} className="h-4 w-4" />
                  ) : (
                    <i className={item.logo}></i>
                  )}
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-3 px-5 others sm:flex-row lg:gap-4 sm:gap-3 sm:mt-5 mt-9">

        {/* Social Media */}
        <div
          style={visible ? { animationDelay: "0.55s" } : undefined}
          className={`glow-border w-full border border-[#C7EEFF]/20 bg-white/2 backdrop-blur-sm sm:aspect-2/1 max-sm:min-h-32 rounded-xl flex flex-col justify-center items-center p-3 relative overflow-hidden transition-colors duration-300 hover:border-[#C7EEFF]/50 ${visible ? "about-anim-card" : "opacity-0"}`}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 400 200"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <defs>
              <linearGradient id="netLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C7EEFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0077C0" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="netFade" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="netMask">
                <rect width="400" height="200" fill="url(#netFade)" />
              </mask>
            </defs>

            <g mask="url(#netMask)">
              <g stroke="url(#netLineGrad)" strokeWidth="1">
                <line x1="40" y1="30" x2="120" y2="70" />
                <line x1="120" y1="70" x2="90" y2="140" />
                <line x1="120" y1="70" x2="210" y2="50" />
                <line x1="210" y1="50" x2="280" y2="90" />
                <line x1="280" y1="90" x2="350" y2="40" />
                <line x1="280" y1="90" x2="330" y2="150" />
                <line x1="90" y1="140" x2="180" y2="160" />
                <line x1="180" y1="160" x2="280" y2="90" />
                <line x1="40" y1="30" x2="15" y2="110" />
                <line x1="15" y1="110" x2="90" y2="140" />
                <line x1="210" y1="50" x2="230" y2="10" />
                <line x1="180" y1="160" x2="120" y2="70" />
              </g>
              <g fill="#C7EEFF">
                <circle cx="40" cy="30" r="2.5" />
                <circle cx="120" cy="70" r="3" className="animate-pulse-slow" />
                <circle cx="90" cy="140" r="2.5" />
                <circle cx="210" cy="50" r="2.5" />
                <circle cx="280" cy="90" r="3.5" className="animate-pulse-slow" />
                <circle cx="350" cy="40" r="2" />
                <circle cx="330" cy="150" r="2.5" />
                <circle cx="180" cy="160" r="2.5" />
                <circle cx="15" cy="110" r="2" />
                <circle cx="230" cy="10" r="2" />
              </g>
            </g>
          </svg>

          <span className="relative z-10 mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400 lg:text-[10px]">
            Social Media
          </span>
          <div className="relative z-10 flex justify-center gap-5 sm:gap-3 lg:gap-4">
            <a
              href="https://github.com/alfreezzz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 lg:w-7 lg:h-7 sm:w-6 sm:h-6 transition-transform duration-200 hover:scale-110"
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>GitHub</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="#FF69B4"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alfriza-akhmad-rahadi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 lg:w-7 lg:h-7 sm:w-6 sm:h-6 transition-transform duration-200 hover:scale-110"
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>LinkedIn</title>
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.327-.025-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.35V9h3.413v1.561h.049c.475-.899 1.637-1.852 3.372-1.852 3.605 0 4.269 2.372 4.269 5.455v6.288zM5.337 7.433c-1.144 0-2.072-.93-2.072-2.075 0-1.144.928-2.073 2.072-2.073 1.145 0 2.073.929 2.073 2.073 0 1.145-.928 2.075-2.073 2.075zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                  fill="#0A66C2"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/alfreezzz_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 lg:w-7 lg:h-7 sm:w-6 sm:h-6 transition-transform duration-200 hover:scale-110"
            >
              <svg role="img" fill="#FF0069" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Instagram</title>
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hobbies */}
        <div
          style={visible ? { animationDelay: "0.62s" } : undefined}
          className={`glow-border hobbies w-full border border-[#C7EEFF]/20 sm:aspect-2/1 max-sm:min-h-32 rounded-xl flex flex-col justify-center items-center p-3 relative transition-colors duration-300 hover:border-[#C7EEFF]/50 ${visible ? "about-anim-card" : "opacity-0"}`}
        >
          <span className="relative mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-300 lg:text-[10px]">
            Hobbies
          </span>
          <div className="flex justify-center w-full gap-8">
            <svg
              className="w-14 h-14 lg:w-11 lg:h-11 sm:w-8 sm:h-8 transition-transform duration-200 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#9D00FF"
            >
              <path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm482-154q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-80-120q17 0 28.5-11.5T640-600q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600q0 17 11.5 28.5T600-560ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z" />
            </svg>
            <svg
              className="w-14 h-14 lg:w-11 lg:h-11 sm:w-8 sm:h-8 transition-transform duration-200 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#40E0D0"
            >
              <path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" />
            </svg>
          </div>
        </div>

        {/* Repository */}
        <div
          style={visible ? { animationDelay: "0.69s" } : undefined}
          className={`glow-border w-full border border-[#C7EEFF]/20 bg-white/2 backdrop-blur-sm sm:aspect-2/1 max-sm:min-h-32 rounded-xl flex flex-col justify-center items-center p-3 relative overflow-hidden transition-colors duration-300 hover:border-[#C7EEFF]/50 ${visible ? "about-anim-card" : "opacity-0"}`}
        >
          <svg
            className="absolute w-44 h-44 text-purple-200 opacity-[0.06] -right-4 -bottom-4 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.236 1.911 1.236 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>

          <span className="relative z-10 mb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400 lg:text-[10px]">
            Repository
          </span>
          <div className="relative z-10 flex items-center gap-1.5">
            <svg
              className="sm:w-6 sm:h-6 lg:h-9 lg:w-9 h-11 w-11 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5z"
              />
            </svg>
            <span className="lg:text-2xl text-3xl sm:text-lg font-bold text-purple-300 tabular-nums">
              {repos}
            </span>
            <span className="animate-blink border border-purple-400 h-7 sm:h-4 lg:h-6 mt-1"></span>
          </div>
          <span className="relative z-10 text-xs text-gray-500 sm:text-[10px] lg:text-xs">
            Total Public Repos
          </span>
        </div>

        {/* Download CV */}
        <div
          style={visible ? { animationDelay: "0.76s" } : undefined}
          className={`glow-border cv w-full border border-[#C7EEFF]/20 sm:aspect-2/1 max-sm:min-h-32 rounded-xl flex flex-col justify-center items-center p-3 ${visible ? "about-anim-card" : "opacity-0"}`}
        >
          <a
            href={cvFile}
            download
            className="cursor-pointer group/download relative flex gap-2 px-8 sm:px-5 lg:text-sm lg:px-6 sm:text-xs text-sm items-center py-3.5 sm:py-2.5 bg-[#5c5fe9] text-[#f1f1f1] rounded-full font-semibold shadow-lg shadow-[#5c5fe9]/20 transition-colors duration-200 hover:bg-[#4a4dd6] active:scale-[0.98]"
          >
            Download CV
            <div className="absolute text-[10px] uppercase scale-0 rounded-md py-1.5 px-2 bg-[#5c5fe9] left-1/2 mb-3 bottom-full -translate-x-1/2 group-hover/download:scale-100 origin-bottom transition-transform duration-200 shadow-lg before:content-[''] before:absolute before:top-full before:left-1/2 before:w-2.5 before:h-2.5 before:bg-[#5c5fe9] before:rotate-45 before:-translate-y-1/2 before:-translate-x-1/2">
              <span>{fileSize}</span>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes aboutFadeUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes aboutFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes aboutPopIn {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .about-anim-title {
          animation: aboutFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0s forwards;
        }

        .about-anim-image {
          animation: aboutFadeIn 0.8s ease-out 0.15s forwards;
        }

        .about-anim-text {
          animation: aboutFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }

        .about-anim-skill {
          animation: aboutFadeUp 0.5s ease-out forwards;
        }

        .about-anim-card {
          animation: aboutPopIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}