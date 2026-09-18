import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AlertCircle, Coffee, ShoppingBag, X } from 'lucide-react';
import { fetchMenu } from '../api/client';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import MenuCard from '../components/menu/MenuCard';
import MenuFilterBar from '../components/menu/MenuFilterBar';
import MenuItemModal from '../components/menu/MenuItemModal';
import { formatPrice } from '../components/menu/menuUtils';

const CATEGORIES = ['All', 'Espresso & Classics', 'Cold Brew & Drafts', 'Signature Creations', 'Artisanal Pastries'];
const DIETARY_OPTIONS = ['Vegan', 'GF', 'Dairy-Free', 'Vegetarian'];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [cart, setCart] = useState({});

  useEffect(() => {
    document.title = 'Curated Menu | Ember & Bloom Coffee Roasters';

    fetchMenu()
      .then((res) => {
        if (res.data) setMenuItems(res.data);
      })
      .catch((err) => {
        console.error('Menu load error:', err);
        setError('Unable to reach the café kitchen right now. Please try again shortly.');
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleDietary = (tag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedDietary([]);
  };

  // Cart handlers
  const addToCart = useCallback((id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const decrementCart = useCallback((id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);
  const closeModal = useCallback(() => setActiveItem(null), []);

  // Filter items in memory
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      if (selectedDietary.length > 0) {
        const itemTags = (item.dietary || []).map((t) => t.toLowerCase());
        const matchesAll = selectedDietary.every((reqTag) =>
          itemTags.some((t) => t.includes(reqTag.toLowerCase()))
        );
        if (!matchesAll) return false;
      }

      return true;
    });
  }, [menuItems, selectedCategory, selectedDietary]);

  const filterSignature = useMemo(
    () => `${selectedCategory}|${[...selectedDietary].sort().join(',')}|${menuItems.length}`,
    [selectedCategory, selectedDietary, menuItems.length]
  );

  const cartCount = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const cartTotal = menuItems.reduce(
    (sum, item) => sum + item.price * (cart[item.id] || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#faf6ef] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeader
          eyebrow="Daily Roasts & Provisions"
          title="The Curated Café Menu"
          description="Every beverage is pulled to precision brew ratios; all pastries are handcrafted daily by our in-house baker using wild leavening and pasture butter."
        />

        {/* Filter Bar */}
        <MenuFilterBar
          categories={CATEGORIES}
          dietaryOptions={DIETARY_OPTIONS}
          selectedCategory={selectedCategory}
          selectedDietary={selectedDietary}
          onSelectCategory={setSelectedCategory}
          onToggleDietary={toggleDietary}
          onReset={resetFilters}
          count={filteredItems.length}
        />

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[480px] animate-pulse rounded-3xl border border-[#e7dfd0] bg-[#fffdf9]/70"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <p className="text-sm font-medium">{error}</p>
            <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="mt-4">
              Reload Menu
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl border border-[#e7dfd0] bg-[#fffdf9] p-12 text-center">
            <Coffee className="mx-auto mb-4 h-12 w-12 text-gold-500/80" />
            <h3 className="font-display text-xl font-bold text-[#2e1f16]">No matching items found</h3>
            <p className="mt-2 text-sm text-[#7a6c61]">
              We couldn't find any menu items matching your category and dietary criteria.
            </p>
            <Button size="sm" variant="primary" onClick={resetFilters} className="mt-6">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Menu grid — keyed so it fades/slides in on every filter change */}
        {!loading && !error && filteredItems.length > 0 && (
          <div
            key={filterSignature}
            className="grid animate-menu-fade-slide grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                qty={cart[item.id] || 0}
                onOpen={() => setActiveItem(item)}
                onAdd={() => addToCart(item.id)}
                onIncrement={() => addToCart(item.id)}
                onDecrement={() => decrementCart(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      <MenuItemModal
        item={activeItem}
        qty={activeItem ? cart[activeItem.id] || 0 : 0}
        onClose={closeModal}
        onAdd={() => activeItem && addToCart(activeItem.id)}
        onIncrement={() => activeItem && addToCart(activeItem.id)}
        onDecrement={() => activeItem && decrementCart(activeItem.id)}
      />

      {/* Running cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
          <div className="flex animate-menu-cart-rise items-center gap-4 rounded-full border border-[#e0d3b8] bg-espresso-950/95 px-5 py-3 shadow-2xl backdrop-blur-md">
            <ShoppingBag className="h-5 w-5 text-gold-300" />
            <div className="text-left">
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.18em] text-cream-300/70">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in order
              </p>
              <p className="font-display text-lg font-bold leading-tight text-cream-50">
                {formatPrice(cartTotal)}
              </p>
            </div>
            <div className="mx-1 h-8 w-px bg-cream-300/20" />
            <button
              type="button"
              onClick={clearCart}
              aria-label="Clear order"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-300/10 text-cream-200 transition-colors duration-200 hover:bg-cream-300/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}