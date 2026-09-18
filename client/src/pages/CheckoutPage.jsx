import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "../menu/CartContext";
import Button from "../components/ui/Button";

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    document.title = "Checkout | Ember & Bloom Coffee Roasters";
  }, []);

  // Tax: 8.5% flat
  const TAX_RATE = 0.085;
  const taxAmt = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + taxAmt) * 100) / 100;

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (!name.trim()) { setFormError("Please enter your name."); return; }
    if (!email.trim() || !email.includes("@")) { setFormError("Please enter a valid email address."); return; }
    setFormError("");
    setPlaced(true);
    clearCart();
  }

  if (lines.length === 0 && !placed) {
    return (
      <div className="bg-cream-50 min-h-screen py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm text-espresso-600 hover:text-gold-600 font-medium transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Menu
          </Link>
          <div className="bg-cream-100 rounded-3xl p-12 text-center border border-cream-300/70">
            <ShoppingBag className="w-12 h-12 text-gold-500/80 mx-auto mb-4" />
            <p className="text-espresso-600 text-sm mb-6">Your cart is empty. Add some items before checking out.</p>
            <Link to="/menu"><Button variant="primary">Browse Menu</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-gold-600" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">Order Received</span>
          <h1 className="font-serif text-3xl font-bold text-espresso-950 mb-4">Thank you, {name.split(" ")[0]}!</h1>
          <p className="text-sm text-espresso-700 leading-relaxed mb-8">
            Your order has been placed. We will send a confirmation to <strong>{email}</strong> shortly. Pop by the counter and we will have it ready for you.
          </p>
          <Link to="/menu"><Button variant="primary">Back to Menu</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/menu/cart" className="inline-flex items-center gap-1.5 text-sm text-espresso-600 hover:text-gold-600 font-medium transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Cart
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950 mb-2">Checkout</h1>
        <p className="text-sm text-espresso-600/80 mb-10">Review your order and confirm your details below.</p>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Contact form */}
          <form onSubmit={handlePlaceOrder} className="flex-1 min-w-0">
            <div className="bg-cream-100/90 rounded-2xl border border-cream-300/70 p-6 shadow-sm mb-6">
              <h2 className="font-serif text-lg font-bold text-espresso-950 mb-5">Your Details</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="block text-xs uppercase tracking-wider text-espresso-600 font-semibold mb-1.5">
                    Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-cream-50 border border-cream-300 text-espresso-900 placeholder-espresso-400 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkout-email" className="block text-xs uppercase tracking-wider text-espresso-600 font-semibold mb-1.5">
                    Email
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-cream-50 border border-cream-300 text-espresso-900 placeholder-espresso-400 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment placeholder */}
            <div className="bg-cream-100/90 rounded-2xl border border-cream-300/70 p-6 shadow-sm mb-6">
              <h2 className="font-serif text-lg font-bold text-espresso-950 mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gold-500" />
                Payment
              </h2>
              <p className="text-xs text-espresso-600 leading-relaxed">
                Online payment integration is ready to be connected (Stripe, Square, etc.). Currently, orders are confirmed and settled at the counter.
              </p>
              <div className="mt-4 rounded-xl border-2 border-dashed border-cream-300 p-4 text-center text-xs text-espresso-500">
                Payment gateway integration point
              </div>
            </div>

            {formError && (
              <p className="text-sm text-red-600 mb-4">{formError}</p>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full font-semibold rounded-full text-base px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-espresso-950 shadow-md hover:shadow-glow-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </form>

          {/* Order summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-cream-100/90 rounded-2xl border border-cream-300/70 p-6 shadow-sm sticky top-24">
              <h2 className="font-serif text-lg font-bold text-espresso-950 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-4">
                {lines.map((l) => (
                  <div key={l.key} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-espresso-900 shrink-0">
                      <img src={l.item.image} alt={l.item.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.style.display = "none"; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-espresso-900 leading-tight">{l.item.name}</p>
                      {l.optionLabels && l.optionLabels.length > 0 && (
                        <p className="text-[11px] text-espresso-500 mt-0.5">{l.optionLabels.join(" · ")}</p>
                      )}
                      <p className="text-xs text-espresso-600 mt-0.5">× {l.qty}</p>
                    </div>
                    <span className="text-xs font-bold text-espresso-950 shrink-0">${(l.unitPrice * l.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream-300/60 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-espresso-700">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-espresso-700">
                  <span>Tax (8.5%)</span><span>${taxAmt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-espresso-950 pt-2 border-t border-cream-300/60">
                  <span>Total</span>
                  <span className="font-serif text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
