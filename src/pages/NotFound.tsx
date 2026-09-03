import FuzzyText from '../components/FuzzyText'
import CursorGrid from '../components/CursorGrid'

interface NotFoundProps {
    onBack: () => void;
}

export default function NotFound({ onBack }: NotFoundProps) {
    return (
        <main className="relative flex items-center justify-center min-h-screen overflow-hidden px-0 pt-20">
            <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto">
                <CursorGrid
                    cellSize={56}
                    color="#D946EF"
                    radius={180}
                    falloff="smooth"
                    holdTime={1600}
                    fadeDuration={1500}
                    lineWidth={1.1}
                    maxOpacity={0.9}
                    fillOpacity={0}
                    gridOpacity={0}
                    cellRadius={0}
                    clickPulse
                    pulseSpeed={420}
                    className="h-full w-full bg-transparent"
                />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center w-full mx-2 sm:mx-5 xl:mx-32 text-center animate-[notFoundIn_0.8s_ease-out_both]">
                <FuzzyText 
                    fontSize="8vw"
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover
                >
                    404 Not Found
                </FuzzyText>
                <h2 className="mt-3 mb-3 text-xs italic tracking-wider text-center font-extralight lg:text-base mobile-m:text-sm">
                    The page you are looking for is not available
                </h2>

                <button
                    type="button"
                    onClick={onBack}
                    className="group relative mt-4 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 sm:px-6 sm:py-2.5 overflow-hidden isolate transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
                >
                    {/* base fill */}
                    <span className="absolute inset-0 -z-10 rounded-full bg-black/60 backdrop-blur-sm border border-[#C7EEFF]/40 transition-colors duration-300 group-hover:border-[#C7EEFF]/90" />

                    {/* soft glow yang muncul saat hover */}
                    <span className="absolute inset-0 -z-20 rounded-full bg-[#C7EEFF] blur-xl opacity-0 scale-90 transition-all duration-300 group-hover:opacity-40 group-hover:scale-110" />

                    {/* gradient sheen halus yang bergerak */}
                    <span className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(115deg,transparent_20%,rgba(199,238,255,0.35)_50%,transparent_80%)] bg-size-[200%_100%] bg-position-[100%_0] group-hover:bg-position-[0%_0]" />

                    <svg
                        className="relative w-4 h-4 lg:w-5 lg:h-5 text-[#C7EEFF] group-hover:-translate-x-1 transition-transform duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                    >
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                    <span className="relative sm:text-base text-sm font-medium text-[#C7EEFF] group-hover:text-white transition-colors duration-300">
                        Go back
                    </span>
                </button>
            </div>
            <style>{`
                @keyframes notFoundIn {
                    from {
                        opacity: 0;
                        transform: translateY(24px) scale(0.98);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}
            </style>
        </main>
    );
}