import React, { createContext, useEffect, useState, useContext } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  // Fetch current user from backend
  const getCurrentUser = async () => {
    if (!serverUrl) return null;
    setIsCheckingAuth(true);
    try {
      console.log("Checking user authentication...");
      const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Current user:", result.data);
      return result.data;
    } catch (error) {
      console.log(
        "User not authenticated:",
        error.response?.data?.message || error.message
      );
      setUserData(null);
      return null;
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Call once on mount
  useEffect(() => {
    if (serverUrl) {
      getCurrentUser();
    }
  }, [serverUrl]);

  // Check authentication on page refresh/reload
  useEffect(() => {
    const handleStorageChange = () => {
      if (serverUrl) {
        getCurrentUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    isCheckingAuth,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
