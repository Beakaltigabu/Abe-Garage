import React from "react";
import AdminDashboard from "../../../Components/Admin/AdminDashboard/AdminDashboard";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <AdminDashboard />
    </div>
  );
}

export default Dashboard;
