import React from "react";
import SideBar from "../../../Components/Admin/AdminMenu/AdminMenues";
import CustomersTable from "../../../Components/Admin/CustomerList/CustomerList";
import styles from "./Customers.module.css";

const Customers = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <CustomersTable />
    </div>
  );
};

export default Customers;
