import { useRef } from "react";
import { ProductCard } from "../components/generic/ProductCard"
import {Product} from "../interface/Product.interface";

type LazyListProps = {
    data: Product[]; // Expecting an array of objects
    apiCallback: () => void // pass callback for api request and state update
};

/**
 * 
 * @param LazyListProps 
 * @returns LazyList
 * How to use: <LazyList data={filteredCars} apiCallback={fetchCars}/>
 */

export const LazyList: React.FC<LazyListProps> = ({data, apiCallback}) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductRef = (node: HTMLDivElement | null) => {
        // if (loading) return;
        if (observer.current) observer.current.disconnect(); // Clean up previous observer
    
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { // Check if last item is visible
                setTimeout(() => {
                    apiCallback(); // Load next page
                },500);
            }
        }, {
            rootMargin: "0px", threshold: 1
        });
    
        if (node) observer.current.observe(node); // Attach observer to last item
    };
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 p-5">
            {
                data.map((product, index) => (
                    <ProductCard product={product} key={index} index={index} data={data} lastProductRef={lastProductRef} />
                ))
            }
            </div>
        </>
    )
}