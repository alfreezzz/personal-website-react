import TextType from "../components/TextType";
import ShapeGrid from "../components/ShapeGrid";

export default function Hero(){
    const buttons = [
        { href: "#contact", label: "Contact me!" },
        { href: "#project", label: "My projects" },
    ];

    return(
        <div id="hero" className="relative overflow-hidden pb-64 lg:pb-32 sm:pb-48 min-h-screen">
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <ShapeGrid 
                    speed={0.5}
                    squareSize={40}
                    direction='diagonal' // up, down, left, right, diagonal
                    borderColor="#2F293A"
                    hoverFillColor='#222'
                    shape='square' // square, hexagon, circle, triangle
                    hoverTrailAmount={0} // number of trailing hovered shapes (0 = no trail)
                    className="opacity-90"
                />
            </div>
            <div className="relative z-10 px-3 pt-56 xl:px-32 sm:px-5 lg:pt-44 sm:pt-60">

                {/* ===== Name Box — slide in dari kiri + sedikit overshoot ===== */}
                <div className="hero-anim-name relative inline-block mb-3 select-none">
                    <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-black" />
                    <div className="relative bg-[#001824] p-[3px] rounded-2xl">
                        <div className="relative rounded-xl bg-gradient-to-b from-[#3FC1FF] via-[#0077C0] to-[#00588F] px-4 py-1 flex items-center gap-2 overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40" />
                            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(135deg,#fff_0px,#fff_1px,transparent_1px,transparent_6px)]" />
                            <h3 className="relative text-black font-pixelmono lg:text-2xl text-base sm:text-lg uppercase tracking-wide">
                                Alfriza Akhmad Rahadi
                            </h3>
                        </div>
                    </div>
                </div>
                <br />

                {/* ===== Judul — scale up + fade, seperti "impact" title game ===== */}
                <div className="hero-anim-title">
                    <TextType 
                        text={["Hello World!", "Halooo!", "Sampurasun!", "こんにちは！", "你好！"]}
                        typingSpeed={80}
                        pauseDuration={2500}
                        showCursor
                        cursorCharacter="_"
                        deletingSpeed={50}
                        cursorBlinkDuration={0.5}
                        className="text-4xl mobile-m:text-5xl lg:text-9xl sm:text-8xl font-pixelsans mb-2"
                    />
                </div>

                {/* ===== Paragraf — fade in dari bawah, halus ===== */}
                <p
                    className="hero-anim-desc text-sm lg:min-w-xl sm:text-base sm:max-w-md sm:font-light font-extralight"
                >
                    I am Alfriza, a{" "}
                    <span className="italic font-medium">Full-Stack Web Developer</span>{" "}
                    Focused on Back-End & Dashboard Development.
                </p>
                <br />

                {/* ===== Buttons — pop-in bergantian dari bawah ===== */}
                <div className="flex justify-start space-x-4 lg:space-x-6 sm:space-x-5">
                    {buttons.map((btn, i) => (
                        <a
                            key={btn.href}
                            href={btn.href}
                            style={{ animationDelay: `${0.9 + i * 0.15}s` }}
                            className="hero-anim-btn group relative inline-block select-none"
                        >
                            <span className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-[#C7EEFF]/70 rounded-lg transition-transform duration-150 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-active:translate-x-0 group-active:translate-y-0" />

                            <span
                                className="relative flex items-center justify-center gap-1.5 rounded-lg border-2 border-[#C7EEFF] bg-black sm:px-5 px-4 py-1.5 overflow-hidden transition-transform duration-150 group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] group-active:translate-x-[3px] group-active:translate-y-[3px]"
                            >
                                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-[#C7EEFF]/25 to-transparent" />

                                <span className="relative sm:text-base text-sm font-semibold text-[#C7EEFF] group-hover:text-white transition-colors">
                                    {btn.label}
                                </span>
                                <svg
                                    className="relative w-4 h-4 lg:w-5 lg:h-5 text-[#C7EEFF] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform transition-colors"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                    fill="currentColor"
                                >
                                    <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                                </svg>
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes slideInLeftPop {
                    0% {
                        opacity: 0;
                        transform: translateX(-60px) rotate(-3deg);
                    }
                    70% {
                        opacity: 1;
                        transform: translateX(6px) rotate(0.5deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0) rotate(0deg);
                    }
                }

                @keyframes scaleFadeIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.85);
                        filter: blur(4px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                        filter: blur(0);
                    }
                }

                @keyframes fadeUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes btnPopIn {
                    0% {
                        opacity: 0;
                        transform: translateY(24px) scale(0.9);
                    }
                    60% {
                        opacity: 1;
                        transform: translateY(-3px) scale(1.03);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .hero-anim-name {
                    opacity: 0;
                    animation: slideInLeftPop 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
                }

                .hero-anim-title {
                    opacity: 0;
                    animation: scaleFadeIn 0.7s ease-out 0.4s forwards;
                }

                .hero-anim-desc {
                    opacity: 0;
                    animation: fadeUp 0.6s ease-out 0.75s forwards;
                }

                .hero-anim-btn {
                    opacity: 0;
                    animation: btnPopIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>
        </div>
    )
}