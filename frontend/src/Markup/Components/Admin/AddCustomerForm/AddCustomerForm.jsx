import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";
import customerService from "../../../../Services/customer.service";
import { toast } from 'react-toastify';
import styles from "./AddCustomerForm.module.css";

function AddCustomer() {
  const navigate = useNavigate();
  const [customerForm, setCustomerForm] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    customer_email: "",
    active_customer_status: 1,
    customer_added_date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const { customer_first_name, customer_last_name, customer_phone_number, customer_email } = customerForm;

    if (!customer_first_name.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!customer_last_name.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!customer_phone_number.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!customer_email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(customer_phone_number.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const result = await customerService.createCustomer(customerForm);

      // Show success toast immediately
      toast.success('Customer added successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      // Clear form and navigate after delay
      setCustomerForm({
        customer_first_name: "",
        customer_last_name: "",
        customer_phone_number: "",
        customer_email: "",
        active_customer_status: 1,
        customer_added_date: new Date().toISOString(),
      });

      // Navigate after toast is shown
      setTimeout(() => {
        navigate("/admin/createorder");
      }, 2000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create customer", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };


  return (
    <motion.div
      className={styles.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <motion.button
            className={styles.backButton}
            onClick={() => navigate('/admin/createorder')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Customer Selection
          </motion.button>
          <h1 className={styles.title}>Add New Customer</h1>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>
                <FaUser className={styles.inputIcon} />
                <span>First Name</span>
              </label>
              <input
                type="text"
                name="customer_first_name"
                value={customerForm.customer_first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaUser className={styles.inputIcon} />
                <span>Last Name</span>
              </label>
              <input
                type="text"
                name="customer_last_name"
                value={customerForm.customer_last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaPhone className={styles.inputIcon} />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                name="customer_phone_number"
                value={customerForm.customer_phone_number}
                onChange={handleChange}
                placeholder="Enter phone number (10 digits)"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaEnvelope className={styles.inputIcon} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                name="customer_email"
                value={customerForm.customer_email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className={styles.buttonGroup}>
              <motion.button
                type="button"
                className={styles.cancelButton}
                onClick={() => navigate('/admin/createorder')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className={styles.submitButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Customer
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default AddCustomer;
