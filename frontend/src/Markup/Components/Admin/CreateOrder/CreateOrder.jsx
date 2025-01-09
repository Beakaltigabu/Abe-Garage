import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createOrder } from '../../../../Services/order.service';
import * as serviceService from '../../../../Services/service.service';
import EmployeeService from '../../../../Services/employee.service';
import { Form, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCheck, FaTools, FaUserCog, FaClipboardList } from 'react-icons/fa';
import styles from './CreateOrder.module.css';
import CustomerCard from '../../../Components/Admin/CustomerCard/CustomerCard';
import VehicleCard from '../../../Components/Admin/VehicleCard/VehicleCard';

const CreateOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customer_id, vehicle_id } = location.state || {};

  const [order, setOrder] = useState({
    employee_id: "",
    customer_id: customer_id || "",
    vehicle_id: vehicle_id || "",
    order_description: "",
    estimated_completion_date: "",
    order_services: [],
    order_total_price: "",
    additional_request: "",
    notes_for_internal_use: "",
    notes_for_customer: "",
    order_status: "received",
  });

  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchServices();
    fetchEmployees();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const data = await serviceService.getActiveServices();
      setServices(data.services || []);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeService.getAllEmployee();
      const filteredEmployees = data.employees.filter(emp =>
        emp.active_employee === 1 && emp.company_role_name === "Employee"
      );
      setEmployees(filteredEmployees || []);
    } catch (error) {
      toast.error('Failed to fetch employees');
    }
  };

  const handleBack = () => {
    navigate(`/admin/step-two/${customer_id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setOrder(prev => ({
      ...prev,
      order_services: checked
        ? [...prev.order_services, { service_id: parseInt(value), service_completed: 0 }]
        : prev.order_services.filter((service) => service.service_id !== parseInt(value)),
    }));
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!order.employee_id) newErrors.employee_id = 'Please select an employee';
    if (!order.order_description) newErrors.order_description = 'Please enter order description';
    if (!order.estimated_completion_date) newErrors.estimated_completion_date = 'Please select completion date';
    if (!order.order_total_price) newErrors.order_total_price = 'Please enter total price';
    if (order.order_services.length === 0) newErrors.services = 'Please select at least one service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await createOrder(order);
      toast.success('Order created successfully!');
      setTimeout(() => navigate('/admin/orders'), 2000);
    } catch (error) {
      toast.error('Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.headerSection}>
        <Container>
          <motion.button
            className={styles.backButton}
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Vehicle Selection
          </motion.button>

          <h1 className={styles.pageTitle}>Create New Order</h1>
          <div className={styles.stepIndicator}>
            <div className={`${styles.step} ${styles.completed}`}>
              <span className={styles.stepNumber}><FaCheck /></span>
              Customer Selection
            </div>
            <div className={`${styles.step} ${styles.completed}`}>
              <span className={styles.stepNumber}><FaCheck /></span>
              Vehicle Selection
            </div>
            <div className={`${styles.step} ${styles.active}`}>
              <span className={styles.stepNumber}>3</span>
              Service Details
            </div>
          </div>
        </Container>
      </div>

      <Container className={styles.mainContent}>
        <Form onSubmit={handleSubmit} noValidate>
          <div className={styles.cardsSection}>
            <CustomerCard customerId={order.customer_id} />
            <VehicleCard vehicleId={order.vehicle_id} />
          </div>

          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.cardHeaderContent}>
                <FaTools className={styles.headerIcon} />
                <span className={styles.cardHeaderTitle}>Available Services</span>
              </div>
            </Card.Header>
            <Card.Body className={styles.servicesBody}>
              {isLoading ? (
                <div className={styles.loadingState}>Loading services...</div>
              ) : services.length > 0 ? (
                <div className={styles.servicesGrid}>
                  {services.map((service) => (
                    <motion.div
                      key={service.service_id}
                      className={styles.serviceCard}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`service-${service.service_id}`}
                        value={service.service_id}
                        onChange={handleServiceChange}
                        isInvalid={!!errors.services}
                        label={
                          <div className={styles.serviceInfo}>
                            <h4>{service.service_name}</h4>
                            <p>{service.service_description}</p>
                            <span className={styles.servicePrice}>
                              ${service.service_price}
                            </span>
                          </div>
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={styles.noServices}>No services available</div>
              )}
              {errors.services && (
                <div className={styles.errorMessage}>{errors.services}</div>
              )}
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.cardHeaderContent}>
                <FaClipboardList className={styles.headerIcon} />
                <span className={styles.cardHeaderTitle}>Order Details</span>
              </div>
            </Card.Header>
            <Card.Body className={styles.orderDetailsBody}>
              <Row>
                <Col md={6}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Order Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="order_description"
                      value={order.order_description}
                      onChange={handleChange}
                      isInvalid={!!errors.order_description}
                      className={styles.formControl}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.order_description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Estimated Completion Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="estimated_completion_date"
                      value={order.estimated_completion_date}
                      onChange={handleChange}
                      isInvalid={!!errors.estimated_completion_date}
                      className={styles.formControl}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.estimated_completion_date}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Total Price ($) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="order_total_price"
                      value={order.order_total_price}
                      onChange={handleChange}
                      isInvalid={!!errors.order_total_price}
                      className={styles.formControl}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.order_total_price}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>
                      <FaUserCog className={styles.inputIcon} />
                      Assign Employee *
                    </Form.Label>
                    <Form.Select
                      name="employee_id"
                      value={order.employee_id}
                      onChange={handleChange}
                      isInvalid={!!errors.employee_id}
                      className={styles.formControl}
                    >
                      <option value="">Select an employee</option>
                      {employees.map((employee) => (
                        <option key={employee.employee_id} value={employee.employee_id}>
                          {employee.employee_first_name} {employee.employee_last_name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.employee_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Additional Requests</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="additional_request"
                      value={order.additional_request}
                      onChange={handleChange}
                      className={styles.formControl}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Notes for Customer</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="notes_for_customer"
                      value={order.notes_for_customer}
                      onChange={handleChange}
                      className={styles.formControl}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Internal Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="notes_for_internal_use"
                      value={order.notes_for_internal_use}
                      onChange={handleChange}
                      className={styles.formControl}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className={styles.submitSection}>
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Creating Order...' : 'Create Order'}
                </motion.button>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </motion.div>
  );
};

export default CreateOrder;
