import { useState } from "react";
import { ThemeButton } from "../../components/generic/ThemeButton";
import { Link } from "react-router-dom";
import { Stepper } from "../../components/generic/Stepper";
import { CartReview } from "../../components/Checkout/CartReview/CartReview";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsState } from "../../store/cart/cart.selector";
import { CheckoutDetailsForm } from "../../components/Checkout/Details/CheckoutDetailsForm";
import { setCheckoutInfo } from "../../store/checkout/checkout.actions";
import { OrderReview } from "../../components/Checkout/OrderReview/OrderReview";

export const Checkout = () => {
    const cartItems = useSelector(selectCartItemsState);
    const [stage, setStage] = useState(1);
    const dispatch = useDispatch();

    const [contactInfo, setContactInfo] = useState({});
    const [shippingInfo, setShippingInfo] = useState({});
    const [giftOptions, setGiftOptions] = useState(false);

    const labels = [
        "Cart Review",
        "Details",
        "Order Review"
    ]

    const handleClick = () => {
        if (stage < 3) {
            if (stage === 2) {
                dispatch(setCheckoutInfo({
                    contactInfo,
                    shippingInfo,
                    giftOptions
                }));
            }
            setStage((prev) => prev + 1);
        } else {
            setStage(3);
        }
    }

    const handleBack = () => {
        if (stage > 1) {
            setStage((prev) => prev - 1);
        } else {
            setStage(1);
        }
    }

    return (
        <>
            <div className="text-center">
                {cartItems.length > 0 &&
                    <div className="w-full sm:w-3/4 mx-auto">
                        <h1 className="text-4xl font-semibold font-sans p-5">Secure Checkout</h1>
                        <Stepper labels={labels} stage={stage}/>
                        {stage === 1 && <CartReview cartItems={cartItems}  />}
                        {stage === 2 && 
                            <CheckoutDetailsForm
                                setContactInfo={setContactInfo}
                                setShippingInfo={setShippingInfo}
                                setGiftOptions={setGiftOptions} /> 
                        }
                        {stage === 3 && <OrderReview /> }
                        <div className="w-full sm:w-3/4 mx-auto space-x-2 my-5">
                            <ThemeButton btntype="outlined" type="button" cb={handleBack}>Back</ThemeButton>
                            <ThemeButton btntype="primary" type="button" cb={handleClick} >
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