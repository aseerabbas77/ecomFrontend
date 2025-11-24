import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Components
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout.jsx";
import OrderFullFill from "./components/OrderFullFill.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MyOrders from "./components/MyOrders.jsx";
import AdminRoute from "./AdminRoute.jsx";
import DashBoard from "./dashboard/Dashboard.jsx";

// Lazy load ProductDetail
const ProductDetail = React.lazy(() =>
  import("./components/ProductDetail.jsx")
);

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && (
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
      )}

      <ToastContainer theme="colored" />

      <div className={`w-full bg-gray-50 ${hideNavbar ? "pt-0" : "pt-16"}`}>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
            </div>
          }
        >
          <ErrorBoundary>
            <Routes>
              {/* Admin Dashboard */}
              <Route element={<AdminRoute />}>
                <Route path="/dashboard/*" element={<DashBoard />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/login" element={<Login />} />

              {/* Public Routes */}
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order" element={<OrderFullFill />} />

              {/* Private Routes */}
              <Route
                path="/myorders"
                element={
                  <PrivateRoute>
                    <MyOrders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </div>
    </>
  );
};

export default App;
