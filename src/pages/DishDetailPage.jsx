import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DISHES } from '../data/dishesData';
import { useCart } from '../context/CartContext';
import { FiArrowLeft, FiCheck, FiShoppingBag, FiInfo } from 'react-icons/fi';
import { GiCampCookingPot, GiWheat, GiFlame } from 'react-icons/gi';

export default function DishDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const dish = DISHES.find(d => d.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState(dish?.spiceLevel || 'Medium');
  const [selectedInjera, setSelectedInjera] = useState('100% Pure Stone-Ground Teff');
  const [orderNotes, setOrderNotes] = useState('');

  if (!dish) {
    return (
      <div className="container section-padding text-center">
        <div className="not-found-card">
          <h2>Delicacy Not Found</h2>
          <p>We could not find the dish with reference code "{id}".</p>
          <Link to="/menu" className="btn btn-primary">
            <FiArrowLeft /> Return to Banquet Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(dish, quantity, {
      spice: selectedSpice,
      injera: selectedInjera,
      notes: orderNotes
    });
  };

  const handleOrderNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="dish-detail-page section-padding">
      <div className="container">
        <Link to="/menu" className="back-link">
          <FiArrowLeft /> Back to Banquet Menu
        </Link>

        <div className="detail-grid">
          {/* Dish Visual Media */}
          <div className="detail-media">
            <div className="detail-image-box">
              <img src={dish.image} alt={dish.title} className="detail-img" />
              <div className="detail-badges">
                <span className="spice-tag large"><GiFlame /> {dish.spiceLevel}</span>
                {dish.isFasting && <span className="fasting-tag large">Tsom / 100% Vegan</span>}
              </div>
            </div>
            <div className="heritage-note-card">
              <h4><GiCampCookingPot /> Authentic Habesha Recipe</h4>
              <p>Prepared in traditional clay pots with slow-caramelized red onions and organic spices freshly ground in Addis Ababa.</p>
            </div>
          </div>

          {/* Dish Configurator & Actions */}
          <div className="detail-content">
            <div className="detail-header">
              <span className="section-subtitle">{dish.category.toUpperCase()} SELECTION</span>
              <h1 className="detail-title">{dish.title}</h1>
              <span className="detail-amharic">{dish.amharic}</span>
              <p className="detail-price">{dish.priceETB} ETB</p>
            </div>

            <p className="detail-description">{dish.description}</p>

            {/* Ingredients Manifest */}
            <div className="ingredients-manifest">
              <h3>Ingredients & Spices</h3>
              <div className="ingredients-tags">
                {dish.ingredients.map((ing, idx) => (
                  <span key={idx} className="ingredient-tag">
                    <FiCheck /> {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Customizer Options */}
            <div className="customizer-section">
              <h3>Customize Your Feast</h3>
              
              <div className="form-group">
                <label className="form-label">
                  <GiFlame /> Desired Berbere Spice Level:
                </label>
                <div className="radio-pill-group">
                  {['Mild (ልስላሴ)', 'Medium (መካከለኛ)', 'Habesha Fire (እሳት)'].map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      className={`pill-btn ${selectedSpice === lvl ? 'active' : ''}`}
                      onClick={() => setSelectedSpice(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <GiWheat /> Injera Grain Foundation:
                </label>
                <div className="radio-pill-group">
                  {['100% Pure Stone-Ground Teff', 'Traditional Mixed Grain'].map(inj => (
                    <button
                      key={inj}
                      type="button"
                      className={`pill-btn ${selectedInjera === inj ? 'active' : ''}`}
                      onClick={() => setSelectedInjera(inj)}
                    >
                      {inj}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Hearth Instructions:</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  placeholder="e.g. Serve extra spicy, warm injera on side, extra ayib cheese"
                  className="notes-input"
                />
              </div>

              {/* Quantity Stepper & Price Calculation */}
              <div className="quantity-and-pricing">
                <div className="quantity-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="stepper-btn"
                  >
                    -
                  </button>
                  <span className="stepper-value">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>

                <div className="line-total-preview">
                  <span>Line Total:</span>
                  <strong>{dish.priceETB * quantity} ETB</strong>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="detail-actions">
                <button onClick={handleAddToCart} className="btn btn-secondary btn-lg">
                  <FiShoppingBag /> Add to Mesob Bag
                </button>
                <button onClick={handleOrderNow} className="btn btn-primary btn-lg">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
