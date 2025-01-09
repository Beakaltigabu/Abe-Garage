import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from "./VehicleSection.module.css";
import VehicleService from "../../../../Services/vehicle.service";
import AddVehicleForm from "../AddVehicleForm/AddVehicleForm";
import Loader from "../../Loading/Loading";

const VehicleSection = ({ customer_id, vehicles, setVehicles, onVehicleAdded, onVehicleDeleted, customerName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, [customer_id]);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await VehicleService.getVehicle(customer_id);
      setVehicles(response);
      setError("");
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to fetch vehicles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVehicle = () => {
    setShowAddVehicleForm(!showAddVehicleForm);
  };

  const handleVehicleAdded = () => {
    setShowAddVehicleForm(false);
    onVehicleAdded();
  };

  const handleDeleteVehicle = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setShowDeleteModal(true);
  };

  const confirmDeleteVehicle = async () => {
    try {
      await VehicleService.deleteVehicle(vehicleToDelete);
      onVehicleDeleted();
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      onVehicleDeleted();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.vehiclesSection}>
      <h3 className={styles.sectionTitle}>Vehicles of {customerName}</h3>
      {vehicles.length > 0 ? (
        <Table striped bordered hover className={styles.vehicleTable}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Type</th>
              <th>Color</th>
              <th>Mileage</th>
              <th>Tag</th>
              <th>Serial</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              vehicle && typeof vehicle === 'object' && (
                <tr key={vehicle.vehicle_id}>
                  <td>{vehicle.vehicle_year}</td>
                  <td>{vehicle.vehicle_make}</td>
                  <td>{vehicle.vehicle_model}</td>
                  <td>{vehicle.vehicle_type}</td>
                  <td>{vehicle.vehicle_color}</td>
                  <td>{vehicle.vehicle_mileage}</td>
                  <td>{vehicle.vehicle_tag}</td>
                  <td>{vehicle.vehicle_serial}</td>
                  <td>
                    <Link to={`/admin/edit-vehicle/${vehicle.vehicle_id}`}>
                      <Button variant="link" className={styles.actionButton}>
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button variant="link" className={styles.actionButton} onClick={() => handleDeleteVehicle(vehicle.vehicle_id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
      ) : (
        <p className={styles.noDataFound}>No vehicles found for this customer.</p>
      )}
      <Button onClick={handleAddVehicle} className={styles.addVehicleButton}>
        {showAddVehicleForm ? 'Cancel' : 'Add New Vehicle'}
      </Button>

      {showAddVehicleForm && (
        <AddVehicleForm customer_id={customer_id} onVehicleAdded={handleVehicleAdded} />
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this vehicle?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteVehicle}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VehicleSection;
