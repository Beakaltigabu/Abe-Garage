import React from 'react';
import SideBar from '../../../Components/Admin/AdminMenu/AdminMenues';
import EditServiceComponent from '../../../Components/Admin/EditService/EditService';
import styles from './EditService.module.css';

function EditServicePage() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <EditServiceComponent />
      </div>
    </div>
  );
}

export default EditServicePage;

