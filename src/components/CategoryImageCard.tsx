import { useNavigate } from "react-router";
import { ThemeButton } from "./generic/ThemeButton";


type CategoryProps = {
    cat: string,
    i: number
}

export const CategoryImageCard = ({cat,i}: CategoryProps) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate('shop/'+cat);
    }
    
    return (
      <>
        <div className={`relative group h-64 rounded-lg overflow-hidden ${i < 3 ? 'w-1/3' : 'w-1/2'}`}>
          <div className="relative overflow-hidden w-full h-full px-2 py-2">
            <img
              src={`https://picsum.photos/seed/${cat}/1200/400`}
              alt={cat}
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
              <h1 className="text-3xl font-bold mb-4">{cat}</h1>
              <ThemeButton cb={handleNavigate} btntype="primary" type="button">Shop Now</ThemeButton>
            </div>
          </div>
        </div>
      </>
    )
}