import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand">Pokémon Liste</Link>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toogle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navBarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to='/' className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/about' className="nav-link">À propos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;