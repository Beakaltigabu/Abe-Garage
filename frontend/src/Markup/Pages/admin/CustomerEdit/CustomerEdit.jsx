import React from "react";
import styles from "./CustomerEdit.module.css";
import SideBar from "../../../Components/Admin/AdminMenu/AdminMenues";
import EditCustomerForm from "../../../Components/Admin/EditCustomer/EditCustomer";

function EditCustomer() {
  return (
    <div className={styles.container}>
      <SideBar />
      <EditCustomerForm />
    </div>
  );
}

export default EditCustomer;
