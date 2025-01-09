import React, { useState, useCallback } from 'react'
import SideBar from '../../../Components/Admin/AdminMenu/AdminMenues';
import ServiceList from '../../../components/Admin/ServiceList/ServiceList';
import AddServiceForm from '../../../Components/Admin/AddServiceForm/AddServiceForm';
import style from './OurServices.module.css'
import { Button } from 'react-bootstrap';

function OurServices() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleServiceAdded = useCallback(() => {
    setShowAddForm(false);
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div className={style.container}>
      <SideBar />
      <div className={style.content}>
        <h1 className={style.title}>Services<span className={style.orangeUnderline}>____</span></h1>
        <ServiceList key={refreshKey} />
        <Button
          onClick={toggleAddForm}
          className={style.addButton}
        >
          {showAddForm ? 'Cancel' : 'Add New Service'}
        </Button>
        {showAddForm && <AddServiceForm onServiceAdded={handleServiceAdded} />}
      </div>
    </div>
  );
}

export default OurServices
