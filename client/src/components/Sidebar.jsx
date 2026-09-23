import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { NAV_LINKS } from "../navLinks";

function Sidebar() {
  const { token } = useAuth();

  const links = token
    ? NAV_LINKS
    : NAV_LINKS.filter((link) => link.to === "/");

  return (
    <aside className="sidebar">
      <nav aria-label="Sidebar">
        <h3 className="sidebar-title">Menu</h3>
        <ul className="sidebar-links">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
