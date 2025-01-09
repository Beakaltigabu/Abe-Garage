import React from 'react'
import styles from './UnAuthorized.module.css'

function UnAuthorized() {
  return (
    <div className={styles.container}>
      <h2> Sorry, you don't have access to this page.</h2>
      <p>
        Please contact our team at 215-617-27-46 or at support@abyssiniacoders.com, if
        you believe you were suppose to have access to this.
      </p>
    </div>
  );
}

export default UnAuthorized