import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('addis_eats_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [diningMode, setDiningMode] = useState('dine-in'); // 'dine-in', 'delivery', 'pickup'
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('addis_eats_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart with localStorage:', e);
    }
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const addToCart = (dish, quantity = 1, options = {}) => {
    const spice = options.spice || dish.spiceLevel || 'Standard';
    const injera = options.injera || '100% Pure Teff';
    const cartItemId = `${dish.id}-${spice}-${injera}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          dishId: dish.id,
          title: dish.title,
          amharic: dish.amharic,
          priceETB: dish.priceETB,
          image: dish.image,
          quantity,
          spice,
          injera
        }
      ];
    });

    showToast(`Added ${quantity}x "${dish.title}" to Mesob bag!`);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Removed delicacy from bag.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalETB = cart.reduce((sum, item) => sum + item.priceETB * item.quantity, 0);
  const deliveryFeeETB = diningMode === 'delivery' ? 120 : 0;
  const totalETB = subtotalETB + deliveryFeeETB;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotalETB,
        deliveryFeeETB,
        totalETB,
        diningMode,
        setDiningMode,
        toastMessage
      }}
    >
      {children}
      {toastMessage && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span className="toast-icon">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
