<div align="center">

  <h1>🍽️ MESOB HOUSE (መሶብ ቤት)</h1>
  <p><strong>Addis Eats Capstone — Authentic Habesha Culinary Heritage & Digital Dining Web Application</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React_Router-v7.x-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/CSS3-Vanilla_Design-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="Vanilla CSS" />
  </p>

  <p>
    <i>Experience slow-simmered wats, 100% stone-ground teff injera, prime kitfo, traditional Buna coffee ceremony, and communal Gursha dining.</i>
  </p>

</div>

---

## 📌 Capstone Deliverables & Documentation

This repository fulfills the complete capstone brief and rubric requirements:
1. **One-Page Written Brief**: [`BRIEF.md`](./BRIEF.md) (The Problem, The Target Users, Five Screens & Data Models, Verification Checks).
2. **Route Map**: Full multi-screen React Router architecture connecting all 5 screens.
3. **Running Scaffold**: Production-tested Vite scaffold with shared `Layout`, dynamic routes, global cart context, and interactive live order tracker.

---

## 🗺️ Route Map Architecture

All 5 core screens are reachable through descriptive, SEO-friendly routes:

| Route Path | Screen / Page | Ownership & Features |
| :--- | :--- | :--- |
| **`/`** | **Heritage Home** | Hero banner, daily chef specials, 4:00 PM Buna ceremony ritual, and Gursha etiquette guide. |
| **`/menu`** | **Banquet Menu** | Full catalog with category tabs (Wats, Tibs, Kitfo, Tsom/Vegan, Drinks), search bar, fasting filter, and direct cart actions. |
| **`/dish/:id`** | **Dish Detail & Customizer** | Dynamic route for dish inspection, spice level selector, pure stone-ground teff options, and ingredient manifests. |
| **`/checkout`** | **Dining Bag & Checkout** | Dining mode selector (Dine-in Mesob table, Addis express delivery, Bole pickup), dynamic delivery calculations, and order dispatch. |
| **`/tracker`** | **Live Order Stepper** | Real-time status lookup (Order Received → Simmering → Injera Rolling → Courier Dispatched → Delivered at Mesob) with order simulation controls. |

---

## 🌳 Component Tree & Ownership

```text
[App] (Root Provider: CartProvider, BrowserRouter)
 └── [Layout] (Master Chrome)
      ├── [TopBanner] (Heritage pure teff and buna ceremony alerts)
      ├── [Header] (Brand logo, desktop/tablet navigation, shopping bag counter)
      ├── [Outlet] (Renders active routed page)
      │    ├── <HomePage />
      │    ├── <MenuPage />
      │    ├── <DishDetailPage />
      │    ├── <CheckoutPage />
      │    └── <OrderTrackerPage />
      └── [Footer] (Operating hours, Bole Medhanialem hearth location, contact)
```

---

## 📋 State-Placement Table

| State Variable | Data Type | Owning Scope | Consumers | Mutators / Actions |
| :--- | :--- | :--- | :--- | :--- |
| `cart` | `Array<CartItem>` | `CartContext` (`localStorage`) | `Layout` (Header count), `CheckoutPage`, `DishDetailPage`, `MenuPage` | `addToCart(dish, qty, opts)`, `updateQuantity(id, qty)`, `removeFromCart(id)`, `clearCart()` |
| `diningMode` | `'dine-in' \| 'delivery' \| 'pickup'` | `CartContext` | `CheckoutPage`, `OrderTrackerPage` | `setDiningMode(mode)` |
| `activeCategory` | `String` (`'all'`) | `MenuPage` | Category Tabs, Filtered Grid | `setActiveCategory(catId)` |
| `searchQuery` | `String` (`''`) | `MenuPage` | Search Bar, Filtered Grid | `setSearchQuery(e.target.value)` |
| `fastingOnly` | `Boolean` (`false`) | `MenuPage` | Fasting Toggle, Filtered Grid | `setFastingOnly(e.target.checked)` |
| `selectedSpice` | `String` | `DishDetailPage` | Spice pill buttons | `setSelectedSpice(lvl)` |
| `selectedInjera` | `String` | `DishDetailPage` | Injera pill buttons | `setSelectedInjera(grain)` |
| `activeStepIndex` | `Number` (`0..4`) | `OrderTrackerPage` | Stepper nodes | `advanceStep()`, `resetStep()` |

---

## 🛡️ Six Failure Checks & Accessibility Audits

1. **Empty Search Recovery**: `/menu` handles queries with 0 results cleanly, displaying an authentic recovery illustration and a one-click reset button.
2. **Empty Cart Defense**: `/checkout` gracefully handles 0 items by rendering a friendly empty mesob card with a call-to-action to browse delicacies.
3. **Invalid Route & ID Handling**: `/dish/:id` and unmatched routes render structured fallback 404 cards with safe navigation back to the menu or home.
4. **Form Validation**: Checkout form enforces required contact details, valid Ethiopian phone formats, and delivery destinations before placing orders.
5. **Keyboard Accessibility**: Complete `:focus-visible` ring indicators across all buttons, inputs, tabs, and links.
6. **High-Contrast Greyscale Compliance**: Text, badges, and status steppers maintain contrast ratios above WCAG AA (4.5:1).

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Compile production build
npm run build

# 4. Preview production build
npm run preview
```
