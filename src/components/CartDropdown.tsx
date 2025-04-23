import { ThemeButton } from "./generic/ThemeButton";

export const CartDropdown = () => {
    const cartItems: any = [{
        name: "Something",
        id: 1,
        imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
        quantity: 4,
        price: 10
    }];
    return (
        <>
            <div className="absolute right-0 top-10 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-4">
                {cartItems.length === 0 
                    ? <div className="text-center text-gray-500">Cart is empty</div>
                    : (cartItems.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-3 py-2 border-b last:border-b-0 m-2">
                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                                {item.quantity} × ${item.price}
                            </p>
                            </div>
                        </div>
                    ))
                )}
                <div className="text-center">
                    <ThemeButton btntype="primary" type="button">Go To Checkout</ThemeButton>
                </div>
            </div>
        </>
    );
};