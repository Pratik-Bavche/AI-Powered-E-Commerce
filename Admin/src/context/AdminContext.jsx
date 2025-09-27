import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    if (!serverUrl) return;
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/getadmin`,
        {}, // empty body
        { withCredentials: true }
      );
      setAdminData(result.data);
      console.log("Admin Data:", result.data);
    } catch (error) {
      setAdminData(null);
      console.error("getAdmin error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [serverUrl]);

  return (
    <adminDataContext.Provider value={{ adminData, setAdminData, getAdmin }}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
