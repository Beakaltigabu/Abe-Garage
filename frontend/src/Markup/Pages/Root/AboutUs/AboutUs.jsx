// Import React library
import React, { useEffect, useState } from "react";

// Import CSS module for AboutUs component styles
import classes from "./AboutUs.module.css";

// Import Link component from react-router-dom for navigation
import { Link } from "react-router-dom";

// Import additional CSS module from the Home component for shared styles
import styles from "../Home/Home.module.css";

// Import images to be used in the component
import workshopLeft from "../../../../assets/images/workshopLeft.png";
import workshopRight from "../../../../assets/images/workshopRight.png";

import BottomSections from "../BottomSections/BottomSections";
import Loading from "../../../Components/Loading/Loading";

// Define the AboutUs functional component
function AboutUs() {
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />; // Display loading screen while data is being fetched
  }

  // Return the JSX structure for the component
  return (
    <>
      {/* Hero Section: Introduction to the About Us page */}
      <section className={classes.aboutus}>
        <div className={classes.heroSection}>
          <h1>About Us</h1> {/* Page title */}
          <p>
            <Link to="/home">Home</Link> &gt;{" "}
            {/* Breadcrumb navigation to Home */}
            <Link to="/contactus">Contact Us</Link>{" "}
            {/* Breadcrumb navigation to Contact Us */}
          </p>
        </div>
      </section>
      {/* About Section: Details about the workshop */}
      <section className={styles.aboutSection}>
        <div className={styles.autoContainer}>
          <div className={styles.row1}>
            {/* Left Column: Display images */}
            <div className={styles.colLeft}>
              <div className={styles.imageBox}>
                <img
                  className={styles.image1}
                  src={workshopLeft}
                  alt="Image 1"
                />{" "}
                {/* Display first image */}
                <img src={workshopRight} alt="Image 2" />{" "}
                {/* Display second image */}
              </div>
              <div className={styles.yearExperience}>
                <strong>24</strong> <br /> years <br /> Experience
                {/* Text showing 24 years of experience */}
              </div>
            </div>

            {/* Right Column: Text content about the workshop */}
            <div className={styles.colRight}>
              <div className={styles.secTitle3}>
                <h4>Welcome to Our Workshop</h4> {/* Subheading */}
                <h2>We have 24 years experience</h2> {/* Main heading */}
                <div className={styles.text}>
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution.
                  </p>{" "}
                  {/* Paragraph describing the workshop's approach */}
                  <p>
                    Capitalize on low-hanging fruit to identify a ballpark
                    value-added activity to beta test. Override the digital
                    divide with additional clickthroughs from DevOps.
                    Nanotechnology immersion along the information highway will
                    close the loop on focusing.
                  </p>{" "}
                  {/* Further description of the services offered */}
                </div>
                <div className={styles.linkBtn}>
                  <a href="/aboutus" className={styles.themeBtn}>
                    <span>
                      About Us <i className="flaticon-right"></i>
                    </span>{" "}
                    {/* Button linking to more about the workshop */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BottomSections /> {/* Display the BottomSections component */}
    </>
  );
}

// Export the AboutUs component as the default export
export default AboutUs;
