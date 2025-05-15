import { actionProps, CATEGORIES_ACTION_TYPES, categoriesStateType } from "./categories.types";

export const CATEGORIES_REDUCER_INITIAL_STATE: categoriesStateType = {
    categories: {},
    isLoading: false,
    error: ''
}

export const categoriesReducer = (state: categoriesStateType = CATEGORIES_REDUCER_INITIAL_STATE, action: actionProps) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_INIT:
            return {...state, isLoading: true}
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                isLoading: false
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    }
}

