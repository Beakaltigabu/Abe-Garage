import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSidebar } from "../../Context/SidebarContext";
import AdminMenu from "../Components/Admin/AdminMenu/AdminMenues";
import MainContent from "../Components/Admin/MainContent/MainContent";
import styles from "./AdminLayout.module.css";

// Import all admin pages
import Dashboard from "../Components/Admin/AdminDashboard/AdminDashboard";
import Orders from "../Components/Admin/OrderList/OrderList";
import StepOne from "../Components/Admin/CustomerSearch/CustomerSearch";
import StepTwo from "../Pages/admin/Order/step-2/StepTwo";
import StepThree from "../Components/Admin/CreateOrder/CreateOrder";
import ViewOrder from "../Components/Admin/OrderView/OrderView";
import EditOrder from "../Components/Admin/OrderEdit/OrderEdit";
import AllEmployees from "../Components/Admin/EmployeeList/EmployeeList";
import AddEmployee from "../Pages/admin/AddEmployee/AddEmployee";
import EditEmployee from "../Components/Admin/EditEmployee/EditEmployee";
import AddCustomer from "../Components/Admin/AddCustomerForm/AddCustomerForm";
import Customers from "../Components/Admin/CustomerList/CustomerList";
import OurServices from "../Pages/admin/OurServices/OurServices";
import EditServicePage from "../Components/Admin/EditService/EditService";
import VehicleEdit from "../Components/Admin/EditVehicle/EditVehicle";
import EditCustomer from "../Components/Admin/EditCustomer/EditCustomer";
import CustomerProfilePage from "../Components/Admin/CustomerProfile/CustomerProfile";

const AdminLayout = () => {
  const { isOpen, toggleSidebar, isMobile } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    //console.log("AdminLayout rendered with location:", location.pathname);
  }, [location]);

  return (
    <div className={styles.adminLayoutWrapper}>
      <AdminMenu isOpen={isOpen} isMobile={isMobile} />
      <MainContent>
        <Routes>
          {/* Dashboard Routes */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Order Routes */}
          <Route path="createorder" element={<StepOne />} />
          <Route path="step-two/:customer_id" element={<StepTwo />} />
          <Route path="step-three" element={<StepThree />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/view/:id" element={<ViewOrder />} />
          <Route path="orders/edit/:id" element={<EditOrder />} />

          {/* Employee Routes */}
          <Route path="employees" element={<AllEmployees />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees/:employee_id" element={<EditEmployee />} />

          {/* Customer Routes */}
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="customers" element={<Customers />} />
          <Route
            path="customers/edit-customer/:customer_id"
            element={<EditCustomer />}
          />
          <Route
            path="customers/customer-profile/:customer_id"
            element={<CustomerProfilePage />}
          />

          {/* Service Routes */}
          <Route path="services" element={<OurServices />} />
          <Route
            path="services/edit/:service_id"
            element={<EditServicePage />}
          />

          {/* Vehicle Routes */}
          <Route path="edit-vehicle/:id" element={<VehicleEdit />} />
          <Route path="edit-vehicle/:vehicle_id" element={<VehicleEdit />} />
        </Routes>
      </MainContent>
    </div>
  );
};

export default AdminLayout;
