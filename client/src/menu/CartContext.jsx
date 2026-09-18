import React, { createContext, useContext, useReducer, useEffect } from "react";

const CART_KEY = "eb_cart_v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
}

/**
 * Build a stable key for a cart line so that the same product
 * with different customizations is stored as a separate line.
 */
export function buildCartKey(itemId, options) {
  const sorted = Object.keys(options)
    .sort()
    .map((k) => k + "=" + options[k])
    .join("|");
  return itemId + "::" + sorted;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const key = buildCartKey(action.item.id, action.options);
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) =>
          l.key === key ? { ...l, qty: l.qty + action.qty } : l
        );
      }
      return [
        ...state,
        {
          key,
          item: action.item,
          options: action.options,
          optionLabels: action.optionLabels,
          unitPrice: action.unitPrice,
          qty: action.qty,
        },
      ];
    }
    case "SET_QTY": {
      if (action.qty < 1) return state;
      return state.map((l) =>
        l.key === action.key ? { ...l, qty: action.qty } : l
      );
    }
    case "REMOVE":
      return state.filter((l) => l.key !== action.key);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(cartReducer, [], loadCart);

  // Persist every change to localStorage
  useEffect(() => {
    saveCart(lines);
  }, [lines]);

  function addToCart(item, options, optionLabels, unitPrice, qty) {
    dispatch({ type: "ADD", item, options, optionLabels, unitPrice, qty });
  }

  function setQty(key, qty) {
    dispatch({ type: "SET_QTY", key, qty });
  }

  function removeLine(key) {
    dispatch({ type: "REMOVE", key });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  const totalItems = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);

  return (
    <CartContext.Provider
      value={{ lines, addToCart, setQty, removeLine, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
