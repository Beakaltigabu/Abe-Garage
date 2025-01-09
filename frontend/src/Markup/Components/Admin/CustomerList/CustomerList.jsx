import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash, FaSearch, FaFilter, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { toast } from 'react-toastify';
import customerService from "../../../../Services/customer.service";
import styles from "./CustomerList.module.css";

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

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const customersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchQuery, filterStatus]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await customerService.getAllCustomer();
      if (response) {
        setCustomers(response.customers);
        setTotalPages(Math.ceil(response.customers.length / customersPerPage));
      }
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customerId) => {
    navigate(`/admin/customers/edit-customer/${customerId}`);
  };

  const handleView = (customerId) => {
    navigate(`/admin/customers/customer-profile/${customerId}`);
  };

  const handleDelete = (customerId) => {
    setCustomerToDelete(customerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await customerService.deleteCustomer(customerToDelete);
      if (response.message === "Customer deleted successfully") {
        setCustomers(prevCustomers =>
          prevCustomers.filter(customer => customer.customer_id !== customerToDelete)
        );
        setShowDeleteModal(false);
        toast.success("Customer successfully deleted");
      }
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };

  const filterCustomers = (customers) => {
    return customers?.filter(customer => {
      const searchTerms = searchQuery.toLowerCase();
      const matchesSearch =
        `${customer.customer_first_name} ${customer.customer_last_name}`.toLowerCase().includes(searchTerms) ||
        customer.customer_email.toLowerCase().includes(searchTerms) ||
        customer.customer_phone_number.toLowerCase().includes(searchTerms);

      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'active' && customer.active_customer_status === 1) ||
        (filterStatus === 'inactive' && customer.active_customer_status === 0);

      return matchesSearch && matchesStatus;
    });
  };

  const paginatedCustomers = (customers) => {
    const filteredList = filterCustomers(customers);
    const startIndex = (currentPage - 1) * customersPerPage;
    return filteredList.slice(startIndex, startIndex + customersPerPage);
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header Section */}
      <div className={styles.pageHeader}>
        <div className={styles.titleSection}>
          <h1>Customer Management</h1>
          <p>{customers.length} customers found</p>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search customers..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
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
                <th>ID</th>
                <th>Customer Name</th>
                <th>Contact Information</th>
                <th>Added Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="sync">
                {paginatedCustomers(customers)?.map((customer) => (
                  <motion.tr
                    key={customer.customer_id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={styles.tableRow}
                  >
                    <td className={styles.customerId}>{customer.customer_id}</td>
                    <td className={styles.customerName}>
                      <div className={styles.nameWrapper}>
                        <FaUser className={styles.userIcon} />
                        <div>
                          <div className={styles.fullName}>
                            {customer.customer_first_name} {customer.customer_last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.contactInfo}>
                      <div>{customer.customer_email}</div>
                      <div>{customer.customer_phone_number}</div>
                    </td>
                    <td>
                      {format(new Date(customer.customer_added_date), "MMM dd, yyyy")}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        parseInt(customer.active_customer_status) === 1
                          ? styles.statusActive
                          : styles.statusInactive
                      }`}>
                        {parseInt(customer.active_customer_status) === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actionButtons}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleView(customer.customer_id)}
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          title="View Customer"
                        >
                          <FaEye />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(customer.customer_id)}
                          className={`${styles.actionButton} ${styles.editButton}`}
                          title="Edit Customer"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(customer.customer_id)}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          title="Delete Customer"
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

      {/* Pagination Section */}
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
            Total Customers: {customers.length}
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this customer? This action cannot be undone.</p>
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
}

export default CustomerList;
