import { createContext, useReducer } from 'react'
import { CartItemType } from '../interface/CartItemType.type';
import { Product } from '../interface/Product.interface';
import {createAction} from "../../utils/reducer/reducer.utils"

type CartContextType = {
    isCartOpen?: boolean,
    cartItems: CartItemType[],
    totalCount ?: number,
    totalPrice ?: number,
    subTotalPrice ?: number,
    discountedAmount?: number,
    taxedAmount?: number
    setIsCarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    addItemToCart?: ( productToAdd: Product ) => void,
    decreaseItemFromCart?: ( productToAdd: Product ) => void,
    removeItemFromCart ?: ( productToAdd: Product ) => void,
}

type CartStateType = {
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

const cartReducer = (state: CartStateType, action: actionProps): CartStateType => {
    const {type, payload} = action;
    switch (type) {
        case 'SET_CART_ITEMS': {
            return {
                ...state,
                ...payload
            }
        }
        case 'SET_IS_CART_OPEN': {
            return {...state, isCartOpen: !state.isCartOpen}
        }
        default:
            throw new Error('Error in ' + type);
    }
}

export const CartContext = createContext<CartContextType>({
    isCartOpen: false,
    setIsCarOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    decreaseItemFromCart: () => {},
    removeItemFromCart: () => {},
    totalCount: 0,
    subTotalPrice: 0,
    totalPrice: 0,
    discountedAmount: 0,
    taxedAmount: 0
})

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalCount : 0,
    totalPrice : 0,
    subTotalPrice : 0,
    discountedAmount: 0,
    taxedAmount: 0
}

const CartProvider = ({ children }: React.PropsWithChildren) => {
    const [{isCartOpen, cartItems, discountedAmount, subTotalPrice, taxedAmount, totalCount, totalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemReducer = (newCartItems: CartItemType[]) => {
        const totals = calculateTotals(newCartItems, 10, 18);
        dispatch(createAction('SET_CART_ITEMS', {
                cartItems: newCartItems,
                ...totals
            }));
    }

    const setIsCarOpen = () => {
        dispatch(createAction('SET_IS_CART_OPEN', null));
    }

    const addItemToCart = (product: Product) => {
        const updatedCart = addCartItem(cartItems, product);
        updateCartItemReducer(updatedCart);
    }
    const decreaseItemFromCart = (product: Product) => {
        const updatedCart = decreaseCartItem(cartItems, product);
        updateCartItemReducer(updatedCart);
    }
    const removeItemFromCart = (product: Product) => {
        const updatedCart = removeCartItem(cartItems, product);
        updateCartItemReducer(updatedCart);
    }

    const value = { isCartOpen, setIsCarOpen, cartItems, addItemToCart, decreaseItemFromCart, removeItemFromCart, totalCount, totalPrice, subTotalPrice, discountedAmount, taxedAmount };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

export default CartProvider;