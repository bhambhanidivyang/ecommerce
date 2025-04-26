import { useContext } from "react";
import { ThemeButton } from "./generic/ThemeButton";
import { CartContext } from "../contexts/cart.context";
import { CartItemType } from "../interface/CartItemType.type";

type CheckoutItemProps = {
    item: CartItemType,
    index: number
}

export const CheckoutItem = ({item, index}: CheckoutItemProps) => {
    const {id, name, imageUrl, price, quantity} = item;
    const { addItemToCart, decreaseItemFromCart, removeItemFromCart} = useContext(CartContext);

    const handleIncrementQuantity = () => addItemToCart?.(item);
    const handleDecrementQuantity = () => decreaseItemFromCart?.(item);
    const handleRemoveCartItem = () => removeItemFromCart?.(item);
    return (
    <>
      <tr key={id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
            <td className="px-3 py-1"><img src={imageUrl} className="w-10 h-10 object-cover rounded mx-auto block" /></td>
            <td className="px-3 py-1">{name}</td>
            <td className="px-3 py-1">
                <ThemeButton cb={handleDecrementQuantity} type="button" btntype="tiny">-</ThemeButton>
                {quantity}
                <ThemeButton cb={handleIncrementQuantity} type="button" btntype="tiny">+</ThemeButton>
            </td>
            <td className="px-3 py-1">&#8377;{price}</td>
            <td className="px-3 py-1">&#8377;{quantity * price}</td>
            <td className="px-3 py-1"><ThemeButton cb={handleRemoveCartItem} type="button" btntype="tinyBlack">x</ThemeButton></td>
        </tr>
    </>
  );
};