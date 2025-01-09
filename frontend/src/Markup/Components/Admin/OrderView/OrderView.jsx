import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOrder } from '../../../../Services/order.service';
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
  FaUserTie
} from 'react-icons/fa';
import styles from './OrderView.module.css';
import Loading from '../../Loading/Loading';

const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    order_id: '',
    order_status: 'received',
    customer_first_name: '',
    customer_last_name: '',
    customer_email: '',
    customer_phone_number: '',
    active_customer_status: false,
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: '',
    vehicle_color: '',
    vehicle_tag: '',
    vehicle_serial: '',
    vehicle_mileage: '',
    vehicle_type: '',
    services: [],
    order_date: null,
    estimated_completion_date: null,
    completion_date: null,
    order_total_price: 0,
    employee_first_name: '',
    employee_last_name: '',
    employee_phone: '',
    notes_for_customer: '',
    notes_for_internal_use: '',
    additional_request: '',
    assigned_employee_first_name: '',
    assigned_employee_last_name: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getOrder(id);
        if (data && data[0]) {
          setOrder(data[0]);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: styles.statusCompleted,
      inprogress: styles.statusInProgress,
      received: styles.statusReceived
    };

    const formattedStatus = status ?
      status.charAt(0).toUpperCase() + status.slice(1) :
      'Unknown';

    return (
      <span className={`${styles.statusBadge} ${statusClasses[status] || styles.statusReceived}`}>
        {formattedStatus}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

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
            <h1 className={styles.title}>Order #{order.order_id}</h1>
            {getStatusBadge(order.order_status)}
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
                <div>Status: {order.active_customer_status ? "Active" : "Inactive"}</div>
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
                <div>Type: {order.vehicle_type}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.servicesSection}>
          <h3><FaTools /> Services</h3>
          <div className={styles.servicesList}>
            {Array.isArray(order.services) && order.services.map((service, index) => (
              <div key={index} className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <h4>{service.service_name}</h4>
                  <p>{service.service_description}</p>
                </div>
                <div className={`${styles.serviceStatus} ${service.service_completed ? styles.completed : ''}`}>
                  {service.service_completed ? 'Completed' : 'In Progress'}
                </div>
              </div>
            ))}
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
              {order.completion_date && (
                <div className={styles.timelineItem}>
                  <span>Completion Date</span>
                  <strong>{formatDate(order.completion_date)}</strong>
                </div>
              )}
            </div>
          </div>

          <div className={styles.metaCard}>
            <h3><FaMoneyBillWave /> Order Details</h3>
            <div className={styles.orderInfo}>
              <div className={styles.priceDisplay}>
                <span>Total Amount</span>
                <strong>${order.order_total_price}</strong>
              </div>
              <div className={styles.employeeInfo}>
                <h4>Received By:</h4>
                <p>{order.employee_first_name} {order.employee_last_name}</p>
                <p>{order.employee_phone}</p>
              </div>
              {order.assigned_employee_first_name && (
                <div className={styles.employeeInfo}>
                  <h4>Assigned To:</h4>
                  <p><FaUserTie /> {order.assigned_employee_first_name} {order.assigned_employee_last_name}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.metaCard}>
            <h3><FaClipboard /> Additional Notes</h3>
            <div className={styles.notesInfo}>
              <div className={styles.noteSection}>
                <h4>Customer Notes:</h4>
                <p>{order.notes_for_customer || 'No customer notes'}</p>
              </div>
              <div className={styles.noteSection}>
                <h4>Internal Notes:</h4>
                <p>{order.notes_for_internal_use || 'No internal notes'}</p>
              </div>
              <div className={styles.noteSection}>
                <h4>Additional Requests:</h4>
                <p>{order.additional_request || 'No additional requests'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderView;
