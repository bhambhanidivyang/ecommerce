import { actionProps, CONFIG_ACTIONS, CONFIG_INITIAL_STATE, CONFIG_STATE_TYPE } from "./config.types";

export const configReducer = (state: CONFIG_STATE_TYPE = CONFIG_INITIAL_STATE, action: actionProps = {}) => {
    if ('type' in action && 'payload' in action) {
        const {type, payload} = action;
        switch (type) {
            case CONFIG_ACTIONS.SET_DISCOUNT_RATE:
                return {
                    ...state,
                    discountRate: payload
                };
            case CONFIG_ACTIONS.SET_TAX_RATE:
                return {
                    ...state,
                    taxRate: payload
                };
            default:
                return state;
        }
    } 
    return state;
}