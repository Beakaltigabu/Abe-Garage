import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaCar,
  FaArrowLeft,
  FaHashtag,
  FaTags,
  FaPalette,
  FaTachometerAlt,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import styles from './EditVehicle.module.css';
import vehicleService from '../../../../Services/vehicle.service';
import Loading from '../../../Components/Loading/Loading';

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getVehicleById(id);
      setVehicle(data.vehicle);
    } catch (error) {
      toast.error('Failed to load vehicle details');
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const result = await vehicleService.updateVehicle(id, vehicle);
      if (result.success) {
        toast.success('Vehicle updated successfully!');
        navigate('/admin/step-three', {
          state: {
            customer_id: vehicle.customer_id,
            vehicle_id: vehicle.vehicle_id
          }
        });
      }
    } catch (error) {
      toast.error('Failed to update vehicle');
      console.error('Error updating vehicle:', error);
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
  onClick={() => navigate('/admin/step-three', {
    state: {
      customer_id: vehicle.customer_id,
      vehicle_id: vehicle.vehicle_id
    }
  })}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <FaArrowLeft /> Back to Service Details
</motion.button>
          <div className={styles.vehicleMeta}>
            <h1 className={styles.title}>
              Vehicle #{vehicle.vehicle_id}
            </h1>
            <div className={styles.vehicleIdentifier}>
              {vehicle.vehicle_make} {vehicle.vehicle_model} ({vehicle.vehicle_year})
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <motion.form
          onSubmit={handleUpdate}
          className={styles.formContainer}
        >
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                <FaCar className={styles.inputIcon} />
                <span>Make</span>
              </label>
              <input
                type="text"
                name="vehicle_make"
                value={vehicle.vehicle_make || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaCar className={styles.inputIcon} />
                <span>Model</span>
              </label>
              <input
                type="text"
                name="vehicle_model"
                value={vehicle.vehicle_model || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaCar className={styles.inputIcon} />
                <span>Year</span>
              </label>
              <input
                type="number"
                name="vehicle_year"
                value={vehicle.vehicle_year || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaPalette className={styles.inputIcon} />
                <span>Color</span>
              </label>
              <input
                type="text"
                name="vehicle_color"
                value={vehicle.vehicle_color || ''}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaTags className={styles.inputIcon} />
                <span>Tag</span>
              </label>
              <input
                type="text"
                name="vehicle_tag"
                value={vehicle.vehicle_tag || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaTachometerAlt className={styles.inputIcon} />
                <span>Mileage</span>
              </label>
              <input
                type="number"
                name="vehicle_mileage"
                value={vehicle.vehicle_mileage || ''}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaHashtag className={styles.inputIcon} />
                <span>Serial Number</span>
              </label>
              <input
                type="text"
                name="vehicle_serial"
                value={vehicle.vehicle_serial || ''}
                onChange={handleChange}
                required
              />
            </div>
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

export default EditVehicle;
