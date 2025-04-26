import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ThemeButton } from "../../components/generic/ThemeButton";
import { Link } from "react-router-dom";
import { Stepper } from "../../components/generic/Stepper";
import { CartReview } from "../../components/CartReview";

export const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    const [stage, setStage] = useState(1);

    const handleClick = () => {
        if (stage < 3) {
            setStage((prev) => prev + 1);
        } else {
            setStage(1);
        }
    }

    return (
        <>
            <div className="text-center">
                {cartItems.length > 0 &&
                    <div>
                        <h1 className="text-4xl font-semibold font-sans p-5">Secure Checkout</h1>
                        <Stepper label1="Cart Review" label2="Details" label3="Order Review" stage={stage}/>
                        {stage === 1 && <CartReview cartItems={cartItems}  />}
                        {stage === 2 && <div>Details</div> }
                        {stage === 3 && <div>Review & Pay</div> }
                        <div onClick={handleClick} className="w-full sm:w-3/4 mx-auto">
                            <ThemeButton btntype="primary" type="button">
                                {stage === 3 ? "Complete Payment" : "Proceed"} <span className="text-lg">&#8702;</span>
                            </ThemeButton>
                        </div>
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