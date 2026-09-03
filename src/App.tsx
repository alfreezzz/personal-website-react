import { useEffect, useRef } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Experience from "./pages/Experience"
import Hero from "./pages/Hero"
import NotFound from "./pages/NotFound"
import Project from "./pages/Project"
import ScrollFloat from "./components/ScrollFloat"

function App() {
  const location = useLocation()
  const navigate = useNavigate()

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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="flex justify-center min-h-screen items-center">
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

      <Footer />
    </div>
  )
}

export default App
