interface ThemeButtonProps {
    type: undefined | "button" | "submit" | "reset",
    cb?: (...args: any[]) => void,
    btntype: "primary" | "outlined" | "tiny" | "tinyBlack",
    additionalClasses?: string
    children: React.ReactNode
}

const BUTTON_TYPE_CLASSES = {
    primary: "transition active:scale-95 duration-150 ease-in-out bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer",
    outlined: "bg-transparent active:scale-95 transition-transform duration-100 ease-out hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded cursor-pointer",
    tiny: "transition active:scale-95 duration-150 ease-in-out bg-purple-500 hover:bg-purple-700 text-white w-5 pb-1 font-bold items-center m-2 rounded focus:outline-none focus:shadow-outline cursor-pointer",
    tinyBlack: "transition active:scale-95 duration-150 ease-in-out bg-black hover:bg-red-500 text-white w-5 pb-1 font-bold items-center m-2 rounded focus:outline-none focus:shadow-outline cursor-pointer"
}

export const ThemeButton = ({type, cb, children, btntype, additionalClasses}: ThemeButtonProps) => {
    return (
        <>
            <button className={`${BUTTON_TYPE_CLASSES[btntype]} ${additionalClasses || ''}`} onClick={cb} type={type}>{children}</button>
        </>
    )
}