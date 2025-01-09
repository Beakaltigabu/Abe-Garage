import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation and useNavigate for programmatic navigation
import { useUser } from "../../../Context/UserContexts"; // Import the useUser hook from the UserContext to access user state and logout function
import styles from "./lowerheader.module.css"; // Import CSS module for styling
import logo from "../../../assets/images/logo.png"; // Import the logo image

// LowerHeader functional component definition
const LowerHeader = () => {
  const { user, logout } = useUser(); // Destructure user and logout from the useUser context
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Function to handle the logout process
  const handleLogout = () => {
    logout(); // Call the logout function to clear user session
    navigate("/login"); // Redirect the user to the login page
  };

  return (
    // Upper header section container with styling applied
    <div className={styles.headerUpper}>
      <div className={styles.container}>
        {/* Logo container */}
        <div className={styles.logoBox}>
          <div className={styles.logo}>
            <Link to="/admin/dashboard">
              <img src={logo} alt="Abie-garage" />{" "}
              {/* Display the logo image */}
            </Link>
          </div>
        </div>

        {/* Right column containing the navigation menu and button */}
        <div className={styles.rightColumn}>
          {/* Navigation bar */}
          <nav className={`${styles.mainMenu} navbar-expand-md navbar-light`}>
            <ul className={styles.navigation}>
              {/* List of navigation links */}
              <li className={styles.navItem}>
                <Link to="/">Home</Link> {/* Link to Home page */}
              </li>
              <li className={styles.navItem}>
                <Link to="/aboutus">About Us</Link>{" "}
                {/* Link to About Us page */}
              </li>
              <li className={styles.navItem}>
                <Link to="/services">Services</Link>{" "}
                {/* Link to Services page */}
              </li>
              <li className={styles.navItem}>
                <Link to="/contactus">Contact Us</Link>{" "}
                {/* Link to Contact Us page */}
              </li>
            </ul>
          </nav>

          {/* Conditional rendering of button: either 'Logout' if the user is logged in, or 'Sign In' if not */}
          <div className={styles.linkBtn}>
            {user ? (
              <button onClick={handleLogout} className={styles.bookButton}>
                Logout {/* Button to log out the user */}
              </button>
            ) : (
              <Link to="/login" className={styles.bookButton}>
                Sign In {/* Link to the Sign In page */}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowerHeader; // Export the LowerHeader component
