import React, { createContext, useEffect, useState, useContext } from 'react';
import { authDataContext } from "./authContext.jsx";
import axios from 'axios';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  let [search,setSearch]=useState('')
  let [showSearch,setShowSearch]=useState(false)
  const { serverUrl } = useContext(authDataContext);

  // Fetch current user from backend
  const getCurrentUser = async () => {
    try {
      // Correct: empty body + withCredentials in config
      const result = await axios.post(
        serverUrl + "/api/user/getcurrentuser",
        {}, // empty body
        { withCredentials: true } // send cookies
      );
      setUserData(result.data);
      console.log("Current user:", result.data);
    } catch (error) {
      setUserData(null);
      console.error("Error fetching current user:", error.response?.data || error.message);
    }
  };

  // Call once on mount
  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    search,
    setSearch
    ,showSearch,setShowSearch
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
