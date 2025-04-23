import { createContext, useState } from 'react'

type CartContextType = {
    isCartOpen: boolean,
    setIsCarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartContext = createContext<CartContextType>({
    isCartOpen: false,
    setIsCarOpen: () => {}
})

const CartProvider = ({ children }: React.PropsWithChildren) => {
    const [isCartOpen, setIsCarOpen] = useState(false);
    const value = { isCartOpen, setIsCarOpen };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

export default CartProvider;