import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import { userDataContext } from "./context/userContext";
import Toast from "./components/Toast";
import { toastContext } from "./context/ToastContext";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Ai from "./components/Ai";

const App = () => {
  const { userData, isCheckingAuth } = useContext(userDataContext);
  const location = useLocation();
  const { isVisible, message, type, hideToast } = useContext(toastContext);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />
        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />
        <Route
          path="/collection"
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />
        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />
        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        <Route
          path="/productDetail/:productId"
          element={
            userData ? (
              <ProductDetail />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        {/* 404 Route - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Ai/>
      <Toast 
        isVisible={isVisible} 
        message={message} 
        type={type} 
        onClose={hideToast} 
      />
    </>
  );
};

export default App;
