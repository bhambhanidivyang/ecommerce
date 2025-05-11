import { CartItem } from "../../Cart/CartItem";
import { CartItemType } from "../../../interface/CartItemType.type";
import { useSelector } from "react-redux";
import { selectCartItemsState, selectTotalCountState } from "../../../store/cart/cart.selector";
import { CartTotals } from "./CartTotals";

export const CompactCart = () => {
    const cartItems = useSelector(selectCartItemsState);
    const totalCount = useSelector(selectTotalCountState);
    return (
        <>
            <div className=" bg-white p-5 rounded-xl border-1 border-purple-200">
                <h2 className="font-bold pb-2 text-lg border-b-2 border-purple-500">Order Summary</h2>
                <div className="pt-2 text-sm font-semibold text-black">&#128722; {totalCount} item(s) in cart</div>
                <div className="border-b-2 border-purple-200">
                    {cartItems.map((item: CartItemType, index: number) => (
                        <CartItem item={item} key={index} />
                    ))}
                </div>
                <div>
                    <CartTotals />
                </div>
            </div>
        </>
    );
};