import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'

function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin Menu</h2>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/createorder">New Order</Link>
          </li>
          <li>
            <Link to="/admin/add-employee">Add Employee</Link>
          </li>
          <li>
            <Link to="/admin/employees">Employees</Link>
          </li>
          <li>
            <Link to="/admin/add-customer">Add Customer</Link>
          </li>
          <li>
            <Link to="/admin/customers">Customers</Link>
          </li>
          <li>
            <Link to="/admin/services">Services</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar
