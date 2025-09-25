import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Lists from './pages/Lists';
import Add from './pages/Add';
import { adminDataContext } from './context/AdminContext';

const App = () => {
  const { adminData } = useContext(adminDataContext);

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
