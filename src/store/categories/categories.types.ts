import { Product } from "../../interface/Product.interface"

export type categoriesMapType = {
    [key: string]: Product[]
}

export type categoriesStateType = {
    categories: categoriesMapType,
    isLoading: boolean,
    error: string
}

export type actionProps = {
    type: string,
    payload: categoriesMapType
}

export const CATEGORIES_ACTION_TYPES = {
    FETCH_CATEGORIES_INIT: 'FETCH_CATEGORIES_INIT',
    FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILURE: 'FETCH_CATEGORIES_FAILURE'
}