import { DocumentData } from "firebase/firestore";
import { createAction } from "../../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPES } from "./categories.types"
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";

export const initiateFetchCategories = () => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_INIT);
}

export const setFetchedCategories = (categories: DocumentData) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
}

export const errorFetchedCategories = (error: any) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error);
}

export const fetchCategoriesAsync = () => async(dispatch: any) => {
    dispatch(initiateFetchCategories);
    try {
        const categoriesMap = await getCategoriesAndDocuments();
        return dispatch(setFetchedCategories(categoriesMap));
    } catch (error) {
        return dispatch(errorFetchedCategories("error identified"));
    }
}