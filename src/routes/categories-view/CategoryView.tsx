import { useContext, useEffect, useState } from "react";
import { Product } from "../../interface/Product.interface";
import { CategoriesContext } from "../../contexts/categories.context";
import { useParams } from "react-router-dom";
import { LazyList } from "../../components/generic/LazyList";

export const CategoryView = () => {
    const { category } = useParams();
    const {categories} = useContext(CategoriesContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState("");
    const allProducts = categories[category!];
    const maxPage = allProducts && Math.ceil(allProducts.length/10);

    useEffect(() => {
        fetchProducts();
    }, [category, categories])

    // Reset when category changes
    useEffect(() => {
        setProducts([]);
        setPage(1);
    }, [category]);

    const fetchProducts = async () => {
        if (page > maxPage) return
        if (allProducts) {
            try { 
                console.log('trying');
                setLoading(true);
                const startIndex = (page - 1) * 10;
                const endIndex = startIndex + 10;
                const nextChunk = allProducts.slice(startIndex, endIndex);
                console.log(allProducts, startIndex, endIndex, nextChunk,'param');
                setProducts((prev) => [...prev, ...nextChunk]);
                setPage((prev) => prev + 1);
            } catch(e) {
                console.log('failed');
                setError("Something went wrong! Please check console for detailed error.");
            } finally {
                setLoading(false); 
            }
        }
    }
    
    const filteredProducts = products;

    return (
    <>    
        <div key={category} className="flex flex-col m-5 p-5 ">
            <div className="text-center w-full p-5">
                <h2 className="text-4xl font-semibold mb-5 text-gray-700 capitalize">{category}</h2>
            </div>
            <div>
            {
                loading ? <div className="text-xl font-black text-center">Loading...</div>
                : error ? <div className="text-md text-center text-red-500">{error}</div>
                : allProducts.length === 0 ? <div className="text-md text-center">No Products Found</div>
                : products && <LazyList data={filteredProducts} apiCallback={fetchProducts}/>
            }
            </div>
        </div>
    </>
  );
};