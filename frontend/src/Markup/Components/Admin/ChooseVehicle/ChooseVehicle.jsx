import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaArrowRight, FaPlus, FaTimes } from 'react-icons/fa';
import customerService from '../../../../Services/customer.service';
import AddVehicleForm from '../AddVehicleForm/AddVehicleForm';
import Loading from '../../Loading/Loading';
import styles from './ChooseVehicle.module.css';

const ChooseVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { customer_id } = useParams();

  useEffect(() => {
    fetchVehicles();
  }, [customer_id]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await customerService.getCustomerVehicles(customer_id);
      const vehiclesData = response && response.length > 0 ? response : [];
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseVehicle = (vehicle) => {
    navigate('/admin/step-three', {
      state: {
        customer_id,
        vehicle_id: vehicle.vehicle_id,
        vehicle_info: vehicle
      }
    });
  };

  const handleVehicleAdded = () => {
    setShowAddForm(false);
    fetchVehicles();
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      className={styles.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.headerSection}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Select Vehicle</h2>
          <div className={styles.orangeUnderline}></div>
        </div>
        <motion.button
          className={styles.addVehicleButton}
          onClick={() => setShowAddForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> Add New Vehicle
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className={styles.formOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.formWrapper}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <div className={styles.formHeader}>
                <h3>Add New Vehicle</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowAddForm(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <AddVehicleForm
                customer_id={customer_id}
                onVehicleAdded={handleVehicleAdded}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {vehicles.length > 0 ? (
        <div className={styles.vehiclesGrid}>
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.vehicle_id}
              className={styles.vehicleCard}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.vehicleIcon}>
                <FaCar />
              </div>
              <div className={styles.vehicleInfo}>
                <h3 className={styles.vehicleTitle}>
                  {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}
                </h3>
                <div className={styles.vehicleDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Tag:</span>
                    <span className={styles.detailValue}>{vehicle.vehicle_tag}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Color:</span>
                    <span className={styles.detailValue}>{vehicle.vehicle_color}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Mileage:</span>
                    <span className={styles.detailValue}>{vehicle.vehicle_mileage}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Serial:</span>
                    <span className={styles.detailValue}>{vehicle.vehicle_serial}</span>
                  </div>
                </div>
                <motion.button
                  className={styles.selectButton}
                  onClick={() => handleChooseVehicle(vehicle)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Select Vehicle <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={styles.noVehiclesWrapper}>
          <div className={styles.noVehiclesContent}>
            <FaCar className={styles.noVehiclesIcon} />
            <h3>No Vehicles Found</h3>
            <p>This customer doesn't have any vehicles registered yet.</p>
            <motion.button
              className={styles.addVehicleButton}
              onClick={() => setShowAddForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> Add New Vehicle
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChooseVehicle;
