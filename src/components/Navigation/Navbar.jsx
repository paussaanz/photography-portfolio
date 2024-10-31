import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  const isPrimaryPage = location.pathname === '' || location.pathname === '/editorials' || location.pathname === '/portfolio';


  return (
    <nav className={`cus-navbar cus-navbar--expand-lg background--transparent`}>
      <div className="cus-navbar__container cus-navbar__container-fluid p--y-4">
        <div className="flex flex--g-1">
          <ul className="cus-navbar__links m--r-auto m--b-2 m--b-lg-0">
            <li className="cus-navbar__item">
              <Link reloadDocument to="/portfolio" className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Portfolio
              </Link>
            </li>
            <li className="cus-navbar__item">
              <Link reloadDocument to="/editorials" className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Editorials
              </Link>
            </li>
            <li className="cus-navbar__item">
              <Link reloadDocument to="/about" className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                About SYP!
              </Link>

            </li>
          </ul>
        </div>
        <Link reloadDocument to="/" className="cus-navbar__logo--centered">
          <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" />
        </Link>
        <div className="flex">
          <ul className="cus-navbar__links m--l--auto m--b-2 m--b-lg-0">
            <li className="nav-item">
              <Link reloadDocument to="/contact" className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
