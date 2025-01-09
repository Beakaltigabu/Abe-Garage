import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BottomSections.module.css'
// Import images to be used in the component
import workshopLeft from "../../../../assets/images/workshopLeft.png"; // Importing the left workshop image

// Import FontAwesome icons for use in the component
import { FaWrench, FaMedal, FaTags, FaUserCog } from "react-icons/fa"; // Importing icons
import { FaPlay } from "react-icons/fa"; // Importing the play icon
function BottomSections() {
  return (
    <>
      {/* Why Choose Us Section: Explanation of why the workshop is a good choice */}
      <section className={styles.whyChooseUs}>
        <div className={styles.autoContainer}>
          <div className={styles.secTitle1}>
            <h2>Why Choose Us</h2> {/* Heading for Why Choose Us section */}
            <h2>Additional Services</h2>{" "}
            {/* Heading for Additional Services section */}
          </div>
          <div className={styles.row3}>
            {/* Left Column: Explanation and icons */}
            <div className={styles.colLg6}>
              <div className={`${styles.secTitle} ${styles.styleone}`}>
                <div className={styles.text}>
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation heading towards.
                </div>{" "}
                {/* Paragraph explaining the workshop's strategy */}
              </div>
              <div className={styles.iconBoxes}>
                <div className={styles.iconBox}>
                  <div className={styles.icon}>
                    <FaUserCog size={40} color="darkorange" />{" "}
                    {/* Certified Expert Mechanics Icon */}
                  </div>
                  <h4>Certified Expert Mechanics</h4>{" "}
                  {/* Title for the service */}
                </div>
                <div className={styles.iconBox}>
                  <div className={styles.icon}>
                    <FaWrench size={40} color="darkorange" />{" "}
                    {/* Fast And Quality Service Icon */}
                  </div>
                  <h4>Fast And Quality Service</h4>{" "}
                  {/* Title for the service */}
                </div>
                <div className={styles.iconBox}>
                  <div className={styles.icon}>
                    <FaTags size={40} color="darkorange" />{" "}
                    {/* Best Prices in Town Icon */}
                  </div>
                  <h4>Best Prices in Town</h4> {/* Title for the service */}
                </div>
                <div className={styles.iconBox}>
                  <div className={styles.icon}>
                    <FaMedal size={40} color="darkorange" />{" "}
                    {/* Awarded Workshop Icon */}
                  </div>
                  <h4>Awarded Workshop</h4> {/* Title for the service */}
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className={styles.imageBox1}>
              <img src={workshopLeft} alt="Additional Services" />{" "}
              {/* Image illustrating additional services */}
            </div>

            {/* Additional Services Column: List of services */}
            <div className={styles.colLg6}>
              <div className={styles.additionalServices}>
                <ul className={styles.list}>
                  <li>General Auto Repair & Maintenance</li>
                  <li>Transmission Repair & Replacement</li>
                  <li>Tire Repair and Replacement</li>
                  <li>State Emissions Inspection</li>
                  <li>Break Job / Break Services</li>
                  <li>Electrical Diagnostics</li>
                  <li>Fuel System Repairs</li>
                  <li>Starting and Charging Repair</li>
                  <li>Steering and Suspension Work</li>
                  <li>Emission Repair Facility</li>
                  <li>Wheel Alignment</li>
                  <li>Computer Diagnostic Testing</li>
                </ul>{" "}
                {/* Unordered list of additional services offered */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section: Highlighting the workshop's history and expertise */}
      <section className={styles.videoSection}>
        <div className={styles.autoContainer3}>
          <h5>Working since 1992</h5> {/* Subtitle indicating experience */}
          <div className={styles.greenLine}></div> {/* Decorative line */}
          <h2>We are leaders in Car Mechanical Work</h2>{" "}
          {/* Main heading for the video section */}
          <div className={styles.videoBox}>
            <div className={styles.videoBtn}>
              <a
                href="https://www.youtube.com/watch?v=ZY7QtkR55bM&t=1s"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <FaPlay
                  style={{
                    marginRight: "8px",
                    fontSize: "30px",
                    backgroundColor: "darkorange",
                    borderRadius: "50%",
                    padding: "8px",
                    paddingLeft: "13px",
                  }}
                />{" "}
                {/* Play button icon for the video */}
              </a>
            </div>
            <div className={styles.lasttext}>
              Watch introduction video <br /> about us
            </div>{" "}
            {/* Text encouraging the user to watch the video */}
          </div>
        </div>
      </section>

      {/* Call to Action Section: Prompting the user to schedule an appointment */}
      <section className={styles.callToAction}>
        <div className={styles.contactusText}>
          <h2>Schedule Your Appointment Today</h2>{" "}
          {/* Heading for the call to action */}
          <p>Your Automotive Repair & Maintenance Service Specialist</p>{" "}
          {/* Subheading for the call to action */}
        </div>
        <div className={styles.contactusButton}>
          <h2>1800.456.7890</h2> {/* Display contact phone number */}
          <Link to="/contactus" className={styles.contactButton}>
            Contact Us
          </Link>{" "}
          {/* Link to the Contact Us page */}
        </div>
      </section>
  </>
  );
}

export default BottomSections