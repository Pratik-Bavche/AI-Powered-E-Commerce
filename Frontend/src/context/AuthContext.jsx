import React, { createContext } from 'react';

export const authDataContext = createContext();

// This component provides global state (e.g., server URL) to the application
const AuthContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  const value = {
    serverUrl
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthContext;