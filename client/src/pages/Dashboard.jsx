import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <DashboardCard
          title="Total Visitors"
          value="12,500"
        />

        <DashboardCard
          title="Destinations"
          value="35"
        />

        <DashboardCard
          title="Countries"
          value="18"
        />
      </div>
    </div>
  );
}

export default Dashboard;