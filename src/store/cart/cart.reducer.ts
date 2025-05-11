import { actionProps, CART_INITIAL_STATE, CartStateType } from "./cart.types";

export const cartReducer = (state: CartStateType = CART_INITIAL_STATE, action: actionProps) => {
    const {type, payload} = action;

    switch (type) {
        case 'SET_CART_ITEMS': {
            return {
                ...state,
                ...payload
            }
        }
        case 'SET_IS_CART_OPEN': {
            return {...state, isCartOpen: !state.isCartOpen}
        }
        default:
            return state;
    }
}