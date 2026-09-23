import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import VisitorForm from "../components/VisitorForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [message, setMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchVisitors = async () => {
      setMessage("");

      try {
        const response = await fetch(`${API_URL}/api/visitors`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        const data = await response.json().catch(() => null);

        if (response.ok && Array.isArray(data)) {
          setVisitors(data);
          setStatus("ready");
        } else {
          setMessage(data?.message || "Failed to fetch visitors.");
          setStatus("error");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setMessage("Unable to connect to the server.");
          setStatus("error");
        }
      }
    };

    fetchVisitors();
    return () => controller.abort();
  }, [refreshKey, token]);

  return (
    <div>
      <h1>Visitors</h1>

      <VisitorForm onCreated={() => setRefreshKey((k) => k + 1)} />

      <h2>All visitors</h2>

      {status === "loading" && <p>Loading visitors...</p>}
      {status === "error" && <p role="alert">{message}</p>}

      {status === "ready" && visitors.length === 0 && (
        <p>No visitors yet.</p>
      )}

      {status === "ready" && visitors.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <caption>Registered visitors</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Country</th>
                <th scope="col">Travel type</th>
                <th scope="col">Budget</th>
                <th scope="col">Destination</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.age}</td>
                  <td>{v.country}</td>
                  <td>{v.travelType}</td>
                  <td>{v.budget?.toLocaleString()}</td>
                  <td>{v.destination?.name ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Visitors;
