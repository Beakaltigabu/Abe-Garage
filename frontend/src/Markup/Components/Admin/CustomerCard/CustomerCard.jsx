import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaChevronDown, FaEnvelope, FaPhone, FaUser, FaCircle } from 'react-icons/fa';
import styles from './CustomerCard.module.css';
import customerService from '../../../../Services/customer.service';

const CustomerCard = ({ customerIdProp }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customer_id: customerIdFromParams } = useParams();
  const { customer_id: customerIdFromState } = location.state || {};
  const [customer, setCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(true);

  const customer_id = customerIdProp || customerIdFromParams || customerIdFromState;

  useEffect(() => {
    if (customer_id) {
      fetchCustomerData(customer_id);
    }
  }, [customer_id]);

  const fetchCustomerData = async (id) => {
    try {
      const data = await customerService.getSingleCustomer(id);
      if (data && data.customer) {
        setCustomer(data.customer);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleEditCustomer = () => {
    navigate(`/admin/customers/edit-customer/${customer_id}`);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.customerInfo}>
          <div className={styles.customerInitials}>
            {customer && `${customer.customer_first_name[0]}${customer.customer_last_name[0]}`}
          </div>
          <div className={styles.customerName}>
            {customer
              ? `${customer.customer_first_name} ${customer.customer_last_name}`
              : "Loading..."}
            <span className={styles.statusIndicator}>
              <FaCircle className={customer?.active_customer_status ? styles.activeStatus : styles.inactiveStatus} />
              {customer?.active_customer_status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div className={styles.cardActions}>
          <motion.button
            className={styles.editButton}
            onClick={handleEditCustomer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> Edit
          </motion.button>
          <motion.button
            className={styles.toggleButton}
            onClick={() => setShowCustomerDetails(!showCustomerDetails)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: showCustomerDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showCustomerDetails && customer && (
          <motion.div
            className={styles.cardBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.detailItem}>
              <FaEnvelope className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{customer.customer_email}</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <FaPhone className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Phone Number</span>
                <span className={styles.detailValue}>{customer.customer_phone_number}</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <FaUser className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Customer ID</span>
                <span className={styles.detailValue}>#{customer.customer_id}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomerCard;
