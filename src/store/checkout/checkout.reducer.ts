import { actionProps, CHECKOUT_ACTIONS, CHECKOUT_INITIAL_STATE, CheckoutState } from "./checkout.types";

export const checkoutReducer = (state: CheckoutState = CHECKOUT_INITIAL_STATE, action: actionProps = {}) => {
    if ('type' in action && 'payload' in action) {
        const {type, payload} = action;
        switch (type) {
            case CHECKOUT_ACTIONS.UPDATE_CHECKOUT_INFO:
                return {
                    ...state,
                    ...payload
                }
        }
    }
    return state;
}