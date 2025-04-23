import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import {UserContext} from '../../contexts/user.context'
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from '../../../utils/firebase/firebase.utils'
import { CartIcon } from "../../components/CartIcon"
import { CartDropdown } from "../../components/CartDropdown"

export const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const handleSignOut = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap p-2 bg-white">
                <div className="flex items-center text-black mr-6">
                    <Link to="/">
                        <img src="/images/vite.svg" />
                    </Link>
                    <span className="font-semibold text-xl tracking-tight">DivCommerce</span>
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:w-auto justify-end">
                    <div className="text-sm items-center flex">
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-purple-400 mr-4" to="/shop">Shop</Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-purple-400 mr-4" to="/contact">Contact</Link>

                        {!currentUser 
                            ? <Link className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-purple-400 mr-4" to="/sign-in">Sign In</Link> 
                            : <Link className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-purple-400 mr-4" to="/" onClick={handleSignOut}>Sign Out</Link>}

                            <CartIcon />                           
                        
                    </div>
                </div>
                {isCartOpen && <CartDropdown />}
            </nav>
            <Outlet />
        </>
    )
}