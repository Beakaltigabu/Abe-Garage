import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar';
import styles from "./AddEmployeeForm.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import EmployeeService from "../../../../Services/employee.service";

function AddEmployee() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      employee_first_name: "",
      employee_last_name: "",
      employee_phone: "",
      company_role_name: "",
      active_employee: 1,
      employee_email: "",
      employee_password: "",
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await EmployeeService.createEmployee(data);
      if (result.success) {
        toast.success(result.message || "Employee added successfully!");
        reset();
        // Optionally, you can add a delay before navigation
        setTimeout(() => {
          navigate("/admin/employees");
        }, 2000); // 2 seconds delay
      } else {
        toast.error(result.message || "An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add a new employee</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="employee_first_name" className={styles.label}>
            First Name
          </label>
          <input
            {...register("employee_first_name", { required: "First name is required" })}
            className={styles.input}
            placeholder="Enter Employee First Name"
          />
          {errors.employee_first_name && <div className={styles.error}>{errors.employee_first_name.message}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employee_last_name" className={styles.label}>
            Last Name
          </label>
          <input
            {...register("employee_last_name", { required: "Last name is required" })}
            className={styles.input}
            placeholder="Enter Employee Last Name"
          />
          {errors.employee_last_name && <div className={styles.error}>{errors.employee_last_name.message}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employee_phone" className={styles.label}>
            Phone Number
          </label>
          <input
            {...register("employee_phone", { required: "Phone number is required" })}
            className={styles.input}
            placeholder="Enter Employee Phone Number"
          />
          {errors.employee_phone && <div className={styles.error}>{errors.employee_phone.message}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company_role_name" className={styles.label}>
            Role
          </label>
          <select
            {...register("company_role_name", { required: "Role is required" })}
            className={styles.input}
          >
            <option value="">Select a role</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
          {errors.company_role_name && <div className={styles.error}>{errors.company_role_name.message}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employee_email" className={styles.label}>
            Email
          </label>
          <input
            {...register("employee_email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className={styles.input}
            placeholder="Enter Employee Email"
          />
          {errors.employee_email && <div className={styles.error}>{errors.employee_email.message}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employee_password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              {...register("employee_password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } })}
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="Enter Employee Password"
            />
            <span
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {errors.employee_password && <div className={styles.error}>{errors.employee_password.message}</div>}
          <PasswordStrengthBar password={watch("employee_password")} />
        </div>

        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Adding Employee..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
