// import { Link, useLocation } from "react-router-dom";
// import { useTransition } from "../../contexts/transitionContext";

// const Navbar = () => {
//   const { handleLinkClick } = useTransition();
//   const location = useLocation();

//   const isPrimaryPage = location.pathname === '' || location.pathname === '/editorials' || location.pathname === '/portfolio';


//   return (
//     <nav className={`cus-navbar cus-navbar--expand-lg background--transparent`}>
//       <div className="cus-navbar__container cus-navbar__container-fluid p--y-4">
//         <div className="flex flex--g-1">
//           <ul className="cus-navbar__links m--r-auto m--b-2 m--b-lg-0">
//             <li className="cus-navbar__item">
//               <a onClick={() => handleLinkClick('/portfolio')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 Portfolio
//               </a>
//             </li>
//             <li className="cus-navbar__item">
//               <a onClick={() => handleLinkClick('/editorials')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 Editorials
//               </a>
//             </li>
//             <li className="cus-navbar__item">
//               <a onClick={() => handleLinkClick('/about')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 About SYP!
//               </a>
//             </li>
//           </ul>
//         </div>
//         <a onClick={() => handleLinkClick('/')} className="cus-navbar__logo--centered">
//           <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" loading="lazy"/>
//         </a>
//         <div className="flex">
//           <ul className="cus-navbar__links m--l--auto m--b-2 m--b-lg-0">
//             <li className="nav-item">
//               <a onClick={() => handleLinkClick('/contact')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { useTransition } from "../../contexts/transitionContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { handleLinkClick } = useTransition();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(isMenuOpen, "HYODVS")
  const isPrimaryPage =
    location.pathname === "" ||
    location.pathname === "/editorials" ||
    location.pathname === "/portfolio";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log(isMenuOpen, "detrgrewfc")

  };

  return (
    <nav className="cus-navbar cus-navbar--expand-lg background--transparent">
      <div className="cus-navbar__container cus-navbar__container-fluid p--y-4">
        {/* Left Links */}
        <div className="cus-navbar__links cus-navbar__links--left">
          <ul className="cus-navbar__links m--r-auto m--b-2 m--b-lg-0">
            <li className="cus-navbar__item">
              <a
                onClick={() => handleLinkClick("/portfolio")}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Portfolio
              </a>
            </li>
            <li className="cus-navbar__item">
              <a
                onClick={() => handleLinkClick("/editorials")}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Editorials
              </a>
            </li>
            <li className="cus-navbar__item">
              <a
                onClick={() => handleLinkClick("/about")}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                About SYP!
              </a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <a
          onClick={() => handleLinkClick("/")}
          className="cus-navbar__logo cus-navbar__logo--centered"
        >
          <img
            src="/logo-white.svg"
            alt="Logo de Gunterz"
            width="39"
            height="61"
            loading="lazy"
          />
        </a>

        {/* Right Links */}
        <div className="cus-navbar__links cus-navbar__links--right">
          <ul className="cus-navbar__links m--l--auto m--b-2 m--b-lg-0">
            <li className="cus-navbar__item">
              <a
                onClick={() => handleLinkClick("/contact")}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Burger Menu */}
        <button
          className="cus-navbar__burger"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`cus-navbar__menu ${isMenuOpen ? "cus-navbar__menu--open" : ""
            }`}
        >
          <ul className="cus-navbar__list">
            <li className="cus-navbar__item">
              <a
                onClick={() => {
                  handleLinkClick("/portfolio");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Portfolio
              </a>
            </li>
            <li className="cus-navbar__item">
              <a
                onClick={() => {
                  handleLinkClick("/editorials");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Editorials
              </a>
            </li>
            <li className="cus-navbar__item">
              <a
                onClick={() => {
                  handleLinkClick("/about");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                About SYP!
              </a>
            </li>
            <li className="cus-navbar__item">
              <a
                onClick={() => {
                  handleLinkClick("/contact");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

