import { Product } from '../interface/Product.interface'
import {CategoryImageCard} from './CategoryImageCard'

type DirectoryProps = {
    categories: {[key: string]: Product[]},
}

export const Directory = ({categories}: DirectoryProps) => {
    return (
    <>
        <div className='flex flex-wrap bg-gray-100 p-15'>
            {Object.keys(categories).map((cat,i) => {
                return (
                    <CategoryImageCard key={i} cat={cat} i={i} />
                )
            })}
        </div>
    </>
    )
}