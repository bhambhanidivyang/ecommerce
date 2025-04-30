import { Route, Routes } from "react-router-dom";
import { CategoriesPreview } from "../categories-preview/CategoriesPreview";
import { CategoryView } from "../categories-view/CategoryView";

const Shop = () => {
    return (
        <>
            <Routes>
                <Route index element={<CategoriesPreview />} />
                <Route path=":category" element={<CategoryView />} />
            </Routes>
        </>
    )
}

export default Shop;