import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Form, Pagination, Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import styles from "./ServiceList.module.css";
import { deleteService } from '../../../../Services/service.service';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(8);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:2030/api/services");
      if (response.data && response.data.services) {
        setServices(response.data.services);
      } else {
        console.error("Unexpected data format received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/services/edit/${id}`);
  };

  const handleDelete = (id) => {
    setServiceToDelete(id);
    setShowDeleteModal(true);
    setErrorMessage("");
  };

  const confirmDelete = async () => {
    try {
      await deleteService(serviceToDelete);
      setServices(services.filter(service => service.service_id !== serviceToDelete));
      setShowDeleteModal(false);
      toast.success('Service deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const { referenceCount } = error.response.data;
        setErrorMessage(`This service is referenced in ${referenceCount} active order(s). It cannot be deleted.`);
      } else {
        console.error('Error deleting service:', error);
        setErrorMessage('Failed to delete service');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredServices = services.filter(
    (service) =>
      service?.service_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service?.service_description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
      {/* <Row>
        <Col>
          <h1 className={styles.title}>
            Services<span className={styles.titleUnderline}>___</span>
          </h1>
        </Col>
      </Row> */}
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <Form.Control
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </Col>
      </Row>
      <Row>
        {currentServices.map((service) => (
          <Col key={service.service_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className={styles.serviceCard}>
              <Card.Body>
                <Card.Title>{service.service_name}</Card.Title>
                <Card.Text>{service.service_description}</Card.Text>
                <div className={styles.cardActions}>
                  <Button
                    variant="link"
                    className={styles.actionButton}
                    onClick={() => handleEdit(service.service_id)}
                  >
                    <FaEdit className={styles.actionIcon} />
                  </Button>
                  <Button
                    variant="link"
                    className={styles.actionButton}
                    onClick={() => handleDelete(service.service_id)}
                  >
                    <FaTrashAlt className={styles.actionIcon} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastService >= filteredServices.length}
            />
          </Pagination>
        </Col>
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage ? (
            <p className="text-danger">{errorMessage}</p>
          ) : (
            <p>Are you sure you want to delete this service?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          {!errorMessage && (
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ServiceList;
