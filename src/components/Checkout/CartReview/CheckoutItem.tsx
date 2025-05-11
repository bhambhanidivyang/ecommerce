import { ThemeButton } from "../../generic/ThemeButton";
import { CartItemType } from "../../../interface/CartItemType.type";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, decreaseItemFromCart, removeItemFromCart } from "../../../store/cart/cart.actions";
import { selectCartItemsState } from "../../../store/cart/cart.selector";

type CheckoutItemProps = {
    item: CartItemType,
    index: number
}

export const CheckoutItem = ({item, index}: CheckoutItemProps) => {
    const {id, name, imageUrl, price, quantity} = item;
    const cartItems = useSelector(selectCartItemsState);
    const dispatch = useDispatch();

    const handleIncrementQuantity = () => dispatch(addItemToCart(cartItems, item));
    const handleDecrementQuantity = () => dispatch(decreaseItemFromCart(cartItems, item));
    const handleRemoveCartItem = () => dispatch(removeItemFromCart(cartItems, item));
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
            <td className="px-3 py-1">${price}</td>
            <td className="px-3 py-1">${quantity * price}</td>
            <td className="px-3 py-1"><ThemeButton cb={handleRemoveCartItem} type="button" btntype="tinyBlack">x</ThemeButton></td>
        </tr>
    </>
  );
};