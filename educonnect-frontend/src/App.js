// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { APP_NAME } from "./utils/constants";
import "./App.css"; // Import the CSS file

function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => setUserRole(role);
  const handleLogout = () => setUserRole(null);

  return (
    <Router>
      <div className="app-container">
        <Navbar
          appName={APP_NAME}
          userRole={userRole}
          handleLogout={handleLogout}
        />
        <div className="content">
          <AppRoutes userRole={userRole} handleLogin={handleLogin} />
        </div>
        <Footer appName={APP_NAME} />
      </div>
    </Router>
  );
}

export default App;
