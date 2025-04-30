import { Link } from "react-router";
import { Product } from "../../interface/Product.interface";
import { ProductCard } from "../../components/generic/ProductCard";

type CategoryPreviewProps = {
    title: string,
    products: Product[]
}

export const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
    return (
    <>    
        <div key={title}>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold mb-4 capitalize">{title}</h2>
                <Link to={title} className="font-bold text-purple-500 mb-4 capitalize">View More</Link>
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.slice(0,4).map((value: Product, index: number) => (
                    <ProductCard product={value} key={index} index={index} />
                ))}
            </div>
        </div>
    </>
  );
};