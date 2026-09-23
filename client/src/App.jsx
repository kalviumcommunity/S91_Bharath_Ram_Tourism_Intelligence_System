import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./AuthContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Destinations from "./pages/Destinations";

import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />

          <div className="app-body">
            <Sidebar />

            <main className="page">
              <Routes>
                {/* Protected pages */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/visitors"
                  element={
                    <ProtectedRoute>
                      <Visitors />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/destinations"
                  element={
                    <ProtectedRoute>
                      <Destinations />
                    </ProtectedRoute>
                  }
                />

                {/* Authentication */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Anything else goes home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
