import React, { createContext } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
  // Use relative API paths in development so Vite proxy can forward requests
  // to the backend and cookies are treated as same-origin.
  // In production you should set VITE_SERVER_URL to the deployed backend URL.
  const serverUrl = import.meta.env.VITE_SERVER_URL || "";

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
