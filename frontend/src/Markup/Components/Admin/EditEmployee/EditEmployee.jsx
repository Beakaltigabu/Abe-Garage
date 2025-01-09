import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaUserTie
} from 'react-icons/fa';
import EmployeeService from "../../../../Services/employee.service";
import Loading from '../../../Components/Loading/Loading';
import styles from "./EditEmployee.module.css";

const EmployeeEdit = () => {
  const { employee_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    active_employee: 1,
    employee_email: "",
    company_role_id: ""
  });

  useEffect(() => {
    fetchEmployee();
  }, [employee_id]);

  const fetchEmployee = async () => {
    try {
      const response = await EmployeeService.getSingleEmployee(employee_id);
      setEmployeeData({
        ...response.employee,
        active_employee: response.employee.active_employee === 1 ? 1 : 0,
      });
    } catch (error) {
      toast.error("Failed to load employee information");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.editEmployee(employee_id, employeeData);
      toast.success("Employee updated successfully!");
      navigate('/admin/employees');
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update employee");
    }
  };

  if (loading) return <Loading />;

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
            onClick={() => navigate('/admin/employees')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Employees List
          </motion.button>
          <div className={styles.employeeMeta}>
            <h1 className={styles.title}>
              Employee #{employee_id}
            </h1>
            <span className={`${styles.statusBadge} ${employeeData.active_employee ? styles.statusActive : styles.statusInactive}`}>
              {employeeData.active_employee ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <motion.form
          onSubmit={handleSubmit}
          className={styles.formContainer}
        >
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                <FaUser className={styles.inputIcon} />
                <span>First Name</span>
              </label>
              <input
                type="text"
                name="employee_first_name"
                value={employeeData.employee_first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaUser className={styles.inputIcon} />
                <span>Last Name</span>
              </label>
              <input
                type="text"
                name="employee_last_name"
                value={employeeData.employee_last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaPhone className={styles.inputIcon} />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                name="employee_phone"
                value={employeeData.employee_phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaEnvelope className={styles.inputIcon} />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="employee_email"
                value={employeeData.employee_email}
                onChange={handleChange}
                readOnly
                className={styles.readOnlyInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FaUserTie className={styles.inputIcon} />
                <span>Role</span>
              </label>
              <select
                name="company_role_id"
                value={employeeData.company_role_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="1">Employee</option>
                <option value="2">Manager</option>
                <option value="3">Admin</option>
              </select>
            </div>
          </div>

          <div className={styles.statusSection}>
            <motion.button
              type="button"
              className={`${styles.statusToggleButton} ${employeeData.active_employee ? styles.active : styles.inactive}`}
              onClick={() => handleChange({
                target: {
                  name: 'active_employee',
                  type: 'checkbox',
                  checked: !employeeData.active_employee
                }
              })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {employeeData.active_employee ? (
                <>
                  <FaCheck /> Active
                </>
              ) : (
                <>
                  <FaTimes /> Inactive
                </>
              )}
            </motion.button>
          </div>

          <div className={styles.buttonGroup}>
            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Changes
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default EmployeeEdit;
