import { Directory } from "../../components/Category/Directory"
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

export const Home = () => {
    const categories = useSelector(selectCategories)
    return <>
        {categories && <Directory categories={categories} />}
    </>
}