import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Destinations from "./pages/Destinations";

import VisitorForm from "./components/VisitorForm";
import DestinationForm from "./components/DestinationForm";
import DestinationList from "./components/DestinationList";

import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1 }}>
          <Routes>

            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Visitors */}
            <Route
              path="/visitors"
              element={
                <>
                  <Visitors />
                  <VisitorForm />
                </>
              }
            />

            {/* Destinations */}
            <Route
              path="/destinations"
              element={
                <>
                  <Destinations />
                  <DestinationForm />
                  <DestinationList />
                </>
              }
            />

            {/* Authentication */}
            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;