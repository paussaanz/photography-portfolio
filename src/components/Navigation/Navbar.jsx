import { Link, useLocation } from "react-router-dom";
import PreloadLink from './PreLoadLink';

const Navbar = () => {

  const location = useLocation();

  const isPrimaryPage = location.pathname === '' || location.pathname === '/editorials'|| location.pathname === '/portfolio';


  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-transparent`}>
      <div className="container-fluid navbar-container py-4">
        <div className="d-flex flex-grow-1">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <PreloadLink to="/portfolio" component={() => import('../../pages/PortfolioPage')} className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
                Portfolio
              </PreloadLink>
            </li>
            <li className="nav-item">
              <PreloadLink to="/editorials" component={() => import('../../pages/EditorialsPage')} className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
                Editorials
              </PreloadLink>
            </li>
            <li className="nav-item">
              <PreloadLink to="/about" component={() => import('../../pages/AboutPage')} className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
                About me
              </PreloadLink>

            </li>
          </ul>
        </div>
        <PreloadLink to="/" component={() => import('../../pages/HomePage')} className={`navbar-brand-centered`}>
          <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" />
        </PreloadLink>
        <div className="d-flex">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <PreloadLink to="/contact" component={() => import('../../pages/ContactPage')} className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
                Contact
              </PreloadLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
