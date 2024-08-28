import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navigation/Navbar"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import EditorialsDetailPage from "./pages/EditorialsDetailPage"
import EditorialsPage from "./pages/EditorialsPage"
import HomePage from "./pages/HomePage"
import PortfolioDetailPage from "./pages/PortfolioDetailPage"
import PortfolioPage from "./pages/PortfolioPage"

function App() {

  return (
    <>
      <header className="fixed-top">
        <Navbar/>
      </header>
      <main>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/" element={<EditorialsPage />} />
          <Route path="/" element={<PortfolioDetailPage />} />
          <Route path="/" element={<EditorialsDetailPage />} />
          <Route path="/" element={<AboutPage />} />
          <Route path="/" element={<ContactPage />} />
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default App
