import {CategoryImageCard} from './CategoryImageCard'

type DirectoryProps = {
    categories: {
        id: number;
        title: string;
        image?: string
    }[],
}

export const Directory = ({categories}: DirectoryProps) => {
    return (
    <>
        <div className='flex flex-wrap bg-gray-100 p-15'>
            {categories.map((cat,i) => {
                return (
                <CategoryImageCard key={cat.id} cat={cat} i={i} />
                )
            })}
        </div>
    </>
    )
}