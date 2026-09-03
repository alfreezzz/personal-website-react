import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import ScrollFloat from "./components/ScrollFloat"

const Hero = lazy(() => import("./pages/Hero"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const Experience = lazy(() => import("./pages/Experience"))
const NotFound = lazy(() => import("./pages/NotFound"))
const Project = lazy(() => import("./pages/Project"))

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference)
      return () => mediaQuery.removeEventListener("change", updateMotionPreference)
    }

    mediaQuery.addListener(updateMotionPreference)
    return () => mediaQuery.removeListener(updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!location.hash) return

    const id = requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.replace("#", ""))
      target?.scrollIntoView({ behavior: "smooth", block: "start" })
    })

    return () => cancelAnimationFrame(id)
  }, [location.hash, location.pathname])

  const goToProject = () => {
    navigate("/#project")
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="bg-black text-[#C7EEFF] scrollbar-thumb-[#0077c0] h-screen overflow-y-scroll">
      <Nav />

      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="flex justify-center min-h-screen items-center">
                  {prefersReducedMotion ? (
                    <h2 className="font-pixelmono text-[#C7EEFF] text-center text-[clamp(3.2rem,8vw,6rem)] leading-normal">
                      Who am I?
                    </h2>
                  ) : (
                    <ScrollFloat
                      scrollContainerRef={scrollContainerRef}
                      textClassName="font-pixelmono text-[#C7EEFF] text-center"
                      animationDuration={1}
                      ease='back.inOut(2)'
                      scrollStart='top bottom'
                      scrollEnd='center bottom-=50%'
                      stagger={0.03}
                    >
                      Who am I?
                    </ScrollFloat>
                  )}
                </div>
                <div className="flex flex-col min-w-0 gap-y-24 lg:gap-y-32">
                  <About />
                  <Experience />
                  <Project onMissingProjectUrl={() => navigate("/not-found")} />
                  <Contact />
                </div>
              </>
            }
          />
          <Route
            path="/not-found"
            element={<NotFound onBack={goToProject} />}
          />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  )
}

export default App
