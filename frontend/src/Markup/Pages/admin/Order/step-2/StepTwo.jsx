import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import CustomerCard from "../../../../Components/Admin/CustomerCard/CustomerCard";
import ChooseVehicle from "../../../../Components/Admin/ChooseVehicle/ChooseVehicle";
import styles from "./StepTwo.module.css";

const StepTwo = () => {
  const { customer_id } = useParams();
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.headerSection}>
        <motion.button
          className={styles.backButton}
          onClick={() => navigate('/admin/createorder')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Customer Search
        </motion.button>
        <h1 className={styles.pageTitle}>Create Order: Vehicle Selection</h1>
        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${styles.completed}`}>
            <span className={styles.stepNumber}>
              <FaCheck />
            </span>
            Customer Selection
          </div>
          <div className={`${styles.step} ${styles.active}`}>
            <span className={styles.stepNumber}>2</span>
            Vehicle Selection
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            Service Details
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.customerSection}>
          <CustomerCard customerIdProp={customer_id} />
        </div>

        <div className={styles.vehicleSection}>
          <ChooseVehicle />
        </div>
      </div>
    </motion.div>
  );
};

export default StepTwo;
