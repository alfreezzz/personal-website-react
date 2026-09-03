import { useEffect, useState } from "react";
import PixelSnow from "./PixelSnow";

export default function Footer() {
  const year = new Date().getFullYear();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return (
    <footer 
      style={{ width: '100%', height: 'auto', position: 'relative' }} 
      className="max-w-none py-6 mx-auto text-center border rounded-t-xl border-[#E3E4ED]/20 backdrop-blur-md shadow-[0_0px_4px_rgb(0,119,192)]">
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none">
            <PixelSnow 
              color="#E3E4ED"
              flakeSize={0.01}
              minFlakeSize={1.25}
              pixelResolution={1000}
              speed={1.25}
              density={0.7}
              direction={125}
              brightness={1}
              depthFade={8}
              farPlane={20}
              gamma={0.4545}
              variant="snowflake"
            />
          </div>
        )}
      <p className="font-sans text-xs tracking-wider sm:text-sm">
        Made with ❤️ by
        <a
          href="https://www.instagram.com/alfreezzz_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00a3c0] text-base hover:underline decoration-2 decoration-dashed ml-1 font-pixelsans"
        >
          Alfriza Akhmad Rahadi.
        </a>{" "}
        <span className="max-mobile-m:hidden">&copy;{year}</span>
      </p>
      <span className="text-sm mobile-m:hidden">&copy;{year}</span>
    </footer>
  );
}