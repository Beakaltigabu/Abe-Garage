import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaChevronDown, FaCar, FaTachometerAlt, FaBarcode, FaTag } from 'react-icons/fa';
import styles from './VehicleCard.module.css';
import vehicleService from '../../../../Services/vehicle.service';

const VehicleCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle_id } = location.state || {};
  const [vehicle, setVehicle] = useState(null);
  const [showVehicleDetails, setShowVehicleDetails] = useState(true);

  useEffect(() => {
    if (vehicle_id) {
      fetchVehicleData(vehicle_id);
    }
  }, [vehicle_id]);

  const fetchVehicleData = async (id) => {
    try {
      const data = await vehicleService.getVehicleById(id);
      setVehicle(data.vehicle);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  const handleEditVehicle = () => {
    navigate(`/admin/edit-vehicle/${vehicle_id}`);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.vehicleInfo}>
          <div className={styles.vehicleInitials}>
            <FaCar />
          </div>
          <div className={styles.vehicleName}>
            {vehicle
              ? `${vehicle.vehicle_make} ${vehicle.vehicle_model} (${vehicle.vehicle_year})`
              : "Loading..."}
            <span className={styles.vehicleColor}>
              {vehicle?.vehicle_color}
            </span>
          </div>
        </div>
        <div className={styles.cardActions}>
          <motion.button
            className={styles.editButton}
            onClick={handleEditVehicle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> Edit
          </motion.button>
          <motion.button
            className={styles.toggleButton}
            onClick={() => setShowVehicleDetails(!showVehicleDetails)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: showVehicleDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showVehicleDetails && vehicle && (
          <motion.div
            className={styles.cardBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.detailItem}>
              <FaTachometerAlt className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Mileage</span>
                <span className={styles.detailValue}>{vehicle.vehicle_mileage}</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <FaTag className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Tag Number</span>
                <span className={styles.detailValue}>{vehicle.vehicle_tag}</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <FaBarcode className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Serial Number</span>
                <span className={styles.detailValue}>{vehicle.vehicle_serial}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VehicleCard;
