import { CartItemType } from "../../interface/CartItemType.type";

type CartItemProps = {
    item: CartItemType
}

export const CartItem = ({ item }: CartItemProps) => {
  return (
    <>
      <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-300 last:border-b-0 m-2">
            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-600">
                {item.quantity} × ${item.price}
            </p>
            </div>
        </div>
    </>
  );
};