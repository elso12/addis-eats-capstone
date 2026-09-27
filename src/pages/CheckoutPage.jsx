import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiTrash2, FiArrowLeft, FiCheckCircle, FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
import { GiCampCookingPot, GiSteeringWheel, GiShoppingBag } from 'react-icons/gi';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotalETB,
    deliveryFeeETB,
    totalETB,
    diningMode,
    setDiningMode
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressOrTable: '',
    paymentMethod: 'telebirr',
    specialNotes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+() -]{9,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (e.g. 0911234567)';
    }
    if (!formData.addressOrTable.trim()) {
      errors.addressOrTable =
        diningMode === 'dine-in'
          ? 'Table or Seating Preference is required'
          : diningMode === 'delivery'
          ? 'Delivery drop-off address in Addis Ababa is required'
          : 'Pickup contact note is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const generatedOrderId = `MH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId: generatedOrderId,
      customerName: formData.fullName,
      phone: formData.phone,
      addressOrTable: formData.addressOrTable,
      diningMode,
      paymentMethod: formData.paymentMethod,
      items: cart,
      subtotalETB,
      deliveryFeeETB,
      totalETB,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentStep: 1 // 1: Received, 2: Simmering, 3: Packing, 4: Courier, 5: Delivered
    };

    // Save order in localStorage for tracker lookup
    try {
      const existingOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('addis_eats_orders', JSON.stringify(existingOrders));
      localStorage.setItem('addis_eats_last_order', JSON.stringify(newOrder));
    } catch (err) {
      console.error('Error saving order:', err);
    }

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/tracker?orderId=${generatedOrderId}`);
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page section-padding">
        <div className="container text-center">
          <div className="empty-cart-card">
            <div className="empty-cart-icon">🧺</div>
            <h2>Your Mesob Bag is Empty</h2>
            <p>You haven't selected any authentic Habesha delicacies yet. Explore our slow-simmered wats and sizzling tibs.</p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Banquet Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page section-padding">
      <div className="container">
        <div className="checkout-header">
          <Link to="/menu" className="back-link">
            <FiArrowLeft /> Continue Exploring Menu
          </Link>
          <h1 className="page-title">Mesob Dining Checkout</h1>
          <p className="page-subtitle">Configure your dining mode, review items, and confirm dispatch.</p>
        </div>

        {/* Dining Mode Selector */}
        <div className="dining-mode-selector">
          <button
            type="button"
            className={`mode-btn ${diningMode === 'dine-in' ? 'active' : ''}`}
            onClick={() => setDiningMode('dine-in')}
          >
            <GiCampCookingPot className="mode-icon" />
            <div>
              <strong>Dine-In Mesob</strong>
              <small>Reserve Table Circle (0 ETB Fee)</small>
            </div>
          </button>

          <button
            type="button"
            className={`mode-btn ${diningMode === 'delivery' ? 'active' : ''}`}
            onClick={() => setDiningMode('delivery')}
          >
            <GiSteeringWheel className="mode-icon" />
            <div>
              <strong>Addis Door Delivery</strong>
              <small>Express across city (120 ETB)</small>
            </div>
          </button>

          <button
            type="button"
            className={`mode-btn ${diningMode === 'pickup' ? 'active' : ''}`}
            onClick={() => setDiningMode('pickup')}
          >
            <GiShoppingBag className="mode-icon" />
            <div>
              <strong>Bole Hearth Takeaway</strong>
              <small>Hot Pickup at Bole (0 ETB Fee)</small>
            </div>
          </button>
        </div>

        <div className="checkout-layout-grid">
          {/* Left Column: Form Details */}
          <div className="checkout-form-column">
            <form onSubmit={handlePlaceOrder} className="checkout-card" noValidate>
              <h2 className="card-heading">
                <FiUser /> Guest Contact & Fulfillment Details
              </h2>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Almaz Bekele"
                  className={`form-input ${formErrors.fullName ? 'input-error' : ''}`}
                />
                {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +251 911 234 567"
                  className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                />
                {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  {diningMode === 'dine-in'
                    ? 'Table Number or Seating Area *'
                    : diningMode === 'delivery'
                    ? 'Addis Ababa Street & Drop-off Address *'
                    : 'Estimated Pickup Time & Vehicle Note *'}
                </label>
                <input
                  type="text"
                  name="addressOrTable"
                  value={formData.addressOrTable}
                  onChange={handleInputChange}
                  placeholder={
                    diningMode === 'dine-in'
                      ? 'e.g. Central Mesob Ring / Table 4'
                      : diningMode === 'delivery'
                      ? 'e.g. Bole Medhanialem, House 402, Behind Edna Mall'
                      : 'e.g. 15 mins from Bole Rwanda'
                  }
                  className={`form-input ${formErrors.addressOrTable ? 'input-error' : ''}`}
                />
                {formErrors.addressOrTable && (
                  <span className="error-text">{formErrors.addressOrTable}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Payment Preference</label>
                <div className="payment-options-grid">
                  {[
                    { id: 'telebirr', name: 'Telebirr (ቴሌብር)' },
                    { id: 'cbe', name: 'CBE Birr (ንግድ ባንክ)' },
                    { id: 'cash', name: 'Cash on Arrival' }
                  ].map(pay => (
                    <label
                      key={pay.id}
                      className={`payment-option ${formData.paymentMethod === pay.id ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pay.id}
                        checked={formData.paymentMethod === pay.id}
                        onChange={handleInputChange}
                      />
                      <span>{pay.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-block btn-lg"
              >
                {isSubmitting ? 'Simmering Order...' : `Place Mesob Order • ${totalETB} ETB`}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-summary-column">
            <div className="checkout-card">
              <h2 className="card-heading">
                <FiShoppingBag /> Selected Delicacies ({totalItems})
              </h2>

              <div className="order-items-list">
                {cart.map(item => (
                  <div key={item.cartItemId} className="summary-item">
                    <img src={item.image} alt={item.title} className="summary-thumb" />
                    <div className="summary-details">
                      <h4>{item.title}</h4>
                      <p className="summary-spec">{item.spice} • {item.injera}</p>
                      <span className="summary-price">{item.priceETB} ETB each</span>
                      
                      <div className="summary-stepper-row">
                        <div className="mini-stepper">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="mini-btn"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="mini-btn"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="remove-item-btn"
                          aria-label={`Remove ${item.title}`}
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="summary-line-total">
                      {item.priceETB * item.quantity} ETB
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="calculation-breakdown">
                <div className="calc-row">
                  <span>Subtotal:</span>
                  <strong>{subtotalETB} ETB</strong>
                </div>
                <div className="calc-row">
                  <span>Dining Mode ({diningMode}):</span>
                  <span>{deliveryFeeETB > 0 ? `${deliveryFeeETB} ETB` : 'FREE (0 ETB)'}</span>
                </div>
                <div className="calc-row">
                  <span>Ethiopian VAT:</span>
                  <span>Included in prices</span>
                </div>
                <div className="calc-row total-row">
                  <span>Grand Total:</span>
                  <strong className="grand-total">{totalETB} ETB</strong>
                </div>
              </div>

              <div className="hearth-guarantee-note">
                <FiCheckCircle color="#e6af2e" /> Served with freshly rolled 100% stone-ground Teff injera.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
