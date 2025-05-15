import { createSelector } from "reselect";
import { Category } from "../../interface/Category.interface";
import { Product } from "../../interface/Product.interface";
import { categoriesMapType } from "./categories.types";

const selectCategoriesReducer = (state:any) => state.categories;

const selectCat = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategories = createSelector(
    [selectCat],
    (categories) => categories.length > 0 && categories.reduce((acc:categoriesMapType, category:Category) => {
        const {title, items} = category;
        acc[title.toLocaleLowerCase()] = items as Product[];
        return acc;
    }, {} as {[key: string]: Product[]})
)

export const selectIsLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)