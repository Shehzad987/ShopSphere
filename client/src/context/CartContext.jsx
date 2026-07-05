import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext(null);

const STORAGE_KEY = 'shopsphere_cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        const newQty = Math.min(existing.qty + qty, product.countInStock);
        toast.success(`${product.name} quantity updated in cart`);
        return prev.map((i) => (i._id === product._id ? { ...i, qty: newQty } : i));
      }
      toast.success(`${product.name} added to cart`);
      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty: Math.min(qty, product.countInStock),
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i._id !== productId));
    toast.success('Item removed from cart');
  }, []);

  const increaseQty = useCallback((productId) => {
    setItems((prev) =>
      prev.map((i) =>
        i._id === productId ? { ...i, qty: Math.min(i.qty + 1, i.countInStock) } : i
      )
    );
  }, []);

  const decreaseQty = useCallback((productId) => {
    setItems((prev) =>
      prev
        .map((i) => (i._id === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const setQty = useCallback((productId, qty) => {
    setItems((prev) =>
      prev.map((i) =>
        i._id === productId ? { ...i, qty: Math.max(1, Math.min(qty, i.countInStock)) } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const { itemCount, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => ({
        itemCount: acc.itemCount + i.qty,
        subtotal: acc.subtotal + i.qty * i.price,
      }),
      { itemCount: 0, subtotal: 0 }
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        setQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
