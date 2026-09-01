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
            <div className="relative z-10 flex flex-col items-center justify-center w-full mx-2 sm:mx-5 xl:mx-32 text-center">
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
                className="mt-4 inline-flex group drop-shadow-[0_1px_3px_rgb(199,238,255)] hover:brightness-150 font-semibold bg-black border-1 border-[#C7EEFF] items-center justify-center rounded-lg sm:px-4 px-3 py-1.5 transition"
                >
                <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 mr-1 group-hover:-translate-x-1.5 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#C7EEFF"
                >
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
                <span className="sm:text-base text-sm text-[#C7EEFF]">Go back</span>
                </button>
            </div>
        </main>
    );
}