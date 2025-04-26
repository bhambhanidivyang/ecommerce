import { useContext } from "react";
import { CartItemType } from "../interface/CartItemType.type";
import { Product } from "../interface/Product.interface";
import { CartContext } from "../contexts/cart.context";
import { CheckoutItem } from "./CheckoutItem";

type CartReviewProps = {
    cartItems: CartItemType[]
}

export const CartReview = ({ cartItems }: CartReviewProps) => {
    const { totalCount, subTotalPrice, totalPrice, discountedAmount, taxedAmount} = useContext(CartContext);
    const discountRate = 10;

    return (
        <>
        <table className="table-auto w-full sm:w-3/4 mx-auto m-5 rounded-lg overflow-hidden">
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
                        return <CheckoutItem index={index} item={item} />
                    })
                }
                <tr className="bg-white border-t-1 border-gray-300 text-sm">
                    <td className="px-6 pt-3 text-right text-gray-600 italic" colSpan={5}>Sub Total for {totalCount} items</td>
                    <td className="px-6 pt-3 text-gray-600 italic">&#8377;{subTotalPrice}</td>
                    <td></td>
                </tr>
                <tr className="bg-white text-sm">
                    <td className="px-6 pt-1 text-right text-gray-600 italic" colSpan={5}>Coupon Discount @ {discountRate} %</td>
                    <td className="px-6 pt-1 text-red-600 italic">- &#8377;{discountedAmount}</td>
                    <td></td>
                </tr>
                <tr className="bg-white text-sm">
                    <td className="px-6 pt-1 pb-3 text-right text-gray-600 italic" colSpan={5}>Tax & Charges</td>
                    <td className="px-6 pt-1 pb-3 text-gray-600 italic">&#8377;{taxedAmount}</td>
                    <td></td>
                </tr>
                <tr className="text-black border-t-1 border-gray-300 bg-white">
                    <td colSpan={5} className="px-6 py-3 text-right font-sans italic font-semibold">Total Price:</td>
                    <td className="px-6 py-3 text-md font-sans italic font-semibold">₹{totalPrice}</td>
                </tr>
            </tbody>
        </table>
    </>
  );
};