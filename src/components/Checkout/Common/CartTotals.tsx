import { useSelector } from "react-redux";
import { selectDiscountedAmountState, selectSubTotalPriceState, selectTaxedAmountState, selectTotalCountState, selectTotalPriceState } from "../../../store/cart/cart.selector";
import { selectDiscountRateState, selectTaxRateState } from "../../../store/config/config.selector";

export const CartTotals = () => {
    const totalCount = useSelector(selectTotalCountState);
    const subTotalPrice = useSelector(selectSubTotalPriceState);
    const totalPrice = useSelector(selectTotalPriceState);
    const discountedAmount = useSelector(selectDiscountedAmountState);
    const taxedAmount = useSelector(selectTaxedAmountState);
    const discountRate = useSelector(selectDiscountRateState);
    const taxRate = useSelector(selectTaxRateState);
    return (
        <>
            <table className="table-auto w-full mx-auto rounded-b-lg overflow-hidden">
                <tbody>
                    <tr className="bg-white border-t-1 border-gray-300 text-sm">
                        <td className="px-2 pt-3 text-right text-gray-600 italic" colSpan={5}>Sub Total for {totalCount} items</td>
                        <td className="px-2 pt-3 text-gray-600 italic">${subTotalPrice}</td>
                    </tr>
                    <tr className="bg-white text-sm">
                        <td className="px-2 pt-1 text-right text-gray-600 italic" colSpan={5}>Coupon Discount @ {discountRate}%</td>
                        <td className="px-2 pt-1 text-red-600 italic">- ${discountedAmount}</td>
                    </tr>
                    <tr className="bg-white text-sm">
                        <td className="px-2 pt-1 pb-3 text-right text-gray-600 italic" colSpan={5}>Tax & Charges @ {taxRate}%</td>
                        <td className="px-2 pt-1 pb-3 text-gray-600 italic">${taxedAmount}</td>
                    </tr>
                    <tr className="text-black border-t-1 border-gray-300 bg-white">
                        <td colSpan={5} className="px-2 py-3 text-right font-sans italic font-semibold">Total Price:</td>
                        <td className="px-2 py-3 text-md font-sans italic font-semibold">₹{totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};