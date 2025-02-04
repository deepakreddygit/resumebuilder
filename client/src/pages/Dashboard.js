import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css"; 

function Dashboard() {
  const { userName } = useContext(AuthContext);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <h1 className="fw-bold">Welcome, {userName}!</h1>
    </div>
  );
}

export default Dashboard;
