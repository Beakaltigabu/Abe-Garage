// Import React and necessary hooks from the React library
import React, { createContext, useState, useContext } from "react";

// Create the context that will hold user-related data and functions
const UserContext = createContext();

// Create a provider component that will wrap your app and provide user context
export const UserProvider = ({ children }) => {
  // Initialize state for 'user' using useState, checking if 'firstname' exists in localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      return user || null;
    }
    return null;
  });
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };


  // Return the UserContext.Provider component, passing down the 'user', 'login', and 'logout' functions as context value
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children} 
    </UserContext.Provider>
  );
};

// Custom hook that allows other components to easily access the UserContext
export const useUser = () => useContext(UserContext);
