import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCar, FaHashtag, FaTags, FaPalette, FaTachometerAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import styles from "./AddVehicleForm.module.css";
import VehicleService from "../../../../Services/vehicle.service";

const AddVehicleForm = ({ customer_id, onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    customer_id: customer_id,
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending vehicle data:", formData);

    try {
      // Include customer_id in the form data
      const vehicleData = {
        ...formData,
        customer_id: customer_id
      };

      const result = await VehicleService.createVehicle(customer_id, vehicleData);

      if (result) {
        // Show success toast
        toast.success('Vehicle added successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        // Reset form
        setFormData({
          customer_id: customer_id,
          vehicle_year: "",
          vehicle_make: "",
          vehicle_model: "",
          vehicle_type: "",
          vehicle_mileage: "",
          vehicle_tag: "",
          vehicle_serial: "",
          vehicle_color: "",
        });

        // Notify parent component
        onVehicleAdded();
      }
    } catch (err) {
      console.error("Error occurred in handleSubmit:", err);

      // Show error toast
      toast.error('Failed to add vehicle. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };


  return (
    <motion.div
      className={styles.formContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>
              <FaCar className={styles.inputIcon} />
              <span>Year</span>
            </label>
            <input
              type="number"
              name="vehicle_year"
              value={formData.vehicle_year}
              onChange={handleChange}
              placeholder="Enter vehicle year"
              required
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <FaCar className={styles.inputIcon} />
              <span>Make</span>
            </label>
            <input
              type="text"
              name="vehicle_make"
              value={formData.vehicle_make}
              onChange={handleChange}
              placeholder="Enter vehicle make"
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
              value={formData.vehicle_model}
              onChange={handleChange}
              placeholder="Enter vehicle model"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <FaCar className={styles.inputIcon} />
              <span>Type</span>
            </label>
            <select
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={handleChange}
              required
            >
              <option value="">Select vehicle type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
              <option value="Coupe">Coupe</option>
              <option value="Wagon">Wagon</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>
              <FaTachometerAlt className={styles.inputIcon} />
              <span>Mileage</span>
            </label>
            <input
              type="number"
              name="vehicle_mileage"
              value={formData.vehicle_mileage}
              onChange={handleChange}
              placeholder="Enter vehicle mileage"
              min="0"
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
              value={formData.vehicle_tag}
              onChange={handleChange}
              placeholder="Enter vehicle tag"
              required
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
              value={formData.vehicle_serial}
              onChange={handleChange}
              placeholder="Enter vehicle serial"
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
              value={formData.vehicle_color}
              onChange={handleChange}
              placeholder="Enter vehicle color"
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
            Add Vehicle
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddVehicleForm;
