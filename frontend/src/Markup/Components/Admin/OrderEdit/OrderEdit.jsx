import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOrder, updateOrder } from '../../../../Services/order.service';
import * as serviceService from '../../../../Services/service.service';
import { getAllEmployee } from '../../../../Services/employee.service';
import {
  FaUser,
  FaCar,
  FaTools,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClipboard,
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaTag,
} from 'react-icons/fa';
import { Form, Button } from 'react-bootstrap';
import styles from './OrderEdit.module.css';
import Loading from '../../Loading/Loading';
import { toast } from 'react-toastify';

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    order_services: [],
    order_date: new Date(),
    last_updated: new Date(),
    customer_first_name: '',
    customer_last_name: '',
    customer_email: '',
    customer_phone_number: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: '',
    vehicle_color: '',
    vehicle_tag: '',
    vehicle_serial: '',
    vehicle_mileage: '',
    order_status: 'received',
    order_total_price: '',
    notes_for_customer: '',
    notes_for_internal_use: '',
    assigned_employee_id: ''
  });
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [orderData, employeesData, servicesData] = await Promise.all([
          getOrder(id),
          getAllEmployee(),
          serviceService.getActiveServices()
        ]);

        if (orderData && orderData[0]) {
          setOrder({
            ...orderData[0],
            order_services: orderData[0].services || orderData[0].order_services || []
          });
        }
        setEmployees(employeesData.employees || []);
        setServices(servicesData.services || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error loading order data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value,
      last_updated: new Date().toISOString()
    }));
  };

  const handleAddService = () => {
    if (!selectedService) {
      toast.warning('Please select a service');
      return;
    }

    if (order.order_services.some(s => s.service_id === parseInt(selectedService))) {
      toast.warning('Service already added');
      return;
    }

    setOrder(prev => ({
      ...prev,
      order_services: [
        ...prev.order_services,
        { service_id: parseInt(selectedService), service_completed: 0 }
      ]
    }));
    setSelectedService('');
  };

  const handleRemoveService = (serviceId) => {
    setOrder(prev => ({
      ...prev,
      order_services: prev.order_services.filter(s => s.service_id !== serviceId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedOrder = {
        ...order,
        last_updated: new Date().toISOString()
      };
      await updateOrder(id, updatedOrder);
      toast.success('Order updated successfully');
      navigate('/admin/orders');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update order');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  if (isLoading) return <Loading />;

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
            onClick={() => navigate('/admin/orders')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Orders
          </motion.button>
          <div className={styles.orderMeta}>
            <h1 className={styles.title}>Edit Order #{order.order_id}</h1>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.primaryInfo}>
          <div className={styles.infoCard}>
            <div className={styles.cardIcon}><FaUser /></div>
            <div className={styles.cardContent}>
              <h3>Customer Information</h3>
              <div className={styles.customerName}>
                {order.customer_first_name} {order.customer_last_name}
              </div>
              <div className={styles.contactInfo}>
                <div><FaEnvelope /> {order.customer_email}</div>
                <div><FaPhone /> {order.customer_phone_number}</div>
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardIcon}><FaCar /></div>
            <div className={styles.cardContent}>
              <h3>Vehicle Information</h3>
              <div className={styles.vehicleMain}>
                {order.vehicle_make} {order.vehicle_model} ({order.vehicle_year})
              </div>
              <div className={styles.vehicleDetails}>
                <div>Color: {order.vehicle_color}</div>
                <div><FaTag /> Tag: {order.vehicle_tag}</div>
                <div>Mileage: {order.vehicle_mileage}</div>
                <div>Serial: {order.vehicle_serial}</div>
              </div>
            </div>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className={styles.servicesSection}>
            <h3><FaTools /> Services</h3>
            <div className={styles.servicesList}>
              {order.order_services.map((service) => {
                const serviceDetails = services.find(s => s.service_id === service.service_id);
                return (
                  <div key={service.service_id} className={styles.serviceItem}>
                    <div className={styles.serviceInfo}>
                      <h4>{serviceDetails?.service_name}</h4>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveService(service.service_id)}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className={styles.addServiceSection}>
              <Form.Select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select a service to add</option>
                {services.map(service => (
                  <option key={service.service_id} value={service.service_id}>
                    {service.service_name}
                  </option>
                ))}
              </Form.Select>
              <Button onClick={handleAddService}>Add Service</Button>
            </div>
          </div>

          <div className={styles.orderMetaGrid}>
            <div className={styles.metaCard}>
              <h3><FaCalendarAlt /> Important Dates</h3>
              <div className={styles.timelineInfo}>
                <div className={styles.timelineItem}>
                  <span>Order Date</span>
                  <strong>{formatDate(order.order_date)}</strong>
                </div>
                <div className={styles.timelineItem}>
                  <span>Last Updated</span>
                  <strong>{formatDate(order.last_updated)}</strong>
                </div>
              </div>
            </div>

            <div className={styles.metaCard}>
              <h3><FaMoneyBillWave /> Order Details</h3>
              <div className={styles.orderInfo}>
                <Form.Group className="mb-3">
                  <Form.Label>Assigned Employee</Form.Label>
                  <Form.Select
                    name="assigned_employee_id"
                    value={order.assigned_employee_id || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.employee_id} value={emp.employee_id}>
                        {`${emp.employee_first_name} ${emp.employee_last_name}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Order Status</Form.Label>
                  <Form.Select
                    name="order_status"
                    value={order.order_status || ''}
                    onChange={handleChange}
                  >
                    <option value="received">Received</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Total Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="order_total_price"
                    value={order.order_total_price || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className={styles.metaCard}>
              <h3><FaClipboard /> Notes</h3>
              <div className={styles.notesInfo}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes_for_customer"
                    value={order.notes_for_customer || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Internal Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes_for_internal_use"
                    value={order.notes_for_internal_use || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/orders')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Order
            </Button>
          </div>
        </Form>
      </div>
    </motion.div>
  );
};

export default OrderEdit;
