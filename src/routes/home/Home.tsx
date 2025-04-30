import { useContext } from "react"
import { Directory } from "../../components/Directory"
import { CategoriesContext } from "../../contexts/categories.context"

export const Home = () => {
    const {categories} = useContext(CategoriesContext);
    return <>
        <Directory categories={categories} />
    </>
}