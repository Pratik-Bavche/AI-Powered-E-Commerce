import React, {createContext } from 'react';

export const authDataContext=createContext()

function AuthContext ({children}){
    // Use relative API paths in development so Vite proxy can forward requests
    // to the backend and cookies are treated as same-origin.
    // In production you should set VITE_SERVER_URL to the deployed backend URL.
    let serverUrl = import.meta.env.VITE_SERVER_URL || ""
    let value={
        serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
                {children}
        </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
