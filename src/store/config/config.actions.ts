import { createAction } from "../../../utils/reducer/reducer.utils"
import { CONFIG_ACTIONS } from "./config.types"

export const setDiscountRate = (discountRate: number) => {
    return createAction(CONFIG_ACTIONS.SET_DISCOUNT_RATE, discountRate);
}

export const setTaxRate = (taxRate: number) => {
    return createAction(CONFIG_ACTIONS.SET_TAX_RATE, taxRate);
}