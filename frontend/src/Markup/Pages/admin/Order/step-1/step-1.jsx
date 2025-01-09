import React from "react";
import SideBar from "../../SideBar/SideBar";
import CustomerSearch from "../../../../Components/Admin/CustomerSearch/CustomerSearch";
import styles from "./step-1.module.css";

const CreateOrder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <CustomerSearch />
      </div>
    </div>
  );
};

export default CreateOrder;
