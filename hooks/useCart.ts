import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

export const useCart = () => {
  const [fetchCartItems, totalAmount, items, removeCartItem, loading] =
    useCartStore((state) => [
      state.fetchCartItems,
      state.totalAmount,
      state.items,
      state.removeCartItem,
      state.loading,
    ]);
  useEffect(() => {
    fetchCartItems();
  }, []);

  return { totalAmount, items, removeCartItem, loading };
};
