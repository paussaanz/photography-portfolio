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
import { useEffect, useState } from "react"
import Cursor from "./components/Cursor/Cursor"

function App() {
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavVisible(lastScrollY > currentScrollY || currentScrollY < 30);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Cursor /> {/* cursor animation motion graph */}
      
      <header className={`fixed-top ${navVisible ? 'animated' : 'header-hide'}`}>
        <Navbar visible={navVisible} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/editorials" element={<EditorialsPage />} />
          <Route path="/portfolio/project" element={<PortfolioDetailPage />} />
          <Route path="/editorials/projects" element={<EditorialsDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
