export type contactInfo = {
    firstname: string,
    lastname: string,
    email: string,
    phone: string
}

export type shippingInfo = {
    city: string,
    pincode: string,
    state: string,
    streetAddress: string
}

export type CheckoutState = {
    contactInfo: contactInfo | {},
    shippingInfo: shippingInfo | {},
    giftOptions: boolean
}

export type actionProps = {
    type: string,
    payload: CheckoutState
} | {}

export const CHECKOUT_INITIAL_STATE = {
    contactInfo: {},
    shippingInfo: {},
    giftOptions: false
}

export const CHECKOUT_ACTIONS = {
    UPDATE_CHECKOUT_INFO: 'UPDATE_CHECKOUT_INFO',
    UPDATE_CONTACT_INFO: 'UPDATE_CONTACT_INFO',
    UPDATE_SHIPPING_INFO: 'UPDATE_SHIPPING_INFO',
    UPDATE_GIFT_INFO: 'UPDATE_GIFT_INFO'
}