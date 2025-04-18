import { ThemeButton } from "./generic/ThemeButton";

type CategoryProps = {
    cat: {
        id: number;
        title: string;
        image?: string
    },
    i: number
}

export const CategoryImageCard = ({cat,i}: CategoryProps) => {
    return (
      <>
        <div className={`relative group h-64 rounded-lg overflow-hidden ${i < 3 ? 'w-1/3' : 'w-1/2'}`}>
          <div className="relative overflow-hidden w-full h-full px-2 py-2">
            <img
              src={cat.image || `https://picsum.photos/seed/${cat.title}/1200/400`}
              alt={cat.title}
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
              <h1 className="text-3xl font-bold mb-4">{cat.title}</h1>
              <ThemeButton btntype="primary" type="button">Shop Now</ThemeButton>
            </div>
          </div>
        </div>
      </>
    )
}