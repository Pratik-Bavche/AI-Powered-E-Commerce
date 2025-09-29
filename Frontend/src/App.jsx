import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import { userDataContext } from "./context/userContext";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  return (
    <>
      {userData && <Nav />}
      <Routes>
        {/* Public Routes: Login & Signup */}
        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} replace />
            ) : (
              <Registration />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path="/collection"
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} replace />
            )
          }
        />


        <Route
          path="/productDetail/:productId"
          element={
            userData ? (
              <ProductDetail/>
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} replace />
            )
          }
        />
      </Routes>

      
    </>
  );
};

export default App;
