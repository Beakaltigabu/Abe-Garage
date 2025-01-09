import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import styles from "./EditCustomer.module.css";
import customerService from "../../../../Services/customer.service";
import Loading from '../../../Components/Loading/Loading';


const EditCustomerForm = () => {
  const { customer_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    active_customer_status: 1,
    customer_email: "",
  });


  useEffect(() => {
    fetchCustomer();
  }, [customer_id]);


  const fetchCustomer = async () => {
    try {
      const response = await customerService.getSingleCustomer(customer_id);
      setCustomerData({
        ...response.customer,
        active_customer_status: response.customer.active_customer_status === 1 ? 1 : 0,
      });
    } catch (error) {
      toast.error("Failed to load customer information");
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerService.editCustomer(customer_id, customerData);
      toast.success("Customer updated successfully!");
      navigate(`/admin/step-two/${customer_id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update customer");
    }
  };


  if (loading) return <Loading />;


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
            onClick={() => navigate(`/admin/step-two/${customer_id}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Vehicle Selection
          </motion.button>
          <div className={styles.customerMeta}>
            <h1 className={styles.title}>
              Customer #{customer_id}
            </h1>
            <span className={`${styles.statusBadge} ${customerData.active_customer_status ? styles.statusActive : styles.statusInactive}`}>
              {customerData.active_customer_status ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>


      <div className={styles.mainContent}>
        <motion.form
          onSubmit={handleSubmit}
          className={styles.formContainer}
        >
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                <FaUser className={styles.inputIcon} />
                <span>First Name</span>
              </label>
              <input
                type="text"
                name="customer_first_name"
                value={customerData.customer_first_name}
                onChange={handleChange}
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
                value={customerData.customer_last_name}
                onChange={handleChange}
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
                value={customerData.customer_phone_number}
                onChange={handleChange}
                required
              />
            </div>


            <div className={styles.formGroup}>
              <label>
                <FaEnvelope className={styles.inputIcon} />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="customer_email"
                value={customerData.customer_email}
                onChange={handleChange}
                readOnly
                className={styles.readOnlyInput}
              />
            </div>
          </div>


          <div className={styles.statusSection}>
            <motion.button
              type="button"
              className={`${styles.statusToggleButton} ${customerData.active_customer_status ? styles.active : styles.inactive}`}
              onClick={() => handleChange({
                target: {
                  name: 'active_customer_status',
                  type: 'checkbox',
                  checked: !customerData.active_customer_status
                }
              })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {customerData.active_customer_status ? (
                <>
                  <FaCheck /> Active
                </>
              ) : (
                <>
                  <FaTimes /> Inactive
                </>
              )}
            </motion.button>
          </div>


          <div className={styles.buttonGroup}>
            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Changes
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};


export default EditCustomerForm;
