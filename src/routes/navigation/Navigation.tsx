import { Outlet, Link, NavLink } from "react-router-dom"
import { signOutUser } from '../../../utils/firebase/firebase.utils'
import { CartIcon } from "../../components/Cart/CartIcon"
import { CartDropdown } from "../../components/Cart/CartDropdown"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { setCurrentUser } from "../../store/user/user.actions"
import { selectIsCartOpenState } from "../../store/cart/cart.selector"
import { persistor } from "../../store/store"

const linkColor = {
    inactive: "block mt-4 lg:inline-block lg:mt-0 text-black hover:text-purple-400 mr-4",
    active: "block mt-4 lg:inline-block lg:mt-0 text-purple-500 hover:text-black mr-4 border-t-2",
}

export const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpenState);

    const handleSignOut = async () => {
        await signOutUser();
        persistor.purge();
        dispatch(setCurrentUser(null));
    }

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap p-2 bg-white">
                <div className="flex items-center text-black mr-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/images/vite.svg" alt="Logo" className="h-6 w-6" /><span className="font-semibold text-xl tracking-tight">DivCommerce</span>
                    </Link>
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:w-auto justify-end">
                    <div className="text-sm items-center flex">
                        <NavLink className={({isActive}) => isActive ? linkColor['active'] : linkColor['inactive']} to="/shop">Shop</NavLink>
                        <NavLink className={({isActive}) => isActive ? linkColor['active'] : linkColor['inactive']} to="/contact">Contact</NavLink>

                        {!currentUser 
                            ? <NavLink className={({isActive}) => isActive ? linkColor['active'] : linkColor['inactive']} to="/sign-in">Sign In</NavLink> 
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