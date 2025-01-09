import React from "react";
import AdminMenu from "../../../Components/Admin/AdminMenu/AdminMenues";
import AddCustomerForm from "../../../Components/Admin/AddCustomerForm/AddCustomerForm";
import style from "./AddCustomer.module.css";

const AddCustomer = () => {
  return (
    <div className={style.container}>
      <AdminMenu />
      <div className={style.content}>
        <h1 className={style.title}>Add a new Customer<span className={style.orangeUnderline}>____</span></h1>
        <AddCustomerForm />
      </div>
    </div>
  );
};

export default AddCustomer;
