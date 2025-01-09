import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../../Context/UserContexts';
import { ROLES } from '../../../constants/roles';
import {
  FaBell,
  FaBars,
  FaTimes,
  FaPhone,
  FaClock,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaTachometerAlt
} from 'react-icons/fa';
import styles from './Header.module.css';
import logo from '../../../assets/images/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New service request', time: '5m ago' },
    { id: 2, message: 'Order status updated', time: '1h ago' }
  ]);
  const dropdownRef = useRef(null);

  const isAdmin = user?.role === ROLES.ADMIN;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/aboutus', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/contactus', label: 'Contact Us' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowUserMenu(false);
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className={styles.topHeader}>
        <motion.div
          className={styles.topHeaderContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.welcomeMessage}>
            {user ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Welcome, {user.firstName} {user.lastName}!
              </motion.span>
            ) : (
              'Enjoy the Best While we fix your car'
            )}
          </div>
          <div className={styles.contactInfo}>
            <span><FaClock /> Mon - Sat: 7:00AM - 6:00PM</span>
            <span><FaPhone /> 1800 456 7890</span>
          </div>
        </motion.div>
      </div>

      <div className={styles.mainHeader}>
        <Link to="/" className={styles.logoContainer}>
          <motion.img
            src={logo}
            alt="Abe Garage"
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>

        <motion.nav className={styles.navigation}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/admin/dashboard"
                className={`${styles.navLink} ${styles.adminLink}`}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </motion.div>
          )}
        </motion.nav>

        <div className={styles.headerActions}>
          {user && (
            <motion.div
              className={styles.notificationBell}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBell />
              {notifications.length > 0 && (
                <motion.span
                  className={styles.notificationBadge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {notifications.length}
                </motion.span>
              )}
            </motion.div>
          )}

          {user ? (
            <div className={styles.userMenuContainer} ref={dropdownRef}>
              <motion.div
                className={styles.userProfile}
                onClick={() => setShowUserMenu(!showUserMenu)}
                whileHover={{ scale: 1.05 }}
              >
                <FaUserCircle className={styles.userIcon} />
                <span className={styles.userName}>{user.firstName}</span>
              </motion.div>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className={styles.userDropdown}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                      <FaUser /> Profile
                    </Link>
                    <Link to="/settings" onClick={() => setShowUserMenu(false)}>
                      <FaCog /> Settings
                    </Link>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              className={styles.loginButton}
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          )}

          <motion.button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className={`${styles.mobileNavLink} ${styles.adminMobileLink}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
