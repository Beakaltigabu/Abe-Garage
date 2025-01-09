import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './SidebarToggle.module.css';

const SidebarToggle = ({ isOpen, onClick, isMobile }) => {
  return (
    <button
      className={`${styles.toggleButton} ${isOpen ? styles.open : ''} ${isMobile ? styles.mobile : ''}`}
      onClick={onClick}
      aria-label="Toggle Sidebar"
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </button>
  );
};

export default SidebarToggle;
