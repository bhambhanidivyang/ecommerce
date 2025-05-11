import { Dispatch, SetStateAction } from "react";
import { PhoneInputField } from "../../generic/PhoneInputField";

type ContactInfoFormProps = {
    error: string,
    setData: Dispatch<SetStateAction<{}>>
}

export const ContactInfoForm = ({error, setData}: ContactInfoFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    return (
        <>
            <div className="w-full bg-white p-10 rounded-xl border-1 border-purple-200">
                <div className="flex flex-wrap -mx-3 mb-3">
                    <h3 className="block uppercase tracking-wide text-purple-700 text-lg font-bold ml-2">
                        Contact Information
                    </h3>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input onChange={handleChange} name="firstname" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                        {error && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input onChange={handleChange} name="lastname" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Email (for order tracking)
                        </label>
                        <input onChange={handleChange} name="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="someone@mail.com" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Phone (for delivery contact)
                        </label>
                        <PhoneInputField handleChange={handleChange} />
                    </div>
                </div>
            </div>
        </>
    );
};