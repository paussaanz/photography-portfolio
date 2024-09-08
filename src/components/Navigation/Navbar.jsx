import { Link, useLocation } from "react-router-dom";

const Navbar = ({visible}) => {

  const location = useLocation();

  const isPrimaryPage = location.pathname === '/portfolio' || location.pathname === '/editorials';


  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-transparent ${visible ? '' : 'hide'}`}>
      <div className="container-fluid navbar-container py-4">
        <div className="d-flex flex-grow-1">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isPrimaryPage ? 'text-primary' : 'text-light'}`} to="/portfolio">Portfolio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isPrimaryPage ? 'text-primary' : 'text-light'}`} to="/editorials">Editorials</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isPrimaryPage ? 'text-primary' : 'text-light'}`} to="/about">About me</Link>
            </li>
          </ul>
        </div>

        <Link className="navbar-brand-centered" to="/">
          <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" />
        </Link>

        <div className="d-flex">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isPrimaryPage ? 'text-primary' : 'text-light'}`} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
