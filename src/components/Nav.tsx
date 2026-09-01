import { useState } from "react";
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

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-3 py-3 bg-black xl:px-32 sm:px-5 sm:py-5 bg-opacity-90">
      <button
        type="button"
        onClick={() => navigate("/#about")}
        className="text-xl font-pixelmono bg-black px-6 drop-shadow-[0_0px_4px_rgb(0,119,192)] rounded-lg py-1.5"
      >
        Alfreezzz_
      </button>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex lg:space-x-8 text-sm font-light tracking-wide bg-black drop-shadow-[0_0px_4px_rgb(0,119,192)] px-8 py-1.5 rounded-full">
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
        className="lg:hidden focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <div className="relative w-7 h-8 flex flex-col justify-center items-center space-y-1.5">
          <span
            className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
              open ? "rotate-45 translate-y-[8px]" : "translate-y-0"
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[8px]" : "translate-y-0"
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile Navigation */}
      {open && (
        <div className="absolute top-14 sm:top-[4.5rem] left-0 w-full bg-black bg-opacity-90 text-sm font-light flex flex-col space-y-4 px-5 py-5 lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavigate(link.href)}
              className="relative text-lg font-medium tracking-wide group text-left text-[#C7EEFF] bg-transparent border-0 p-0"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#0077C0] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}