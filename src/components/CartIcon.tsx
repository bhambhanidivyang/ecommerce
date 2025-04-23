import { useContext } from "react";
import ShoppingCartIcon from "../assets/shopping-bag.svg"
import { CartContext } from "../contexts/cart.context";

export const CartIcon = () => {
  const { isCartOpen, setIsCarOpen } = useContext(CartContext);
  const handleToggleIsCartOpen = () => setIsCarOpen(!isCartOpen);
  const handleBlurCartIcon = () =>  isCartOpen && setIsCarOpen(false);
  return (
    <>
        <div className="relative inline-block" onClick={handleToggleIsCartOpen} onBlur={handleBlurCartIcon}>
            <img src={ShoppingCartIcon} alt="Shopping Cart" className="w-8 h-8" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-black text-xs font-bold w-5 h-5 flex items-center justify-center">
        0
      </span>
        </div>
    </>
  );
};