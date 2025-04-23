import { createContext, useState } from 'react'
import DATA from '../../shop-data.json'
import { Product } from '../interface/Product.interface'

type ProductsContextType = {
    products: Product[]
}

export const ProductsContext = createContext<ProductsContextType>({
    products: []
})

const ProductsProvider = ({ children }: React.PropsWithChildren) => {
    const [products, setProducts] = useState(DATA);
    const value = { products };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};

export default ProductsProvider;