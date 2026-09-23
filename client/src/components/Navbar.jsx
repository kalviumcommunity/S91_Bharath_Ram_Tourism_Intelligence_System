import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { NAV_LINKS } from "../navLinks";

function Navbar() {
  const { token, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav aria-label="Main navigation" className="navbar">
      <ul className="nav-links">
        {NAV_LINKS.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="nav-links">
        {token ? (
          <>
            <li className="nav-user">Hi, {username}</li>
            <li>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
