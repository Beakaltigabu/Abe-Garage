import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./CustomerProfile.module.css";
import VehicleSection from "../../../Components/Admin/VehicleSection/VehicleSection";
import CustomerOrders from "../../../Components/Admin/CustomerOrders/CustomerOrders";
import CustomerCard from "../CustomerCard/CustomerCard";
import VehicleService from "../../../../Services/vehicle.service";

const CustomerProfile = () => {
  const { customer_id } = useParams();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, [customer_id]);

  const fetchVehicles = async () => {
    try {
      const response = await VehicleService.getVehicle(customer_id);
      setVehicles(response);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to fetch vehicles. Please try again.");
    }
  };

  const handleVehicleAdded = () => {
    fetchVehicles();
    toast.success("Vehicle added successfully!");
  };

  const handleVehicleDeleted = () => {
    fetchVehicles();
    toast.success("Vehicle deleted successfully!");
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className={styles.profileContainer}>
        <CustomerCard customerIdProp={customer_id} />
        <VehicleSection
          customer_id={customer_id}
          vehicles={vehicles}
          setVehicles={setVehicles}
          onVehicleAdded={handleVehicleAdded}
          onVehicleDeleted={handleVehicleDeleted}
        />
        <CustomerOrders customer_id={customer_id} />
      </div>
    </div>
  );
};

export default CustomerProfile;

