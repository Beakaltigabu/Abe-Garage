import React from "react";
import SideBar from "../../../Components/Admin/AdminMenu/AdminMenues";
import styles from "./AddEmployee.module.css";
import AddEmployeeForm from "../../../Components/Admin/AddEmployeeForm/AddEmployeeForm";

function AddEmployee() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <AddEmployeeForm />
      </div>
    </div>
  );
}

export default AddEmployee;
