import { createAction } from "../../../utils/reducer/reducer.utils"
import { CHECKOUT_ACTIONS, CheckoutState } from "./checkout.types";

export const setCheckoutInfo = (payload:CheckoutState) => {
    return createAction(CHECKOUT_ACTIONS.UPDATE_CHECKOUT_INFO, payload);
}