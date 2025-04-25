import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeButton } from "./generic/ThemeButton";
import { CartItem } from "./CartItem";
import { CartItemType } from "../interface/CartItemType.type";
import { CartContext } from "../contexts/cart.context";

export const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <>
            <div className="absolute right-0 top-10 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-4">
                {cartItems.length === 0 
                    ? <div className="text-center text-gray-500">Cart is empty</div>
                    : (cartItems.map((item: CartItemType, index: number) => (
                        <CartItem item={item} key={index} />
                    ))
                )}
                {cartItems.length !== 0 
                    &&
                    <div className="text-center">
                        <Link to="/checkout"><ThemeButton btntype="primary" type="button">Go To Checkout</ThemeButton></Link>
                    </div>
                }
            </div>
        </>
    );
};