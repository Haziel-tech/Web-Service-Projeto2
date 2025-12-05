import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import CategoryList from "./pages/categories/CategoryList";
import PromotionList from "./pages/promotions/PromotionList";
import PromotionForm from "./pages/promotions/PromotionForm";
import UserList from "./pages/users/UserList";
import UserForm from "./pages/users/UserForm";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path="/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/products/edit/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><CategoryList /></PrivateRoute>} />
          <Route path="/promotions" element={<PrivateRoute><PromotionList /></PrivateRoute>} />
          <Route path="/promotions/new" element={<PrivateRoute><PromotionForm /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="/users/new" element={<PrivateRoute><UserForm /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}