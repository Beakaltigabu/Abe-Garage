import React from 'react';
import SideBar from '../../SideBar/SideBar';
import CreateOrder from '../../../../Components/Admin/CreateOrder/CreateOrder';
import styles from './StepThree.module.css';

const StepThree = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <CreateOrder />
      </div>
    </div>
  );
};

export default StepThree;
