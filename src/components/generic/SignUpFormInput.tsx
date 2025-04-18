import { useState } from "react";

type InputProps = {
    label: string;
    value?: string;
    validationError?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const SignUpFormInput = ({ label = '', value = "", validationError, ...otherProps }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldShrink = isFocused || value.length > 0;
    console.log(shouldShrink,'shouldshrink');
    return (
        <>
            <div className="relative w-full mt-6">
                
                <input {...otherProps} 
                    className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 text-base outline-none focus:border-purple-500 placeholder-transparent cursor-text" 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <label className={`
                    absolute left-3 text-gray-500 transition-all
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500 cursor-text
                    ${value.length > 0 ? 'top-1 text-xs text-blue-500' : ''}
                `} htmlFor={otherProps.id}>
                    {label}
                </label>
                {validationError !== '' && <p className="text-red-500 text-xs my-1">{validationError}</p>}
            </div>
        </>
    )
}