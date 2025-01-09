import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContexts";
import { SidebarProvider } from "./Context/SidebarContext";
import { ROLES } from "./constants/roles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import Header from "./Markup/Components/Header/Header";
import Footer from "./Markup/Components/Footer/Footer";
import ProtectedRoutes from "./Markup/Components/Auth/PrivateAuthRoute";
import AdminLayout from "./Markup/Layouts/AdminLayout";

// Pages
import Home from "./Markup/Pages/Root/Home/Home";
import Login from "./Markup/Pages/Root/Login/Login";
import ContactUs from "./Markup/Pages/Root/ContactUs/ContactUs";
import AboutUs from "./Markup/Pages/Root/AboutUs/AboutUs";
import Services from "./Markup/Pages/Root/Services/Services";
import UnAuthorized from "./Markup/Pages/Root/UnAuthorized/UnAuthorized";
import CustomerOrder from "./Markup/Components/Admin/CustomerOrders/CustomerOrders";

// Admin Pages
import Dashboard from "./Markup/Pages/admin/AdminDashboard/Dashboard";
import EditEmployee from "./Markup/Pages/admin/EmployeeEdit/EmployeeEdit";
import AllEmployees from "./Markup/Pages/admin/Employees/Employees";
import AddEmployee from "./Markup/Pages/admin/AddEmployee/AddEmployee";
import AddCustomer from "./Markup/Pages/admin/AddCustomer/AddCustomer";
import Customers from "./Markup/Pages/admin/Customers/Customers";
import EditCustomer from "./Markup/Pages/admin/CustomerEdit/CustomerEdit";
import CustomerProfilePage from "./Markup/Pages/admin/CustomerProfile/CustomerProfile";
import Orders from "./Markup/Pages/admin/Order/Orders/Orders";
import StepOne from "./Markup/Pages/admin/Order/step-1/step-1";
import StepTwo from "./Markup/Pages/admin/Order/step-2/StepTwo";
import StepThree from "./Markup/Pages/admin/Order/step-3/StepThree";
import ViewOrder from "./Markup/Pages/admin/Order/ViewOrder/ViewOrder";
import EditOrder from "./Markup/Pages/admin/Order/EditOrder/EditOrder";
import OurServices from "./Markup/Pages/admin/OurServices/OurServices";
import VehicleEdit from "./Markup/Pages/admin/VehicleEdit/VehicleEdit";
import EditServicePage from "./Markup/Pages/admin/EditService/EditService";
import AdminDashboard from "./Markup/Components/Admin/AdminDashboard/AdminDashboard";

function App() {
  return (
    <UserProvider>
      <SidebarProvider>
        <div className="app-container">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="/customerorder" element={<CustomerOrder />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoutes allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
                  <AdminLayout>
                    <Routes>
                      <Route path="" element={<Dashboard />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="createorder" element={<StepOne />} />
                      <Route
                        path="step-two/:customer_id"
                        element={<StepTwo />}
                      />
                      <Route path="step-three" element={<StepThree />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="orders/view/:id" element={<ViewOrder />} />
                      <Route path="orders/edit/:id" element={<EditOrder />} />
                      <Route path="employees" element={<AllEmployees />} />
                      <Route path="add-employee" element={<AddEmployee />} />
                      <Route
                        path="employees/:employee_id"
                        element={<EditEmployee />}
                      />
                      <Route path="add-customer" element={<AddCustomer />} />
                      <Route path="customers" element={<Customers />} />
                      <Route path="services" element={<OurServices />} />
                      <Route
                        path="services/edit/:service_id"
                        element={<EditServicePage />}
                      />
                      <Route
                        path="edit-vehicle/:id"
                        element={<VehicleEdit />}
                      />
                      <Route
                        path="edit-vehicle/:vehicle_id"
                        element={<VehicleEdit />}
                      />
                      <Route
                        path="customers/edit-customer/:customer_id"
                        element={<EditCustomer />}
                      />
                      <Route
                        path="customers/customer-profile/:customer_id"
                        element={<CustomerProfilePage />}
                      />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoutes>
              }
            />
          </Routes>
          <Footer />

          <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  theme="colored"
/>


        </div>
      </SidebarProvider>
    </UserProvider>
  );
}

export default App;
