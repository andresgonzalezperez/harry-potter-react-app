import { Link, NavLink } from "react-router-dom";
import hogwartsCrest from "../assets/images/hogwarts-crest.png";

function Navbar() {
  return (
    <nav className="hp-navbar">
      <div className="nav-container">
        <section className="nav-side">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
          <div className="nav-divider"></div>
          <NavLink to="/students/add" className="nav-item">
            Add <br />
            Student
          </NavLink>
        </section>

        <section className="nav-logo">
          <article className="logo-inner">
            <NavLink to="/" className="nav-item">
              <img src={hogwartsCrest} alt="hogwartsCrest" />
            </NavLink>
          </article>
        </section>

        <section className="nav-side">
          <NavLink to="/houses" className="nav-item">
            Houses
          </NavLink>
          <div className="nav-divider"></div>
          <NavLink to="/favorites" className="nav-item">
            Favorites
          </NavLink>
        </section>
      </div>
      <div className="nav-glow-line"></div>
    </nav>
  );
}

export default Navbar;
