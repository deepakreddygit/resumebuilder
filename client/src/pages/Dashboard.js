import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const { isAuthenticated, userName } = useContext(AuthContext); 

  if (!isAuthenticated) {

    window.location.href = "/login";
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div className="text-center">
        <h1>Welcome, {userName}!</h1> 
      </div>
    </div>
  );
}

export default Dashboard;
