import { useContext } from "react"
import { CategoriesContext } from "../../contexts/categories.context";
import { CategoryPreview } from "./CategoryPreview";

export const CategoriesPreview = () => {
    const {categories, setCategories} = useContext(CategoriesContext);
    const allProducts = Object.values(categories).flat();

    return (
        <>
            <div className="p-10">
                {
                    allProducts.length === 0
                        ? <div className="w-1/3 mx-auto px-3 py-3 text-xl font-medium leading-none text-center text-purple-800 bg-purple-200 rounded-full animate-pulse dark:bg-purple-900 dark:text-purple-200">Loading Product Categories</div>
                        : <div className="flex flex-col gap-10 m-5 p-5">
                            {Object.keys(categories).map((categoryName,index) => {
                                const products = categories[categoryName];
                                return <CategoryPreview title={categoryName} key={index} products={products} />
                            })}
                        </div>
                }
            </div>
        </>
    )
};