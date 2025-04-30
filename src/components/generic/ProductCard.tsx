import { useContext } from 'react';
import { Product } from '../../interface/Product.interface'
import { ThemeButton } from './ThemeButton';
import { CartContext } from '../../contexts/cart.context';

type ProductCardProps = {
    product: Product;
    index: number;
    data?: Product[];
    lastProductRef?: (node: HTMLDivElement | null) => void
};
export const ProductCard: React.FC<ProductCardProps> = ({ product, index, data, lastProductRef }) => {
    const { name, imageUrl, ratingDesc, price, rating} = product;
    const { addItemToCart } = useContext(CartContext);

    const handleAddToCart = async () => {
            
        const productToAdd: Product = {...product};
        await addItemToCart?.(productToAdd);
    }
    return (
        <>
            <div ref={data && (index === data.length - 1) ? lastProductRef : null} className="max-w-sm rounded bg-white text-center overflow-hidden shadow-lg" key={index}>
                <img className="w-full h-64 object-cover" src={imageUrl} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="mb-2">
                        <span className="font-bold font-sans">{rating}</span> 
                        <span className="text-orange-400 text-xl"> ✯</span> 
                        <span className="text-xs text-gray-400"> {ratingDesc}</span>
                    </div>
                    <div className="font-bold text-md mb-2">{name}</div>
                    <p className="text-gray-700 font-semibold text-xl text-base">₹{price}</p>
                    <p className="text-gray-500 text-xs">Limited Time Offer</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <ThemeButton type='button' btntype='outlined' cb={handleAddToCart} >Add to Cart</ThemeButton>
                </div>
            </div>
        </>
    )
}