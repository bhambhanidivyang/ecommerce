import { combineReducers } from  'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { cartReducer } from './cart/cart.reducer';
import { configReducer } from './config/config.reducer';
import { checkoutReducer } from './checkout/checkout.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    config: configReducer,
    cart: cartReducer,
    checkout: checkoutReducer
})