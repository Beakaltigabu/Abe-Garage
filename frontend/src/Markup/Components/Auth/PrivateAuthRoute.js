import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContexts";
import axios from "axios";
import { ROLES } from "../.../../../../constants/roles";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { user, login } = useUser();

  const token = localStorage.getItem("token");

  const checkUser = async () => {
    try {
      const { data } = await axios.get("/user/checkEmployee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      login({
        employee_first_name: data.employee.employee_first_name,
        employee_email: data.employee.employee_email,
        role: data.employee.company_role_name,
      });
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem("token");
      navigate("/unauthorized");
    }
  };

  useEffect(() => {
    if (!user && token) {
      checkUser();
    }
  }, [user, token]);

  if (!token) {
   navigate ("/login");
  }

  if (user && !allowedRoles.includes(user.role)) {
    navigate ("/unauthorized")
  }

  return children;
};

export default ProtectedRoutes;
