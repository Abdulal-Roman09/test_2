import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { useCart } from "../menu/CartContext";
import Button from "../components/ui/Button";

function CartLineRow({ line }) {
  const { setQty, removeLine } = useCart();
  const { key, item, optionLabels, unitPrice, qty } = line;
  const lineTotal = Math.round(unitPrice * qty * 100) / 100;

  return (
    <div className="flex gap-4 py-5 border-b border-cream-300/60 last:border-0">
      {/* Thumbnail */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-espresso-900 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-0.5">{item.category}</p>
        <h3 className="font-serif text-base font-bold text-espresso-950 leading-tight mb-1">{item.name}</h3>
        {optionLabels && optionLabels.length > 0 && (
          <p className="text-xs text-espresso-600 mb-2">{optionLabels.join(" · ")}</p>
        )}
        <p className="text-xs text-espresso-500">${unitPrice.toFixed(2)} each</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          type="button"
          onClick={() => removeLine(key)}
          aria-label={"Remove " + item.name}
          className="text-espresso-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 rounded-full border border-cream-300/80 overflow-hidden shadow-sm">
          <button
            type="button"
            aria-label="Decrease"
            onClick={() => qty > 1 ? setQty(key, qty - 1) : removeLine(key)}
            className="w-8 h-8 flex items-center justify-center text-espresso-700 hover:bg-cream-200 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="min-w-[1.75rem] text-center text-sm font-semibold text-espresso-900 select-none">{qty}</span>
          <button
            type="button"
            aria-label="Increase"
            onClick={() => setQty(key, qty + 1)}
            className="w-8 h-8 flex items-center justify-center text-espresso-700 hover:bg-cream-200 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <span className="font-serif font-bold text-espresso-950 text-sm">${lineTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { lines, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Your Cart | Ember & Bloom Coffee Roasters";
  }, []);

  const isEmpty = lines.length === 0;

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-1.5 text-sm text-espresso-600 hover:text-gold-600 font-medium transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Menu
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950 mb-2">Your Cart</h1>
        <p className="text-sm text-espresso-600/80 mb-10">
          {isEmpty ? "Your cart is empty." : lines.length + " item" + (lines.length !== 1 ? "s" : "") + " ready to order."}
        </p>

        {isEmpty ? (
          <div className="bg-cream-100 rounded-3xl p-12 text-center border border-cream-300/70">
            <ShoppingBag className="w-12 h-12 text-gold-500/80 mx-auto mb-4" />
            <p className="text-espresso-600 text-sm mb-6">Nothing here yet. Browse our menu to get started.</p>
            <Link to="/menu"><Button variant="primary">Browse Menu</Button></Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Lines */}
            <div className="flex-1 min-w-0 bg-cream-100/90 rounded-2xl border border-cream-300/70 p-6 shadow-sm">
              {lines.map((line) => <CartLineRow key={line.key} line={line} />)}
              <button
                type="button"
                onClick={clearCart}
                className="mt-4 text-xs text-espresso-500 hover:text-red-500 underline transition-colors"
              >
                Clear entire cart
              </button>
            </div>

            {/* Summary */}
            <div className="lg:w-72 shrink-0">
              <div className="bg-cream-100/90 rounded-2xl border border-cream-300/70 p-6 shadow-sm sticky top-24">
                <h2 className="font-serif text-lg font-bold text-espresso-950 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  {lines.map((l) => (
                    <div key={l.key} className="flex justify-between text-xs text-espresso-700">
                      <span className="truncate pr-2">{l.item.name} × {l.qty}</span>
                      <span className="shrink-0">${(l.unitPrice * l.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-cream-300/60 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-espresso-950">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-serif text-lg">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-espresso-500 mt-1">Tax &amp; fees calculated at checkout</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/menu/checkout")}
                    className="inline-flex items-center justify-center gap-2 w-full font-semibold rounded-full text-sm px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-espresso-950 shadow-md hover:shadow-glow-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 active:scale-[0.98]"
                  >
                    <Zap className="w-4 h-4" />
                    Proceed to Checkout
                  </button>
                  <Link to="/menu" className="inline-flex items-center justify-center w-full">
                    <Button variant="outline" className="w-full justify-center">Continue Browsing</Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
