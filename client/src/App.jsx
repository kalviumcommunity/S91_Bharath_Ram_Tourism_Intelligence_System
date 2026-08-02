import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Destinations from "./pages/Destinations";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/visitors"
              element={<Visitors />}
            />

            <Route
              path="/destinations"
              element={<Destinations />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;