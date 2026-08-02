import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#2563eb",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>Tourism Intelligence System</h2>

      <div>
        <Link
          to="/"
          style={{ color: "white", marginRight: "15px" }}
        >
          Dashboard
        </Link>

        <Link
          to="/visitors"
          style={{ color: "white", marginRight: "15px" }}
        >
          Visitors
        </Link>

        <Link to="/destinations" style={{ color: "white" }}>
          Destinations
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;