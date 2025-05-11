export const CONFIG_INITIAL_STATE = {
    discountRate: 10,
    taxRate: 18
}

export const CONFIG_ACTIONS = {
    SET_DISCOUNT_RATE: "SET_DISCOUNT_RATE",
    SET_TAX_RATE: "SET_TAX_RATE"
}

export type CONFIG_STATE_TYPE = {
    discountRate: number,
    taxRate: number
}

export type actionProps = {
    type: string,
    action: number
} | {}