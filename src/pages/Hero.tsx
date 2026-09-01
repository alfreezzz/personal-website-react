export default function Hero(){
    const buttons = [
        { href: "#contact", label: "Contact me!" },
        { href: "#project", label: "My projects" },
    ];

    return(
        <div id="hero" className="container py-5 pb-64 lg:pb-32 sm:pb-48">
            <div className="px-3 pt-56 xl:px-32 sm:px-5 lg:pt-44 sm:pt-60">
                <h3
                className="text-black font-pixelmono lg:text-2xl text-base sm:text-lg uppercase -ml-0.5 inline-block px-3"
                >
                Alfriza Akhmad Rahadi
                </h3>
                <br />
                <h1
                className="text-6xl lg:text-9xl sm:text-8xl font-pixelsans lg:-mt-4"
                >
                Hello World!
                </h1>
                <p
                className="text-sm lg:min-w-xl sm:text-base sm:max-w-md sm:font-light font-extralight"
                >
                I am Alfriza, a <span className="italic font-medium">Full-Stack Web Developer</span> Focused on Back-End & Dashboard Development.
                </p>
                <br />
                <div
                className="flex justify-start space-x-3 lg:space-x-5 sm:space-x-4"
                >
                {buttons.map((btn) => (
                    <a
                        key={btn.href}
                        href={btn.href}
                        className="inline-flex group drop-shadow-[0_1px_3px_rgb(199,238,255)] hover:brightness-150 font-semibold bg-black border-1 border-[#C7EEFF] items-center justify-center rounded-lg sm:px-4 px-3 py-1.5 transition"
                    >
                        <span className="sm:text-base text-sm text-[#C7EEFF]">{btn.label}</span>
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-1 group-hover:translate-x-1.5 transition group-hover:-translate-y-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#C7EEFF">
                        <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                        </svg>
                    </a>
                ))}
                </div>
            </div>
        </div>
    )
}