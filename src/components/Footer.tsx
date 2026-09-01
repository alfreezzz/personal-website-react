export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container max-w-none py-6 mx-auto text-center border xl:rounded-t-full rounded-t-3xl border-[#0077C0]">
      <p className="font-sans text-xs tracking-wider sm:text-sm">
        Made with ❤️ by
        <a
          href="https://www.instagram.com/alfreezzz_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00a3c0] text-base hover:underline decoration-2 decoration-dashed ml-1 font-pixelsans"
        >
          Alfriza Akhmad Rahadi.
        </a>
        <span className="max-mobile-m:hidden">&copy;{year}</span>
      </p>
      <span className="text-sm mobile-m:hidden">&copy;{year}</span>
    </footer>
  );
}