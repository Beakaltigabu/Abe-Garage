import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { useUser } from "../../../Context/UserContexts"; // Import the useUser hook to access user information
import styles from "./topheader.module.css"; // Import CSS module for styling

const TopHeader = () => {
  const { user } = useUser(); // Retrieve the user object from context
  const [scrollingUp, setScrollingUp] = useState(true); // State to track if the user is scrolling up
  const [lastScrollY, setLastScrollY] = useState(0); // State to store the last scroll position

  useEffect(() => {
    // Effect to handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // Get the current vertical scroll position
      if (currentScrollY < lastScrollY) {
        setScrollingUp(true); // Set scrollingUp to true if the user is scrolling up
      } else {
        setScrollingUp(false); // Set scrollingUp to false if the user is scrolling down
      }
      setLastScrollY(currentScrollY); // Update the last scroll position
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup the event listener on component unmount
  }, [lastScrollY]); // Dependency array to trigger the effect when lastScrollY changes

  return (
    // Render the top header
    <div className={`${styles.container} ${scrollingUp ? "" : styles.hidden}`}>
      {/* Text section */}
      <div className={styles.text}>Enjoy the Beso While we fix your car</div>

      {/* Right section with office hours and conditional message */}
      <div className={styles.rightSection}>
        <div className={styles.officeHour}>
          Monday - Saturday 7:00AM - 6:00PM {/* Display office hours */}
        </div>
        <div>
          {user?.employee_first_name ? ( // Conditional rendering based on user presence
            <div className={styles.phoneNumber1}>
              Welcome: {user.employee_first_name} !{" "}
              {/* Display a personalized welcome message */}
            </div>
          ) : (
            <div className={styles.phoneNumber}>
              Schedule Your Appointment Today : 1800 456 7890{" "}
              {/* Display default message */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader; // Export the TopHeader component
