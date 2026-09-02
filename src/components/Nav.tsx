import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NavLink {
  href: string;
  label: string;
}

export default function Nav() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { href: "#hero", label: "Hero" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#project", label: "Project" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavigate = (href: string) => {
    setOpen(false);
    navigate(`/${href}`);
  };

  // kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-3 sm:top-5 left-0 z-50 flex justify-center w-full px-3 sm:px-5 xl:px-32 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between w-full max-w-5xl gap-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full pl-5 pr-2 py-2 sm:pr-3 shadow-[0_0px_4px_rgb(0,119,192)]">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/#about")}
            className="text-base sm:text-lg font-pixelmono drop-shadow-[0_0px_4px_rgb(0,119,192)] whitespace-nowrap"
          >
            Alfreezzz_
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex sm:items-center sm:space-x-7 text-sm font-light tracking-wide pr-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className="relative group text-[#C7EEFF] bg-transparent border-0 p-0"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#0077C0] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden relative z-50 flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-[#C7EEFF] rounded-full transition-all duration-300 origin-center ${
                  open ? "rotate-45 translate-y-[7px]" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-[#C7EEFF] rounded-full transition-all duration-300 ${
                  open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-[#C7EEFF] rounded-full transition-all duration-300 origin-center ${
                  open ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Overlay gelap — klik untuk menutup */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed top-[4.5rem] left-3 right-3 z-50 sm:hidden transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col overflow-hidden bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-2">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavigate(link.href)}
              style={{ transitionDelay: open ? `${i * 60 + 80}ms` : "0ms" }}
              className={`nav-mobile-item flex items-center justify-between text-left text-base font-medium tracking-wide text-[#C7EEFF] bg-transparent border-0 px-4 py-3.5 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-[0.98] ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
              }`}
            >
              <span>{link.label}</span>
              <svg
                className="w-4 h-4 text-[#0077C0]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}