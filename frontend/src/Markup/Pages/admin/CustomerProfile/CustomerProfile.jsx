import React from "react";
import styles from "./CustomerProfile.module.css";
import SideBar from "../../../Components/Admin/AdminMenu/AdminMenues";
import CustomerProfile from "../../../Components/Admin/CustomerProfile/CustomerProfile";

const CustomerProfilePage = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <CustomerProfile />
    </div>
  );
};

export default CustomerProfilePage;
