import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiCompass, FiBookOpen, FiClock, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { GiCoffeePot, GiCampCookingPot } from 'react-icons/gi';

export default function Layout() {
  const { totalItems } = useCart();

  return (
    <div className="layout-wrapper">
      {/* Top Heritage Notice */}
      <aside className="top-banner">
        <div className="container banner-inner">
          <span>🌿 <strong>100% Pure Teff Injera Guaranteed</strong> — Authentic slow-simmered Habesha feasts</span>
          <span className="banner-divider">•</span>
          <span><GiCoffeePot style={{ verticalAlign: 'middle', marginRight: 4 }} /> Sacred 4:00 PM Buna Ceremony Daily</span>
        </div>
      </aside>

      {/* Main Header */}
      <header className="main-header">
        <div className="container header-container">
          <Link to="/" className="brand-logo" aria-label="Mesob House Home">
            <div className="brand-icon">
              <GiCampCookingPot />
            </div>
            <div className="brand-text">
              <span className="brand-title">MESOB HOUSE</span>
              <span className="brand-subtitle">መሶብ ቤት • ADDIS EATS</span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav className="header-nav" aria-label="Main Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Heritage Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Banquet Menu
            </NavLink>
            <NavLink
              to="/tracker"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Live Order Tracker
            </NavLink>
          </nav>

          {/* Header Action: Cart Button */}
          <div className="header-actions">
            <Link to="/checkout" className="cart-trigger-btn" aria-label="Shopping Bag">
              <FiShoppingBag className="cart-icon" />
              <span className="cart-label">Mesob Bag</span>
              {totalItems > 0 && (
                <span className="cart-counter" aria-label={`${totalItems} items in bag`}>
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Routed Page Content */}
      <main className="main-content" id="main-content">
        <Outlet />
      </main>

      {/* Comprehensive Habesha Footer */}
      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <GiCampCookingPot className="footer-logo-icon" />
              <h3>MESOB HOUSE</h3>
            </div>
            <p className="footer-desc">
              Celebrating traditional Ethiopian culinary heritage. Slow-simmered wats, hand-woven mesob circles, stone-ground gluten-free teff, and sacred coffee ceremonies.
            </p>
            <div className="guarantee-pill">
              <FiCheckCircle color="#e6af2e" /> 100% Unadulterated Teff Injera
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Heritage Home</Link></li>
              <li><Link to="/menu">Interactive Banquet Menu</Link></li>
              <li><Link to="/checkout">Dining Bag & Checkout</Link></li>
              <li><Link to="/tracker">Live Order Tracker</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hours & Buna Ritual</h4>
            <ul className="footer-info-list">
              <li>
                <FiClock className="info-icon" />
                <div>
                  <strong>Dining Hours:</strong><br />
                  Mon – Sun: 11:30 AM – 11:00 PM
                </div>
              </li>
              <li>
                <GiCoffeePot className="info-icon" />
                <div>
                  <strong>Sacred Buna Ceremony:</strong><br />
                  Daily at 4:00 PM Sharp (Free for Guests)
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Bole Hearth Location</h4>
            <ul className="footer-info-list">
              <li>
                <FiMapPin className="info-icon" />
                <div>
                  Cameroon St., Next to Bole Medhanialem Cathedral<br />
                  Addis Ababa, Ethiopia
                </div>
              </li>
              <li>
                <FiPhone className="info-icon" />
                <div>
                  +251 911 234 567 / +251 116 890 123
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© 2026 Mesob House (Addis Eats). All authentic culinary rights reserved.</p>
            <p className="footer-signature">Crafted with Gursha love & modern React architecture.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
