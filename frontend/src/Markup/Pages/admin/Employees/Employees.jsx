import React, { useEffect, useState } from "react";
import SideBar from "../../../Components/Admin/AdminMenu/AdminMenues";
import EmployeesList from "../../../Components/Admin/EmployeeList/EmployeeList/";
import styles from "./Employee.module.css";
function AllEmployees() {
  return (
    <div className={styles.container}>
      <SideBar />
      <EmployeesList />
    </div>
  );
}

export default AllEmployees;
