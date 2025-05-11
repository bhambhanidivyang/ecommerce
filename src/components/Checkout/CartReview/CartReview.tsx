import { CartItemType } from "../../../interface/CartItemType.type";
import { CartTotals } from "../Common/CartTotals";
import { CheckoutItem } from "./CheckoutItem";

type CartReviewProps = {
    cartItems: CartItemType[]
}

export const CartReview = ({ cartItems }: CartReviewProps) => {
    return (
        <>
        <table className="table-auto w-full mx-auto m-5 mb-0 rounded-t-lg overflow-hidden">
            <thead>
                <tr className="bg-black text-white">
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Unit Price</th>
                    <th className="px-6 py-3">Item Total</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    cartItems.map((item,index) => {
                        return <CheckoutItem key={index} index={index} item={item} />
                    })
                }
            </tbody>
        </table>
        <CartTotals />
    </>
  );
};