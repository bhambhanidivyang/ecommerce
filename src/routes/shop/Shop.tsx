import { useEffect, useRef, useState, useContext } from "react"
import { LazyList } from "../../components/LazyList";
import {Product} from "../../interface/Product.interface";
import { ProductsContext } from "../../contexts/products.context";

export const Shop = () => {
    const {products} = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState("");
    const [initialProducts, setInitialProducts] = useState<Product[]>([]);
    const didFetchRef = useRef(false); // 🚨 Important
    const maxPage = Math.ceil((products.length/10));

    useEffect(() => {
        if (!didFetchRef.current) {
            fetchProducts();
            didFetchRef.current = true;
        }
    }, [])

    const fetchProducts = () => {
        if (page > maxPage) return;
        try {
            setLoading(true);
            const startIndex = (page - 1) * 10;
            const endIndex = startIndex + 10;
            const nextChunk = products.slice(startIndex, endIndex);
            setInitialProducts((prev) => [...prev, ...nextChunk]);
            setPage((prev) => prev + 1);
            setLoading(false); 
        } catch(error) {
            console.log(error, 'API Error');
            setError("Something went wrong! Please check console for detailed error.");
            setLoading(false);
        }
    }

    const filteredProducts = initialProducts;

    return (
        <>
            <div className="p-5 bg-gray-100">
                {loading && <div className="text-xl font-black text-center">Loading...</div>}
                {error && <div className="text-md text-center text-red-500">{error}</div>}
                {!loading && initialProducts.length === 0 
                    ? <div className="text-md text-center">No Products Found</div>
                    : <LazyList data={filteredProducts} apiCallback={fetchProducts}/>
                }
            </div>
        </>
    )
}
