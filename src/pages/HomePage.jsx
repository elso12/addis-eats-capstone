import React from 'react';
import { Link } from 'react-router-dom';
import { DISHES, BUNA_CEREMONY } from '../data/dishesData';
import { useCart } from '../context/CartContext';
import { FiArrowRight, FiCheckCircle, FiStar, FiClock, FiHeart } from 'react-icons/fi';
import { GiCoffeePot, GiCampCookingPot, GiRoastChicken, GiHotMeal } from 'react-icons/gi';

export default function HomePage() {
  const { addToCart } = useCart();
  const chefSpecials = DISHES.filter(d => d.isChefSpecial);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <GiCampCookingPot /> Premier Habesha Cultural Dining
            </div>
            <h1 className="hero-title">
              Slow-Simmered Wats, Stone-Ground Teff, & Shared Mesobs
            </h1>
            <p className="hero-amharic">"እንኳን ወደ መሶብ ቤት በደህና መጡ — የፍቅር እና የበረከት ማዕድ"</p>
            <p className="hero-desc">
              Experience the profound warmth of communal Gursha dining. From slow-caramelized Doro Wat and Gurage Prime Kitfo to 100% pure fermented Teff injera and the sacred 4:00 PM Buna ceremony.
            </p>

            <div className="hero-cta-group">
              <Link to="/menu" className="btn btn-primary btn-lg">
                Explore Banquet Menu <FiArrowRight />
              </Link>
              <Link to="/tracker" className="btn btn-secondary btn-lg">
                Track Active Order
              </Link>
            </div>

            <div className="hero-perks">
              <div className="perk-item">
                <FiCheckCircle className="perk-icon" />
                <span>100% Gluten-Free Pure Teff</span>
              </div>
              <div className="perk-item">
                <FiCheckCircle className="perk-icon" />
                <span>Certified Fasting (Tsom) Platters</span>
              </div>
              <div className="perk-item">
                <FiCheckCircle className="perk-icon" />
                <span>Daily Roasting Buna Ritual</span>
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-img-wrapper">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Ethiopian_cuisine_at_Abyssinia%2C_Melbourne.jpg/800px-Ethiopian_cuisine_at_Abyssinia%2C_Melbourne.jpg"
                alt="Mesob House Great Banquet Feast"
                className="hero-main-img"
              />
              <div className="hero-floating-card">
                <GiCoffeePot className="floating-card-icon" />
                <div>
                  <strong>Buna Ceremony</strong>
                  <p>Daily at 4:00 PM • Free Buna & Popcorn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Daily Specials */}
      <section className="specials-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">TODAY'S HIGHLAND DELICACIES</span>
            <h2 className="section-title">Chef's Signature Banquet Specials</h2>
            <p className="section-desc">Hand-selected delicacies slow-simmered according to multi-generational family recipes.</p>
          </div>

          <div className="dishes-grid">
            {chefSpecials.map(dish => (
              <article key={dish.id} className="dish-card">
                <div className="dish-card-media">
                  <img src={dish.image} alt={dish.title} loading="lazy" />
                  <span className="spice-tag">{dish.spiceLevel}</span>
                  {dish.isFasting && <span className="fasting-tag">Tsom / Vegan</span>}
                </div>
                <div className="dish-card-body">
                  <div className="dish-titles">
                    <h3 className="dish-title">{dish.title}</h3>
                    <span className="dish-amharic">{dish.amharic}</span>
                  </div>
                  <p className="dish-description">{dish.description}</p>
                  <div className="dish-card-footer">
                    <span className="dish-price">{dish.priceETB} ETB</span>
                    <div className="dish-actions">
                      <Link to={`/dish/${dish.id}`} className="btn btn-outline btn-sm">
                        Customize
                      </Link>
                      <button
                        onClick={() => addToCart(dish, 1)}
                        className="btn btn-primary btn-sm"
                        aria-label={`Add ${dish.title} to bag`}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="view-full-menu-cta">
            <Link to="/menu" className="btn btn-secondary">
              View All 9 Delicacies in Banquet Menu <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Cultural Buna Ceremony Highlight */}
      <section className="buna-section section-padding">
        <div className="container">
          <div className="buna-card-container">
            <div className="buna-info">
              <span className="section-subtitle" style={{ color: '#e6af2e' }}>THE SACRED RITUAL</span>
              <h2 className="buna-title">Daily Traditional Buna Ceremony</h2>
              <p className="buna-desc">
                In Ethiopia, coffee is never rushed — it is an honor and a spiritual gathering. Every afternoon at 4:00 PM, our hearth fills with the aromas of green Arabica beans roasting on open coals, burning frankincense, and freshly popped maize.
              </p>
              <div className="buna-steps">
                {BUNA_CEREMONY.rounds.map((round, idx) => (
                  <div key={idx} className="buna-step-item">
                    <span className="step-num">{idx + 1}</span>
                    <div>
                      <strong>{round.name}</strong>
                      <p>{round.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="buna-badge">
                <FiClock /> Scheduled {BUNA_CEREMONY.time} • {BUNA_CEREMONY.location}
              </div>
            </div>

            <div className="buna-image-box">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ethiopian_coffee_ceremony.jpg/800px-Ethiopian_coffee_ceremony.jpg"
                alt="Traditional Ethiopian Buna Ceremony with Jebena"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gursha Etiquette Section */}
      <section className="gursha-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">TRADITIONS OF THE MESOB</span>
            <h2 className="section-title">The Art of Gursha (ጉርሻ)</h2>
            <p className="section-desc">Dining from the same Mesob symbolizes friendship, trust, and shared life.</p>
          </div>

          <div className="gursha-grid">
            <div className="gursha-box">
              <div className="gursha-icon"><FiHeart /></div>
              <h3>Feeding with Love</h3>
              <p>Rolling a warm piece of injera around a choice piece of Doro Wat and feeding it directly to your dining partner is an Ethiopian gesture of deep affection and loyalty.</p>
            </div>
            <div className="gursha-box">
              <div className="gursha-icon"><GiCampCookingPot /></div>
              <h3>Right-Hand Dining</h3>
              <p>Habesha communal dining is enjoyed exclusively using the right hand. Injera is gently torn with fingertips to scoop up flavorful stews.</p>
            </div>
            <div className="gursha-box">
              <div className="gursha-icon"><FiStar /></div>
              <h3>The Rule of Two</h3>
              <p>When someone offers you a Gursha, it is customary to accept at least two — tradition holds that one Gursha alone is incomplete!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
