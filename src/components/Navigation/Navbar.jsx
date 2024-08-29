const Navbar = ({visible}) => {

  
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-transparent ${visible ? '' : 'hide'}`}>
      <div className="container-fluid navbar-container py-4">
        <div className="d-flex flex-grow-1">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-light" href="#">Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">Editorials</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">About me</a>
            </li>
          </ul>
        </div>

        <a className="navbar-brand-centered" href="#">
          <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" />
        </a>

        <div className="d-flex">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-light" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
