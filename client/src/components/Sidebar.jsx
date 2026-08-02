import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/visitors">Visitors</Link>
        </li>

        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;