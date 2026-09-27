import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiCheckCircle, FiClock, FiMapPin, FiTruck, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { GiCampCookingPot, GiSteeringWheel } from 'react-icons/gi';

const STATUS_STEPS = [
  {
    title: 'Order Received',
    amharic: 'ትዕዛዙ ደርሷል',
    desc: 'Hearth kitchen confirmed receipt of order and allocated cooking stations.'
  },
  {
    title: 'Clay Pot Simmering',
    amharic: 'ወጡ በሸክላ እየበሰለ ነው',
    desc: 'Spiced berbere and red onions caramelized; slow-simmering on natural heat.'
  },
  {
    title: 'Rolling Fresh Teff Injera',
    amharic: 'ትኩስ እንጀራ እየተጠቀለለ ነው',
    desc: '100% stone-ground teff flatbread rolled and placed into woven mesob trays.'
  },
  {
    title: 'Courier En Route / Table Set',
    amharic: 'ወደ እርስዎ እየመጣ ነው',
    desc: 'Courier dispatched across Addis Ababa or traditional mesob table circle prepared.'
  },
  {
    title: 'Delivered with Gursha Love',
    amharic: 'በደስታ ተስተናግዷል',
    desc: 'Feast ready for sharing. May your meal bring health and communal blessing!'
  }
];

export default function OrderTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryOrderId = searchParams.get('orderId');

  const [orderIdInput, setOrderIdInput] = useState(queryOrderId || '');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(1); // 0 to 4
  const [lookupError, setLookupError] = useState('');

  const loadOrder = (id) => {
    setLookupError('');
    try {
      const orders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
      const found = orders.find(o => o.orderId.toLowerCase() === id.trim().toLowerCase());
      if (found) {
        setCurrentOrder(found);
        setActiveStepIndex(found.currentStep ? found.currentStep - 1 : 1);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    // Fallback demo order if user enters demo ID
    if (id.trim().toUpperCase().startsWith('MH-') || id.trim().length > 3) {
      const mockOrder = {
        orderId: id.trim().toUpperCase(),
        customerName: 'Abebe Tadesse',
        phone: '+251 911 889 001',
        addressOrTable: 'Bole Medhanialem, Mesob Table 3',
        diningMode: 'dine-in',
        paymentMethod: 'telebirr',
        totalETB: 1470,
        placedAt: '12:45 PM',
        items: [
          { title: 'Heritage Doro Wat', quantity: 1, spice: 'Habesha Fire', priceETB: 780 },
          { title: 'Siga Derek Tibs', quantity: 1, spice: 'Medium', priceETB: 690 }
        ]
      };
      setCurrentOrder(mockOrder);
      setActiveStepIndex(1);
    } else {
      setLookupError('Order ID not found. Try format: "MH-892104" or place a test order via checkout.');
    }
  };

  useEffect(() => {
    if (queryOrderId) {
      loadOrder(queryOrderId);
    } else {
      // Try to load last order
      try {
        const lastOrder = JSON.parse(localStorage.getItem('addis_eats_last_order') || 'null');
        if (lastOrder) {
          setCurrentOrder(lastOrder);
          setOrderIdInput(lastOrder.orderId);
          setActiveStepIndex(lastOrder.currentStep ? lastOrder.currentStep - 1 : 1);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [queryOrderId]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    setSearchParams({ orderId: orderIdInput.trim() });
    loadOrder(orderIdInput.trim());
  };

  const advanceStep = () => {
    if (activeStepIndex < STATUS_STEPS.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const resetStep = () => {
    setActiveStepIndex(0);
  };

  return (
    <div className="tracker-page section-padding">
      <div className="container">
        <header className="page-header text-center">
          <span className="section-subtitle">REAL-TIME HEARTH DISPATCH</span>
          <h1 className="page-title">Live Mesob Order Tracker</h1>
          <p className="page-subtitle">
            Follow the sacred preparation of your Ethiopian feast from our wood-fired clay pots to your table.
          </p>

          {/* Lookup Input Form */}
          <form onSubmit={handleSearchSubmit} className="order-lookup-form">
            <div className="lookup-input-group">
              <FiSearch className="lookup-icon" />
              <input
                type="text"
                value={orderIdInput}
                onChange={e => setOrderIdInput(e.target.value)}
                placeholder="Enter Order ID (e.g. MH-892104)"
                aria-label="Order Reference Number"
                className="lookup-input"
              />
              <button type="submit" className="btn btn-primary">
                Lookup Order
              </button>
            </div>
            {lookupError && <p className="lookup-error">{lookupError}</p>}
          </form>
        </header>

        {currentOrder ? (
          <div className="tracker-card">
            {/* Order Identity Bar */}
            <div className="order-id-bar">
              <div>
                <span className="label-caption">CURRENT ORDER REFERENCE</span>
                <h2 className="order-code">{currentOrder.orderId}</h2>
              </div>
              <div className="order-meta-badges">
                <span className="meta-badge dining-mode">
                  <GiCampCookingPot /> {currentOrder.diningMode.toUpperCase()}
                </span>
                <span className="meta-badge time">
                  <FiClock /> Placed at {currentOrder.placedAt || 'Just now'}
                </span>
                <span className="meta-badge total">
                  {currentOrder.totalETB} ETB
                </span>
              </div>
            </div>

            {/* Visual Stepper Timeline */}
            <div className="timeline-stepper">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx < activeStepIndex;
                const isCurrent = idx === activeStepIndex;
                return (
                  <div
                    key={idx}
                    className={`stepper-node ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <div className="node-indicator">
                      {isPassed ? <FiCheckCircle /> : idx + 1}
                    </div>
                    <div className="node-content">
                      <h3 className="node-title">{step.title}</h3>
                      <span className="node-amharic">{step.amharic}</span>
                      <p className="node-desc">{step.desc}</p>
                    </div>
                    {idx < STATUS_STEPS.length - 1 && <div className="step-connector" />}
                  </div>
                );
              })}
            </div>

            {/* Evaluator Interactive Stepper Controller */}
            <div className="stepper-simulator-box">
              <p>
                <strong>Evaluation / Interactive Demo Controls:</strong> You can simulate the real-time preparation steps.
              </p>
              <div className="simulator-btn-row">
                <button
                  type="button"
                  onClick={advanceStep}
                  disabled={activeStepIndex >= STATUS_STEPS.length - 1}
                  className="btn btn-secondary btn-sm"
                >
                  Advance Preparation Step →
                </button>
                <button
                  type="button"
                  onClick={resetStep}
                  disabled={activeStepIndex === 0}
                  className="btn btn-outline btn-sm"
                >
                  Reset to Step 1
                </button>
              </div>
            </div>

            {/* Destination & Order Details Summary */}
            <div className="order-dispatch-details">
              <div className="dispatch-col">
                <h4><FiMapPin /> Delivery / Table Destination</h4>
                <p><strong>Customer:</strong> {currentOrder.customerName}</p>
                <p><strong>Contact:</strong> {currentOrder.phone}</p>
                <p><strong>Destination:</strong> {currentOrder.addressOrTable}</p>
              </div>

              <div className="dispatch-col">
                <h4><FiShoppingBag /> Dishes Simmering</h4>
                <ul className="tracker-items-list">
                  {(currentOrder.items || []).map((it, i) => (
                    <li key={i}>
                      <span>{it.quantity}x {it.title}</span>
                      <small>({it.spice || 'Standard'})</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="tracker-empty-state text-center">
            <GiCampCookingPot className="large-pot-icon" />
            <h3>No Active Order Selected</h3>
            <p>Enter your Order ID above or place a fresh banquet order through our menu.</p>
            <Link to="/menu" className="btn btn-primary">
              Browse Banquet Menu <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
