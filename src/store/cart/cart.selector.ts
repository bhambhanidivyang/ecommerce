import { createSelector } from "reselect";

const selectCartReducer = (state:any) => state.cart;

export const selectCartItemsState = createSelector([selectCartReducer],(cart) => cart.cartItems);

export const selectIsCartOpenState = createSelector([selectCartReducer],(cart) => cart.isCartOpen);

export const selectTotalCountState = createSelector([selectCartReducer],(cart) => cart.totalCount);

export const selectSubTotalPriceState = createSelector([selectCartReducer],(cart) => cart.subTotalPrice);

export const selectTotalPriceState = createSelector([selectCartReducer],(cart) => cart.totalPrice);

export const selectDiscountedAmountState = createSelector([selectCartReducer],(cart) => cart.discountedAmount);

export const selectTaxedAmountState = createSelector([selectCartReducer],(cart) => cart.taxedAmount);