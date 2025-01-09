import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppData } from "../../App";
import axios from "../../axios";

// ProtectedRoute component that checks for user authentication and authorization
const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { state, dispatch } = useAppData(); // Context hook to get state and dispatch

  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  // Function to check if the user is authenticated
  const checkUser = async () => {
    dispatch({ type: "LOADING" }); // Set loading state
    try {
      // Send a request to check if the user is authenticated
      const { data } = await axios.get("/user/checkEmployee", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the request headers
        },
      });

      // If the user is authenticated, update the state with the username and role
      dispatch({
        type: "SET_USER",
        payload: { username: data.username, role: data.role },
      });
    } catch ({ response }) {
      console.log(response.data); // Log the error response data
      localStorage.setItem("token", ""); // Clear the token in localStorage
      dispatch({ type: "LOGOUT" }); // Dispatch a logout action
      navigate("/"); // Redirect to the home page
    }
  };

  // useEffect hook to run the checkUser function when the component mounts
  useEffect(() => {
    if (!state.user) {
      // If the user is not set in the state
      checkUser(); // Check if the user is authenticated
    }
  }, [state.user]); // Dependency array to re-run the effect when state.user changes

  if (!token) {
    return <Navigate to="/" />; // If there is no token, redirect to the home page
  }

  // Check if the user's role is allowed to access this route
  if (state.user && !allowedRoles.includes(state.user.role)) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page if the role is not allowed
  }

  return children; // If authenticated and authorized, render the children components
};

export default ProtectedRoute; // Export the ProtectedRoute component
