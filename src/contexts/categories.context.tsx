import { createContext, useEffect, useState } from 'react'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { Product } from '../interface/Product.interface'
// import SHOP_DATA from "../../shop-data"

type CategoriesContextType = {
    categories: {[key: string]: Product[]},
    setCategories: React.Dispatch<React.SetStateAction<{ [key: string]: Product[] }>>
}

export const CategoriesContext = createContext<CategoriesContextType>({
    categories: {},
    setCategories: () => {}
})

const CategoriesProvider = ({ children }: React.PropsWithChildren) => {
    const [categories, setCategories] = useState<{ [key: string]: Product[] }>({});
    const value = { categories, setCategories };
    
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            setCategories(categoriesMap);
        }
        getCategoriesMap();
        // addCollectionAndDocuments('categories', SHOP_DATA, 'title');
    }, []);
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};

export default CategoriesProvider;