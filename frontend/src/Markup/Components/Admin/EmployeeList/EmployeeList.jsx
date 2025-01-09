import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaFilter, FaUserTie } from "react-icons/fa";
import { format, isValid } from "date-fns";
import { toast } from 'react-toastify';
import EmployeeService from "../../../../Services/employee.service";
import styles from "./EmployeeList.module.css";

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

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const employeesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchQuery, filterStatus]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await EmployeeService.getAllEmployee();
      if (response) {
        setEmployees(response.employees);
        setTotalPages(Math.ceil(response.employees.length / employeesPerPage));
      }
    } catch (error) {
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employeeId) => {
    navigate(`/admin/employees/${employeeId}`);
  };

  const handleDelete = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await EmployeeService.deleteEmployee(employeeToDelete);
      if (result.success) {
        setEmployees(prevEmployees =>
          prevEmployees.filter(employee => employee.employee_id !== employeeToDelete)
        );
        setShowDeleteModal(false);
        toast.success("Employee successfully deleted");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  const filterEmployees = (employees) => {
    return employees?.filter(employee => {
      const searchTerms = searchQuery.toLowerCase();
      const matchesSearch =
        `${employee.employee_first_name} ${employee.employee_last_name}`.toLowerCase().includes(searchTerms) ||
        employee.employee_email.toLowerCase().includes(searchTerms) ||
        employee.employee_phone.toLowerCase().includes(searchTerms);

      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'active' && employee.active_employee === 1) ||
        (filterStatus === 'inactive' && employee.active_employee === 0);

      return matchesSearch && matchesStatus;
    });
  };

  const paginatedEmployees = (employees) => {
    const filteredList = filterEmployees(employees);
    const startIndex = (currentPage - 1) * employeesPerPage;
    return filteredList.slice(startIndex, startIndex + employeesPerPage);
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.pageHeader}>
        <div className={styles.titleSection}>
          <h1>Employee Management</h1>
          <p>{employees.length} employees found</p>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search employees..."
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
                <th>Employee</th>
                <th>Contact Information</th>
                <th>Role</th>
                <th>Added Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="sync">
                {paginatedEmployees(employees)?.map((employee) => (
                  <motion.tr
                    key={employee.employee_id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={styles.tableRow}
                  >
                    <td className={styles.idCell}>#{employee.employee_id}</td>
                    <td className={styles.employeeCell}>
                      <div className={styles.nameWrapper}>
                        <FaUserTie className={styles.userIcon} />
                        <div className={styles.fullName}>
                          {employee.employee_first_name} {employee.employee_last_name}
                        </div>
                      </div>
                    </td>
                    <td className={styles.contactInfo}>
                      <div>{employee.employee_email}</div>
                      <div>{employee.employee_phone}</div>
                    </td>
                    <td>{employee.company_role_name}</td>
                    <td>
                      {employee.added_date && isValid(new Date(employee.added_date))
                        ? format(new Date(employee.added_date), "MMM dd, yyyy")
                        : "No date"}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        employee.active_employee === 1 ? styles.statusActive : styles.statusInactive
                      }`}>
                        {employee.active_employee === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actionButtons}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(employee.employee_id)}
                          className={`${styles.actionButton} ${styles.editButton}`}
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(employee.employee_id)}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
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
          Page {currentPage} of {totalPages}
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
            <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
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

export default EmployeeList;
