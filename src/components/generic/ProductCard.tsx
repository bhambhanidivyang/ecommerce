import { Product } from '../../interface/Product.interface'
import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItemsState } from '../../store/cart/cart.selector';
import { ThemeButton } from './ThemeButton';
import { useDispatch, useSelector } from 'react-redux';

type ProductCardProps = {
    product: Product;
    index: number;
    data?: Product[];
    lastProductRef?: (node: HTMLDivElement | null) => void
};
export const ProductCard: React.FC<ProductCardProps> = ({ product, index, data, lastProductRef }) => {
    const { name, imageUrl, ratingDesc, price, rating} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItemsState);

    const handleAddToCart = async () => {
        const productToAdd: Product = {...product};
        await dispatch(addItemToCart(cartItems, productToAdd));
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