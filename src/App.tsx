import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Experience from "./pages/Experience"
import Hero from "./pages/Hero"
import NotFound from "./pages/NotFound"
import Project from "./pages/Project"

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

  return (
    <div className="bg-black text-[#C7EEFF] min-h-screen">
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Experience />
              <Project onMissingProjectUrl={() => navigate("/not-found")} />
              <Contact />
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
