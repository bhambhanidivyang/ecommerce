import ShoppingCartIcon from "../../assets/shopping-bag.svg"
import { useDispatch, useSelector } from "react-redux";
import { selectTotalCountState } from "../../store/cart/cart.selector";
import { setIsCarOpen } from "../../store/cart/cart.actions";

export const CartIcon = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTotalCountState);
  const handleToggleIsCartOpen = () =>  dispatch(setIsCarOpen());
  return (
    <>
        <div className="relative inline-block cursor-pointer" onClick={handleToggleIsCartOpen}>
            <img src={ShoppingCartIcon} alt="Shopping Cart" className="w-8 h-8" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-black text-xs font-bold w-5 h-5 flex items-center justify-center">{totalCount}</span>
        </div>
    </>
  );
};