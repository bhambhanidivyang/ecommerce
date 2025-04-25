import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ThemeButton } from "../../components/generic/ThemeButton";
import { Link } from "react-router-dom";
import { Stepper } from "../../components/generic/Stepper";
import { CartReview } from "../../components/CartReview";

export const Checkout = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <>
            <div className="text-center">
                <h1 className="text-5xl font-semibold font-sans p-5 m-5">Secure Checkout</h1>
                {cartItems.length > 0 &&
                    <div>
                        <Stepper label1="Cart Review" label2="Details" label3="Order Review" />
                        <CartReview cartItems={cartItems}  />
                    </div>
                }
                {cartItems.length === 0 &&
                <div className="flex flex-col items-center justify-center mt-10 w-full overflow-hidden">
                    <h1 className="font-sans px-2 py-5 font-black text-5xl">Nothing Here!</h1>
                    <h3 className="font-sans px-2 text-xl">Your cart is empty! Please add products to proceed.</h3>
                    <Link className="px-2 py-5" to="/shop"><ThemeButton btntype="primary" type="button">Start Shopping</ThemeButton></Link>
                </div>
                }
            </div>
        </>
    );
};