import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    if (!serverUrl) return null;
    setIsCheckingAuth(true);
    try {
      console.log("Checking admin authentication...");
      const result = await axios.get(`${serverUrl}/api/user/getadmin`, {
        withCredentials: true,
      });
      setAdminData(result.data);
      console.log("Admin Data:", result.data);
      return result.data;
    } catch (error) {
      console.log(
        "Admin not authenticated:",
        error.response?.data?.message || error.message
      );
      setAdminData(null);
      return null;
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Only check authentication if serverUrl is available
  useEffect(() => {
    if (serverUrl) {
      getAdmin();
    }
  }, [serverUrl]);

  // Check authentication on page refresh/reload
  useEffect(() => {
    const handleStorageChange = () => {
      if (serverUrl) {
        getAdmin();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, [serverUrl]);

  return (
    <adminDataContext.Provider
      value={{ adminData, setAdminData, getAdmin, isCheckingAuth }}
    >
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
