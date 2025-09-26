import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

// Create Context
export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    if (!serverUrl) {
      console.error("Server URL is not defined in AuthContext");
      return;
    }

    try {

      const result = await axios.post(
        `${serverUrl}/api/user/getadmin`,
        {}, // empty body since backend expects POST
        { withCredentials: true }
      );

      setAdminData(result.data);
      console.log("Admin Data:", result.data);
    } catch (error) {
      setAdminData(null);
      console.error(
        "getAdmin error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getAdmin();
  }, [serverUrl]); // run again if serverUrl changes

  const value = {
    adminData,
    setAdminData,
    getAdmin,
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
