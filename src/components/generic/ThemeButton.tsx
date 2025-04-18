interface ThemeButtonProps {
    type: undefined | "button" | "submit" | "reset",
    cb?: () => void,
    btntype: "primary" | "outlined",
    children: React.ReactNode
}

const BUTTON_TYPE_CLASSES = {
    primary: "mr-5 transition active:scale-95 duration-150 ease-in-out bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer",
    outlined: "bg-transparent my-4 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded cursor-pointer"
}

export const ThemeButton = ({type, cb, children, btntype}: ThemeButtonProps) => {
    return (
        <>
            <button className={`${BUTTON_TYPE_CLASSES[btntype]}`} onClick={cb} type={type}>{children}</button>
        </>
    )
}