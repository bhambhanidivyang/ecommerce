import { useNavigate } from "react-router-dom";
import { ThemeButton } from "../generic/ThemeButton";
import { CartItem } from "./CartItem";
import { CartItemType } from "../../interface/CartItemType.type";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsState, selectIsCartOpenState } from "../../store/cart/cart.selector";
import { useEffect, useRef } from "react";
import { setIsCarOpen } from "../../store/cart/cart.actions";

export const CartDropdown = () => {
    const cartItems = useSelector(selectCartItemsState);
    const isCartOpen = useSelector(selectIsCartOpenState);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                dispatch(setIsCarOpen());
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const handleProceedToCheckout = () => {
        navigate('/checkout');
        dispatch(setIsCarOpen());
    }

    return (
        <>
            <div  ref={dropdownRef} className={`absolute right-0 top-10 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-4 transform transition-all duration-300 ease-in-out
    ${isCartOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`} >
                {cartItems.length === 0 
                    ? <div className="text-center text-gray-500">Cart is empty</div>
                    : (cartItems.map((item: CartItemType, index: number) => (
                        <CartItem item={item} key={index} />
                    ))
                )}
                {cartItems.length !== 0 
                    &&
                    <div className="text-center">
                        <ThemeButton cb={handleProceedToCheckout} btntype="primary" type="button">Go To Checkout</ThemeButton>
                    </div>
                }
            </div>
        </>
    );
};