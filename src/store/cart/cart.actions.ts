import { createAction } from "../../../utils/reducer/reducer.utils";
import { CartItemType } from "../../interface/CartItemType.type";
import { Product } from "../../interface/Product.interface";

// Actions
export const updateCartItemReducer = (newCartItems: CartItemType[]) => {
    const totals = calculateTotals(newCartItems, 10, 18);
    return createAction('SET_CART_ITEMS', {
        cartItems: newCartItems,
        ...totals
    });
}

export const setIsCarOpen = () => {
    return createAction('SET_IS_CART_OPEN', null);
}

export const addItemToCart = (cartItems:CartItemType[], product: Product) => {
    console.log(cartItems, product, 'params');
    
    const updatedCart = addCartItem(cartItems, product);
    return updateCartItemReducer(updatedCart);
}

export const decreaseItemFromCart = (cartItems:CartItemType[], product: Product) => {
    const updatedCart = decreaseCartItem(cartItems, product);
    return updateCartItemReducer(updatedCart);
}

export const removeItemFromCart = (cartItems:CartItemType[], product: Product) => {
    const updatedCart = removeCartItem(cartItems, product);
    return updateCartItemReducer(updatedCart);
}

// Computation Logic
const calculateTotals = (cartItems: CartItemType[], discountRate: number, taxRate: number) => {
    const totalCount: number = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subTotalPrice: number = parseFloat(Math.round(cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)).toFixed(2));
    const discountedAmount: number = parseFloat(Math.round(subTotalPrice * (discountRate/100)).toFixed(2));
    const taxedAmount: number = parseFloat(Math.round(subTotalPrice * (taxRate/100)).toFixed(2));
    const totalPrice: number = subTotalPrice - discountedAmount + taxedAmount;

    return {
        totalCount,
        subTotalPrice,
        discountedAmount,
        taxedAmount,
        totalPrice
    }
}

const addCartItem = (cartItems: CartItemType[], productToAdd: Product): CartItemType[] => {
    const itemExists = cartItems.some(item => item.id === productToAdd.id);

    if (itemExists) {
        return cartItems.map((item) =>
            item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const decreaseCartItem = (cartItems: CartItemType[], productToRemove: Product) => {
    return cartItems.reduce<CartItemType[]>((acc, item) => {
        if (item.id === productToRemove.id) {
            if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 })
            }
        } else  {
            acc.push(item);
        }
        return acc;
    }, []);
}

const removeCartItem = (cartItems: CartItemType[], productToRemove: Product) => {
    return cartItems.filter((item) => item.id !== productToRemove.id)
}