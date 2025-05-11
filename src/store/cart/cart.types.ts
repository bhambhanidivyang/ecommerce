import { CartItemType } from "../../interface/CartItemType.type"
import { Product } from "../../interface/Product.interface";

export type CartStateType = {
    isCartOpen?: boolean,
    cartItems: CartItemType[],
    totalCount ?: number,
    totalPrice ?: number,
    subTotalPrice ?: number,
    discountedAmount?: number,
    taxedAmount?: number
}

export type actionProps = 
| { type: 'SET_IS_CART_OPEN'; payload: null }
| { type: 'ADD_ITEM_TO_CART'; payload: Product }
| { type: 'DECREASE_ITEM_FROM_CART'; payload: Product }
| { type: 'REMOVE_ITEM_FROM_CART'; payload: Product }
| {
    type: 'SET_CART_ITEMS';
    payload: {
        cartItems: CartItemType[];
        totalCount: number;
        subTotalPrice: number;
        discountedAmount: number;
        taxedAmount: number;
        totalPrice: number;
    };
};

export const CART_INITIAL_STATE: CartStateType = {
    isCartOpen: false,
    cartItems: [],
    totalCount : 0,
    totalPrice : 0,
    subTotalPrice : 0,
    discountedAmount: 0,
    taxedAmount: 0
}