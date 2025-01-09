import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from "./AddServiceForm.module.css";
import { addService } from '../../../../Services/service.service';

const AddServiceForm = ({ onServiceAdded }) => {
  const [newService, setNewService] = useState({
    service_name: "",
    service_description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addService(newService);
      toast.success('Service added successfully');
      setNewService({ service_name: "", service_description: "" });
      onServiceAdded();
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error('Failed to add service');
    }
  };

  return (
    <Container className={styles.formContainer}>
      <h2 className={styles.title}>Add New Service</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Service Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="service_name"
              value={newService.service_name}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="service_description"
              value={newService.service_description}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Button type="submit" className={styles.submitButton}>
          Add Service
        </Button>
      </Form>
    </Container>
  );
};

export default AddServiceForm;
