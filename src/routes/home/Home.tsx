import { Directory } from "../../components/Directory"
import {categories} from '../../components/Categories'

export const Home = () => {
    return <>
        <Directory categories={categories} />
    </>
}