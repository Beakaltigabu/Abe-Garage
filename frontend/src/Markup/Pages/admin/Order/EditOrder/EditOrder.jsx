import React from 'react';
import SideBar from '../../SideBar/SideBar';
import OrderEdit from '../../../../Components/Admin/OrderEdit/OrderEdit';
import styles from './EditOrder.module.css';

const EditOrder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <OrderEdit />
      </div>
    </div>
  );
};

export default EditOrder;
