import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, DISHES } from '../data/dishesData';
import { useCart } from '../context/CartContext';
import { FiSearch, FiX, FiCheck, FiFilter } from 'react-icons/fi';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fastingOnly, setFastingOnly] = useState(false);
  const { addToCart } = useCart();

  const filteredDishes = useMemo(() => {
    return DISHES.filter(dish => {
      const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
      const matchesSearch =
        dish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.amharic.includes(searchQuery) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFasting = !fastingOnly || dish.isFasting;
      return matchesCategory && matchesSearch && matchesFasting;
    });
  }, [activeCategory, searchQuery, fastingOnly]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setFastingOnly(false);
  };

  return (
    <div className="menu-page">
      <header className="page-header">
        <div className="container">
          <span className="section-subtitle">THE ROYAL HABESHA SPREAD</span>
          <h1 className="page-title">Interactive Banquet Menu</h1>
          <p className="page-subtitle">
            Every dish is made to order with authentic imported berbere, certified non-GMO organic teff, and slow-braised meats.
          </p>

          {/* Search & Fasting Toggle Bar */}
          <div className="search-filter-controls">
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search wats, kitfo, tibs, teff..."
                aria-label="Search dishes"
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>

            <label className="fasting-toggle-label">
              <input
                type="checkbox"
                checked={fastingOnly}
                onChange={e => setFastingOnly(e.target.checked)}
              />
              <span>🌿 Fasting (የጾም / Vegan) Only</span>
            </label>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs" role="tablist">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <small className="category-amharic">{cat.amharic}</small>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Dishes Catalog */}
      <section className="container section-padding">
        <div className="menu-results-bar">
          <p className="results-count">
            Showing <strong>{filteredDishes.length}</strong> of {DISHES.length} delicacies
          </p>
          {(activeCategory !== 'all' || searchQuery || fastingOnly) && (
            <button onClick={handleResetFilters} className="btn-link">
              Reset All Filters
            </button>
          )}
        </div>

        {filteredDishes.length === 0 ? (
          <div className="empty-results-box" role="alert">
            <div className="empty-results-icon">🍽️</div>
            <h3>No Culinary Delicacies Found</h3>
            <p>
              We couldn't find any dishes matching "{searchQuery}" with the current filters.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary">
              Clear Filters & View Full Menu
            </button>
          </div>
        ) : (
          <div className="dishes-grid">
            {filteredDishes.map(dish => (
              <article key={dish.id} className="dish-card">
                <div className="dish-card-media">
                  <img src={dish.image} alt={dish.title} loading="lazy" />
                  <span className="spice-tag">{dish.spiceLevel}</span>
                  {dish.isFasting && <span className="fasting-tag">Tsom / Vegan</span>}
                  {dish.isChefSpecial && <span className="chef-badge">Signature</span>}
                </div>
                <div className="dish-card-body">
                  <div className="dish-titles">
                    <h2 className="dish-title">{dish.title}</h2>
                    <span className="dish-amharic">{dish.amharic}</span>
                  </div>
                  <p className="dish-description">{dish.description}</p>
                  
                  <div className="dish-ingredients-preview">
                    {dish.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="ingredient-pill">
                        <FiCheck size={11} /> {ing}
                      </span>
                    ))}
                    {dish.ingredients.length > 3 && (
                      <span className="ingredient-pill">+{dish.ingredients.length - 3} more</span>
                    )}
                  </div>

                  <div className="dish-card-footer">
                    <span className="dish-price">{dish.priceETB} ETB</span>
                    <div className="dish-actions">
                      <Link to={`/dish/${dish.id}`} className="btn btn-outline btn-sm">
                        Details & Options
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
        )}
      </section>
    </div>
  );
}
