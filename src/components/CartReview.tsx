import { useContext } from "react";
import { CartItemType } from "../interface/CartItemType.type";
import { Product } from "../interface/Product.interface";
import { ThemeButton } from "./generic/ThemeButton";
import { CartContext } from "../contexts/cart.context";

type CartReviewProps = {
    cartItems: CartItemType[]
}

export const CartReview = ({ cartItems }: CartReviewProps) => {
    const { addItemToCart, decreaseItemFromCart, removeItemFromCart} = useContext(CartContext);

    const handleIncrementQuantity = async (product:Product) => {
        await addItemToCart?.(product);
    }

    const handleDecrementQuantity = async (product:Product) => {
        await decreaseItemFromCart?.(product);
    }

    const handleRemoveCartItem = async (product: Product) => {
        await removeItemFromCart?.(product);
    }
    
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    return (
        <>
        <table className="table-auto w-full sm:w-3/4 mx-auto m-5 rounded-lg overflow-hidden">
            <thead>
                <tr className="bg-purple-700 text-white">
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
                        return <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className="px-6 py-3"><img src={item.imageUrl} className="w-20 h-20 object-cover rounded mx-auto block" /></td>
                            <td className="px-6 py-3">{item.name}</td>
                            <td className="px-6 py-3">
                                <ThemeButton cb={() => handleDecrementQuantity(item)} type="button" btntype="tiny">-</ThemeButton>
                                {item.quantity}
                                <ThemeButton cb={() => handleIncrementQuantity(item)} type="button" btntype="tiny">+</ThemeButton>
                            </td>
                            <td className="px-6 py-3">₹{item.price}</td>
                            <td className="px-6 py-3">₹{item.quantity * item.price}</td>
                            <td className="px-6 py-3"><ThemeButton cb={() => handleRemoveCartItem(item)} type="button" btntype="tinyBlack">x</ThemeButton></td>
                        </tr>
                    })
                }
                <tr className="bg-purple-700 text-white">
                    <td colSpan={2} className="px-6 py-3"></td>
                    <td className="px-6 py-3">{totalCount}</td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3 font-sans font-bold">₹{totalPrice}</td>
                    <td className="px-6 py-3"></td>
                </tr>
            </tbody>
        </table>
    </>
  );
};