import React from 'react';
import SideBar from '../../SideBar/SideBar';
import OrderView from '../../../../Components/Admin/OrderView/OrderView';
import styles from './ViewOrder.module.css';

const ViewOrder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <OrderView />
      </div>
    </div>
  );
};

export default ViewOrder;
