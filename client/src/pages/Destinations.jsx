import { useState } from "react";
import DestinationForm from "../components/DestinationForm";
import DestinationList from "../components/DestinationList";
import { useAuth } from "../AuthContext";

function Destinations() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { token } = useAuth();

  return (
    <div>
      <h1>Destinations</h1>

      {token && (
        <DestinationForm onCreated={() => setRefreshKey((k) => k + 1)} />
      )}

      <DestinationList refreshKey={refreshKey} />
    </div>
  );
}

export default Destinations;
