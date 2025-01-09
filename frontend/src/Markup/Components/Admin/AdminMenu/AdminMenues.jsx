import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaUsers, FaUserTie, FaCog, FaPlus } from 'react-icons/fa';
import { useSidebar } from '../../../../Context/SidebarContext';
import SidebarToggle from '../SidebarToggle/SidebarToggle';
import styles from './Admin.module.css';

const menuItems = [
  { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard', exact: true },
  { path: '/admin/orders', icon: FaClipboardList, label: 'Orders' },
  { path: '/admin/createorder', icon: FaPlus, label: 'New Order' },
  { path: '/admin/customers', icon: FaUsers, label: 'Customers' },
  { path: '/admin/employees', icon: FaUserTie, label: 'Employees' },
  { path: '/admin/services', icon: FaCog, label: 'Services' }
];

const AdminMenu = () => {
  const { isOpen, toggleSidebar, isMobile } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    //console.log('AdminMenu rendered with location:', location.pathname);
    //console.log('Sidebar state:', { isOpen, isMobile });
  }, [location, isOpen, isMobile]);

  const handleNavClick = (path) => {
    //console.log('Navigation clicked:', path);
  };

  return (
    <>
      <nav className={`${styles.menuContainer} ${!isOpen ? styles.collapsed : ''}`}>
        <div className={styles.menuHeader}>
          <h2 className={styles.menuTitle}>Admin Panel</h2>
        </div>
        <div className={styles.menuItems}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                //console.log(`NavLink ${item.path} active state:`, isActive);
                return `${styles.menuItem} ${isActive ? styles.active : ''}`;
              }}
              end={item.exact}
              onClick={() => handleNavClick(item.path)}
            >
              <item.icon className={styles.menuIcon} />
              <span className={styles.menuLabel}>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      <SidebarToggle isOpen={isOpen} onClick={toggleSidebar} isMobile={isMobile} />
    </>
  );
};

export default AdminMenu;
