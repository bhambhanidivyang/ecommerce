import { createContext, useState } from 'react'
import { CartItemType } from '../interface/CartItemType.type';
import { Product } from '../interface/Product.interface';

type CartContextType = {
    isCartOpen?: boolean,
    setIsCarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    cartItems: CartItemType[],
    addItemToCart?: ( productToAdd: Product ) => void,
    decreaseItemFromCart?: ( productToAdd: Product ) => void,
    removeItemFromCart ?: ( productToAdd: Product ) => void,
    totalCount ?: number,
    totalPrice ?: number,
    subTotalPrice ?: number,
    discountedAmount?: number,
    taxedAmount?: number
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

const CartProvider = ({ children }: React.PropsWithChildren) => {
    const [isCartOpen, setIsCarOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const discountRate = 10;
    const taxRate = 18;

    const addItemToCart = (productToAdd: Product) => {
        setCartItems((prev) => addCartItem(prev, productToAdd));
    }

    const decreaseItemFromCart = (productToDecrease: Product) => {
        setCartItems((prev) => decreaseCartItem(prev, productToDecrease));
    }

    const removeItemFromCart = (productToRemove: Product) => {
        setCartItems((prev) => removeCartItem(prev, productToRemove));
    }

    const totalCount: number = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const subTotalPrice: number = parseFloat(Math.round(cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)).toFixed(2));

    const discountedAmount: number = parseFloat(Math.round(subTotalPrice * (discountRate/100)).toFixed(2));
    
    const taxedAmount: number = parseFloat(Math.round(subTotalPrice * (taxRate/100)).toFixed(2));

    const totalPrice: number = subTotalPrice - discountedAmount + taxedAmount; 

    const value = { isCartOpen, setIsCarOpen, cartItems, addItemToCart, decreaseItemFromCart, removeItemFromCart, totalCount, totalPrice, subTotalPrice, discountedAmount, taxedAmount };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

export default CartProvider;