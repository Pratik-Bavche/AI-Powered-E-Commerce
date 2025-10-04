import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Lists from "./pages/Lists";
import Add from "./pages/Add";
import { adminDataContext } from "./context/AdminContext";

const App = () => {
  const { adminData, isCheckingAuth } = useContext(adminDataContext);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      )}
    </>
  );
};

export default App;
