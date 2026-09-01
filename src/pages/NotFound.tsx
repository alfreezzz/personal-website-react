interface NotFoundProps {
  onBack: () => void;
}

export default function NotFound({ onBack }: NotFoundProps) {
  return (
    <main className="flex items-center justify-center h-screen px-4 pt-20 pb-12">
      <div className="flex flex-col items-center justify-center w-full mx-3 sm:mx-5 xl:mx-32 text-center">
        <h1 className="text-center lg:text-5xl mobile-m:text-4xl text-3xl font-bold tracking-wide lg:py-3 pb-5 sm:pb-4 bg-gradient-to-b from-[#0077C0] via-[#0077C0] to-[#C7EEFF] bg-clip-text text-transparent">
          -- 404 Not Found --
        </h1>
        <h2 className="mb-5 text-xs italic tracking-wider text-center font-extralight lg:text-base mobile-m:text-sm max-lg:-mt-3">
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