import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Coffee, AlertCircle, ShoppingBag, Zap, Minus, Plus } from "lucide-react";
import { fetchMenu } from "../api/client";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useCart } from "../menu/CartContext";
import { useToast } from "../components/ui/ToastContext";
import {
  getOptionsForCategory,
  calcUnitPrice,
  buildOptionLabels,
  getDefaultSelections,
} from "../menu/menuOptions";

export function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Customization option group renderer ────────────────────────────────────
function OptionGroup({ group, selections, onChange }) {
  function handleRadio(choiceId) {
    onChange(group.id, choiceId);
  }
  function handleCheckbox(choiceId, checked) {
    const prev = Array.isArray(selections[group.id]) ? selections[group.id] : [];
    onChange(group.id, checked ? [...prev, choiceId] : prev.filter((c) => c !== choiceId));
  }

  return (
    <div className="mb-6">
      <span className="text-[11px] uppercase tracking-widest text-espresso-500 block mb-3 font-semibold">
        {group.label}
        {group.required && <span className="text-gold-600 ml-1">*</span>}
      </span>
      {group.type === "radio" && (
        <div className="flex flex-wrap gap-2">
          {group.choices.map((c) => {
            const active = selections[group.id] === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleRadio(c.id)}
                aria-pressed={active}
                className={
                  "px-3.5 py-2 rounded-full text-xs font-medium border transition-all " +
                  (active
                    ? "bg-espresso-900 text-gold-300 border-gold-500/40 shadow-sm"
                    : "bg-cream-50 text-espresso-700 border-cream-300/80 hover:border-gold-400 hover:bg-cream-100")
                }
              >
                {c.label}
                {c.price > 0 && (
                  <span className={active ? " text-gold-400" : " text-espresso-500"}>
                    {" +$" + c.price.toFixed(2)}
                  </span>
                )}
                {c.price < 0 && (
                  <span className={active ? " text-gold-400" : " text-espresso-500"}>
                    {" -$" + Math.abs(c.price).toFixed(2)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
      {group.type === "checkbox" && (
        <div className="flex flex-wrap gap-2">
          {group.choices.map((c) => {
            const sel = Array.isArray(selections[group.id]) ? selections[group.id] : [];
            const active = sel.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCheckbox(c.id, !active)}
                aria-pressed={active}
                className={
                  "px-3.5 py-2 rounded-full text-xs font-medium border transition-all " +
                  (active
                    ? "bg-espresso-900 text-gold-300 border-gold-500/40 shadow-sm"
                    : "bg-cream-50 text-espresso-700 border-cream-300/80 hover:border-gold-400 hover:bg-cream-100")
                }
              >
                {active ? "✓ " : ""}{c.label}
                {c.price > 0 && (
                  <span className={active ? " text-gold-400" : " text-espresso-500"}>
                    {" +$" + c.price.toFixed(2)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Quantity Selector ──────────────────────────────────────────────────────
function QtySelector({ qty, onChange }) {
  return (
    <div className="flex items-center gap-0 rounded-full border border-cream-300/80 overflow-hidden shadow-sm" role="group" aria-label="Quantity">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="w-10 h-10 flex items-center justify-center text-espresso-700 hover:bg-cream-200 transition-colors disabled:opacity-40"
        disabled={qty <= 1}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="min-w-[2.5rem] text-center font-semibold text-espresso-900 text-sm select-none">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="w-10 h-10 flex items-center justify-center text-espresso-700 hover:bg-cream-200 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Inline card for related products ──────────────────────────────────────
function RelatedCard({ rel }) {
  return (
    <Link
      to={"/menu/" + toSlug(rel.name)}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-2xl"
      aria-label={"View " + rel.name}
    >
      <Card className="p-0 overflow-hidden flex flex-col h-full">
        <div className="relative h-48 overflow-hidden bg-espresso-900">
          <img
            src={rel.image}
            alt={rel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="absolute top-3 right-3 bg-espresso-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-500/50 text-gold-300 font-serif font-bold text-sm shadow-md">
            ${rel.price.toFixed(2)}
          </div>
          {rel.featured && (
            <div className="absolute top-3 left-3 bg-gold-500 text-espresso-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Staff Pick
            </div>
          )}
          {rel.roastLevel && (
            <div className="absolute bottom-3 left-3">
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-espresso-950/80 text-cream-100 backdrop-blur-sm border border-espresso-700">
                {rel.roastLevel}
              </span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-1">{rel.category}</span>
          <h3 className="font-serif text-lg font-bold text-espresso-950 group-hover:text-gold-600 transition-colors mb-1.5">
            {rel.name}
          </h3>
          <p className="text-sm text-espresso-700/80 leading-relaxed flex-1">{rel.description}</p>
          {rel.tastingNotes && rel.tastingNotes.length > 0 && (
            <div className="pt-3 border-t border-cream-300/60 mt-3">
              <div className="flex flex-wrap gap-1.5">
                {rel.tastingNotes.map((n) => (
                  <span key={n} className="text-xs px-2.5 py-0.5 rounded-md bg-cream-200 text-espresso-800 font-medium">{n}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function MenuItemPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const { addToast } = useToast();

  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchMenu()
      .then((res) => { if (res.data) setAllItems(res.data); })
      .catch((err) => {
        console.error("Menu load error:", err);
        setError("Unable to reach the cafe kitchen right now. Please try again shortly.");
      })
      .finally(() => setLoading(false));
  }, []);

  const item = useMemo(
    () => allItems.find((i) => toSlug(i.name) === slug),
    [allItems, slug]
  );

  const optionGroups = useMemo(
    () => (item ? getOptionsForCategory(item.category) : []),
    [item]
  );

  const [selections, setSelections] = useState({});

  // Reset selections when item changes
  useEffect(() => {
    if (item) {
      const groups = getOptionsForCategory(item.category);
      setSelections(getDefaultSelections(groups));
      setQty(1);
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      document.title = item.name + " | Ember & Bloom Coffee Roasters";
    } else if (!loading) {
      document.title = "Item Not Found | Ember & Bloom Coffee Roasters";
    }
  }, [item, loading]);

  function handleOptionChange(groupId, value) {
    setSelections((prev) => ({ ...prev, [groupId]: value }));
  }

  const unitPrice = useMemo(
    () => (item ? calcUnitPrice(item.price, optionGroups, selections) : 0),
    [item, optionGroups, selections]
  );

  const lineTotal = Math.round(unitPrice * qty * 100) / 100;

  function handleAddToCart() {
    if (!item) return;
    const labels = buildOptionLabels(optionGroups, selections);
    addToCart(item, selections, labels, unitPrice, qty);
    addToast({
      title: "Added to cart",
      message: item.name + (labels.length ? " — " + labels.join(", ") : ""),
      type: "success",
      duration: 4000,
    });
  }

  function handleBuyNow() {
    if (!item) return;
    const labels = buildOptionLabels(optionGroups, selections);
    addToCart(item, selections, labels, unitPrice, qty);
    navigate("/menu/checkout");
  }

  const related = useMemo(() => {
    if (!item || allItems.length === 0) return [];
    const sameCategory = allItems.filter((i) => i.id !== item.id && i.category === item.category);
    const others = allItems.filter((i) => i.id !== item.id && i.category !== item.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [allItems, item]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="bg-cream-50 min-h-screen py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-24 bg-cream-200 rounded animate-pulse mb-10" />
          <div className="bg-cream-100 rounded-2xl h-96 animate-pulse mb-8 border border-cream-300/50" />
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="h-3 w-28 bg-cream-200 rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-cream-200 rounded animate-pulse" />
            <div className="h-20 bg-cream-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <p className="text-sm text-espresso-700 leading-relaxed mb-6">{error}</p>
          <Link to="/menu"><Button variant="primary" icon={ArrowLeft}>Back to Menu</Button></Link>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (!item) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">Not Found</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950 mb-4">Spilled Grounds</h1>
          <p className="text-sm text-espresso-700 leading-relaxed mb-8">
            We could not find that item in our menu. It may have been enjoyed or moved to our seasonal rotation.
          </p>
          <Link to="/menu"><Button variant="primary" icon={ArrowLeft}>Back to Full Menu</Button></Link>
        </div>
      </div>
    );
  }

  // ── Detail Page ──
  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top nav row */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm text-espresso-600 hover:text-gold-600 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Menu
          </Link>
          {totalItems > 0 && (
            <Link
              to="/menu/cart"
              className="inline-flex items-center gap-2 text-sm font-medium text-espresso-700 hover:text-gold-600 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              <span className="bg-gold-500 text-espresso-950 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
          )}
        </div>

        {/* Hero image */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-espresso-900 mb-10 shadow-artisanal">
          <div className="aspect-video sm:aspect-[16/6]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <div className="absolute top-4 right-4 bg-espresso-950/90 backdrop-blur-md px-4 py-2 rounded-full border border-gold-500/50 text-gold-300 font-serif font-bold text-base shadow-md">
            ${item.price.toFixed(2)}
          </div>
          {item.featured && (
            <div className="absolute top-4 left-4 bg-gold-500 text-espresso-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Staff Pick
            </div>
          )}
          {item.roastLevel && (
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-espresso-950/80 text-cream-100 backdrop-blur-sm border border-espresso-700">
                {item.roastLevel}
              </span>
            </div>
          )}
        </div>

        {/* Two-column layout on desktop */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left: product info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-wider text-gold-600 font-semibold">{item.category}</span>
              {item.dietary && item.dietary.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.dietary.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950 leading-tight mb-4">
              {item.name}
            </h1>

            <p className="text-base text-espresso-700/90 leading-relaxed mb-8">{item.description}</p>

            <div className="border-t border-cream-300/60 mb-8" />

            {item.tastingNotes && item.tastingNotes.length > 0 && (
              <div className="mb-8">
                <span className="text-[11px] uppercase tracking-widest text-espresso-500 block mb-3 font-semibold">Tasting Profile</span>
                <div className="flex flex-wrap gap-2">
                  {item.tastingNotes.map((note) => (
                    <span key={note} className="text-sm px-3.5 py-1.5 rounded-lg bg-cream-200 text-espresso-800 font-medium border border-cream-300/60">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.origin && (
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-widest text-espresso-500 block mb-1.5 font-semibold">Origin &amp; Terroir</span>
                <p className="text-sm text-espresso-600 italic">{item.origin}</p>
              </div>
            )}

            {item.roastLevel && (
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-widest text-espresso-500 block mb-1.5 font-semibold">Roast Level</span>
                <p className="text-sm text-espresso-700">{item.roastLevel}</p>
              </div>
            )}
          </div>

          {/* Right: order panel */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="bg-cream-100/90 rounded-2xl border border-cream-300/70 p-6 shadow-sm sticky top-24">

              {/* Price display */}
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-[11px] uppercase tracking-widest text-espresso-500 font-semibold">Total</span>
                <span className="font-serif text-2xl font-bold text-espresso-950">
                  ${lineTotal.toFixed(2)}
                </span>
              </div>

              {/* Option groups */}
              {optionGroups.length > 0 && (
                <div className="mb-2">
                  {optionGroups.map((group) => (
                    <OptionGroup
                      key={group.id}
                      group={group}
                      selections={selections}
                      onChange={handleOptionChange}
                    />
                  ))}
                  <div className="border-t border-cream-300/60 mb-6" />
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] uppercase tracking-widest text-espresso-500 font-semibold">Quantity</span>
                <QtySelector qty={qty} onChange={setQty} />
              </div>

              {/* Unit price breakdown */}
              <div className="flex items-center justify-between text-xs text-espresso-600 mb-6">
                <span>${unitPrice.toFixed(2)} each</span>
                {qty > 1 && <span>× {qty} = ${lineTotal.toFixed(2)}</span>}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center gap-2 w-full font-semibold rounded-full text-sm px-5 py-2.5 bg-espresso-900 hover:bg-espresso-800 text-cream-50 border border-espresso-700 hover:border-gold-500/40 shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="inline-flex items-center justify-center gap-2 w-full font-semibold rounded-full text-sm px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-espresso-950 shadow-md hover:shadow-glow-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4" />
                  Buy Now
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-cream-300/60">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-950 mb-2 text-center">Explore More</h2>
            <p className="text-sm text-espresso-600/80 text-center mb-10">You might also enjoy these from our curated menu.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel) => <RelatedCard key={rel.id} rel={rel} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
