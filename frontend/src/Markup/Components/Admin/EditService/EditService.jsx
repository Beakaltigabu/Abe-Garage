import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from './EditService.module.css';
import { getServiceById, updateService } from '../../../../Services/service.service';

const EditService = () => {
  const { service_id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({ service_name: '', service_description: '' });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(service_id);
        setService(data.service);
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Failed to fetch service details');
      }
    };
    fetchService();
  }, [service_id]);

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService(service_id, service);
      toast.success('Service updated successfully');
      setTimeout(() => {
        navigate('/admin/services');
      }, 2000);
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
    }
  };

  return (
    <Container>
      <h1 className={styles.title}>Edit Service</h1>
      <Card className={styles.card}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>Service Name</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="service_name"
                  value={service.service_name}
                  onChange={handleChange}
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
                  value={service.service_description}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Button type="submit" className={styles.submitButton}>Update Service</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditService;
