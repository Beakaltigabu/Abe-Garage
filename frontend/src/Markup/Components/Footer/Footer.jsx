import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaClock,
  FaArrowRight
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Company Info */}
            <motion.div
              className={styles.footerColumn}
              {...fadeInUp}
            >
              <h3 className={styles.columnTitle}>About Abe Garage</h3>
              <p className={styles.companyDesc}>
                Leading auto repair service provider committed to excellence.
                Trust our expert team for all your vehicle maintenance needs.
              </p>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt />
                  <span>123 Repair Street, Auto City, ST 12345</span>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <span>service@abegarage.com</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className={styles.footerColumn}
              {...fadeInUp}
            >
              <h3 className={styles.columnTitle}>Quick Links</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <FaArrowRight />
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <FaArrowRight />
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                  <FaArrowRight />
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <FaArrowRight />
                  <Link to="/contactus">Contact</Link>
                </li>
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              className={styles.footerColumn}
              {...fadeInUp}
            >
              <h3 className={styles.columnTitle}>Our Services</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <FaArrowRight />
                  <Link to="/services/diagnostics">Diagnostics</Link>
                </li>
                <li>
                  <FaArrowRight />
                  <Link to="/services/engine-repair">Engine Repair</Link>
                </li>
                <li>
                  <FaArrowRight />
                  <Link to="/services/wheel-alignment">Wheel Alignment</Link>
                </li>
                <li>
                  <FaArrowRight />
                  <Link to="/services/oil-change">Oil Change</Link>
                </li>
              </ul>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              className={styles.footerColumn}
              {...fadeInUp}
            >
              <h3 className={styles.columnTitle}>Working Hours</h3>
              <div className={styles.workingHours}>
                <div className={styles.timeSlot}>
                  <FaClock />
                  <div>
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                </div>
                <div className={styles.timeSlot}>
                  <FaClock />
                  <div>
                    <span>Saturday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                </div>
                <div className={styles.timeSlot}>
                  <FaClock />
                  <div>
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={styles.bottomFooter}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Abe Garage. All rights reserved.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
