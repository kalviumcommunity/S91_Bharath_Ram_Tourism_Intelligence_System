import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const loadStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stats`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        const data = await response.json().catch(() => null);

        if (response.ok && data) {
          setStats(data);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      } catch (error) {
        if (error.name !== "AbortError") setStatus("error");
      }
    };

    loadStats();
    return () => controller.abort();
  }, [token]);

  const show = (value) =>
    status === "ready" ? value?.toLocaleString() ?? "—" : "…";

  return (
    <div>
      <h1>Dashboard</h1>

      {status === "error" && (
        <p role="alert">Could not load dashboard stats.</p>
      )}

      <div className="stats-grid">
        <DashboardCard title="Total Visitors" value={show(stats?.totalVisitors)} />
        <DashboardCard title="Destinations" value={show(stats?.destinations)} />
        <DashboardCard title="Countries" value={show(stats?.countries)} />
      </div>
    </div>
  );
}

export default Dashboard;
