import React, {createContext } from 'react';

export const authDataContext=createContext()

function AuthContext ({children}){
  // Use relative API paths in development so Vite proxy can forward requests
  // to the backend and cookies are treated as same-origin.
  // In production we read VITE_SERVER_URL; in dev we force an empty base
  // so calls go to relative `/api/...` and the Vite proxy handles forwarding.
  const isDev = import.meta.env.DEV;
  let serverUrl = !isDev && import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL : "";
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
