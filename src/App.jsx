import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import DishDetailPage from './pages/DishDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackerPage from './pages/OrderTrackerPage';
import './App.css';

function NotFoundPage() {
  return (
    <div className="container section-padding text-center">
      <div className="not-found-card">
        <h1>404</h1>
        <h2>Mesob Screen Not Found</h2>
        <p>The screen or route you requested does not exist in the Addis Eats application.</p>
        <Link to="/" className="btn btn-primary">
          Return to Heritage Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="dish/:id" element={<DishDetailPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="tracker" element={<OrderTrackerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
