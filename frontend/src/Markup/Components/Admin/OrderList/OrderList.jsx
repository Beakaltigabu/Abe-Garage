import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaEdit, FaTrash, FaSearch, FaFilter, FaUserTie } from "react-icons/fa";
import { getOrders, deleteOrder } from "../../../../Services/order.service";
import { toast } from 'react-toastify';
import styles from "./OrderList.module.css";

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const ordersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, searchQuery, filterStatus]);

  const fetchOrders = async (page) => {
    try {
      const data = await getOrders({
        page,
        limit: ordersPerPage,
        sortby: "order_date DESC",
        status: filterStatus !== 'all' ? filterStatus : null,
        search: searchQuery
      });
      setOrders(data.orders);
      setTotalPages(Math.ceil(data.total / ordersPerPage));
    } catch (error) {
      toast.error("Failed to fetch orders");
      setOrders([]);
      setTotalPages(1);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: styles.statusCompleted,
      inprogress: styles.statusInProgress,
      received: styles.statusReceived
    };
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status] || styles.statusReceived}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleView = (orderId) => navigate(`/admin/orders/view/${orderId}`);
  const handleEdit = (orderId) => navigate(`/admin/orders/edit/${orderId}`);
  const handleDelete = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (orderToDelete) {
        const result = await deleteOrder(orderToDelete);
        if (result.success) {
          setShowDeleteModal(false);
          toast.success(result.message);
          setOrderToDelete(null);
          fetchOrders(currentPage);
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete order");
    }
  };

  const filterOrders = (orders) => {
    return orders?.filter(order => {
      const searchTerms = searchQuery.toLowerCase();
      const matchesSearch =
        order.order_id.toString().includes(searchTerms) ||
        `${order.customer_first_name} ${order.customer_last_name}`.toLowerCase().includes(searchTerms) ||
        order.customer_email.toLowerCase().includes(searchTerms) ||
        `${order.vehicle_make} ${order.vehicle_model}`.toLowerCase().includes(searchTerms);

      const matchesStatus = filterStatus === 'all' || order.order_status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.pageHeader}>
        <div className={styles.titleSection}>
          <h1>Orders Management</h1>
          <p>{orders.length} orders found</p>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by ID, customer, or vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterWrapper}>
            <FaFilter className={styles.filterIcon} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="inprogress">In Progress</option>
              <option value="received">Received</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <motion.div
          variants={tableVariants}
          initial="hidden"
          animate="visible"
          className={styles.tableWrapper}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Details</th>
                <th>Vehicle Information</th>
                <th>Order Date</th>
                <th>Received By</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="sync">
                {filterOrders(orders)?.map((order) => (
                  <motion.tr
                    key={order.order_id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={styles.tableRow}
                  >
                    <td className={styles.orderId}>{order.order_id}</td>
                    <td className={styles.customerCell}>
                      <div className={styles.customerName}>
                        {order.customer_first_name} {order.customer_last_name}
                      </div>
                      <div className={styles.customerDetails}>
                        <span>{order.customer_email}</span>
                        <span>{order.customer_phone_number}</span>
                      </div>
                    </td>
                    <td className={styles.vehicleCell}>
                      <div className={styles.vehicleName}>
                        {order.vehicle_make} {order.vehicle_model}
                      </div>
                      <div className={styles.vehicleDetails}>
                        <span>Year: {order.vehicle_year}</span>
                        <span className={styles.tag}>Tag: {order.vehicle_tag}</span>
                      </div>
                    </td>
                    <td className={styles.dateCell}>
                      {new Date(order.order_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className={styles.employeeCell}>
                      {order.employee_first_name} {order.employee_last_name}
                    </td>
                    <td className={styles.assignedEmployeeCell}>
                      {order.assigned_employee_first_name ? (
                        <div className={styles.assignedEmployee}>
                         
                          <span>
                            {order.assigned_employee_first_name} {order.assigned_employee_last_name}
                          </span>
                        </div>
                      ) : (
                        <span className={styles.notAssigned}>Not Assigned</span>
                      )}
                    </td>
                    <td>{getStatusBadge(order.order_status)}</td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actionButtons}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleView(order.order_id)}
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          title="View Order"
                        >
                          <FaExternalLinkAlt />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(order.order_id)}
                          className={`${styles.actionButton} ${styles.editButton}`}
                          title="Edit Order"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(order.order_id)}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          title="Delete Order"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </div>

      <div className={styles.paginationContainer}>
        <button
          className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className={styles.paginationInfo}>
          <span>Page {currentPage} of {totalPages}</span>
          <span className={styles.paginationTotal}>
            Total Orders: {orders.length}
          </span>
        </div>
        <button
          className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.modalCancelButton}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={styles.modalDeleteButton}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default OrderList;
