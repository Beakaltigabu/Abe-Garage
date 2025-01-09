import React from "react";
import styles from "./EmployeeEdit.module.css";
import SideBar from "../../../Components/Admin/AdminMenu/AdminMenues";
import EditEmployeeForm from "../../../Components/Admin/EditEmployee/EditEmployee";
function EditEmployee() {
  return (
    <div className={styles.container}>
      <SideBar />
      <EditEmployeeForm />
    </div>
  );
}

export default EditEmployee;
