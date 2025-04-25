import { useContext } from "react";
import ShoppingCartIcon from "../assets/shopping-bag.svg"
import { CartContext } from "../contexts/cart.context";

export const CartIcon = () => {
  const { isCartOpen, setIsCarOpen, cartItems } = useContext(CartContext);
  const handleToggleIsCartOpen = () => setIsCarOpen(!isCartOpen);
  const countQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
        <div className="relative inline-block cursor-pointer" onClick={handleToggleIsCartOpen}>
            <img src={ShoppingCartIcon} alt="Shopping Cart" className="w-8 h-8" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-black text-xs font-bold w-5 h-5 flex items-center justify-center">{countQuantity}</span>
        </div>
    </>
  );
};