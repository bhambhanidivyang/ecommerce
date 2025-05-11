import React, { ChangeEvent, useState } from "react";
import { USFlag } from "./svg/USFlag";
import { DownCaret } from "./svg/DownCaret";
import { UKFlag } from "./svg/UKFlag";
import { AustraliaFlag } from "./svg/AustraliaFlag";
import { GermanyFlag } from "./svg/GermanyFlag";
import { FranceFlag } from "./svg/FranceFlag";
import { IndiaFlag } from "./svg/IndiaFlag";

const countries = [
    { code: "+91", label: "India", Flag: IndiaFlag },
    { code: "+1", label: "United States", Flag: USFlag },
    { code: "+44", label: "United Kingdom", Flag: UKFlag },
    { code: "+61", label: "Australia", Flag: AustraliaFlag },
    { code: "+49", label: "Germany", Flag: GermanyFlag },
    { code: "+33", label: "France", Flag: FranceFlag },
];

type PhoneInputFieldType = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PhoneInputField = ({handleChange}: PhoneInputFieldType) => {
    const [drop, setDrop] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default: India
    const handleClick = () => {
        setDrop(!drop);
    }
    const handleSelect = (country: typeof selectedCountry) => {
        setSelectedCountry(country);
        setDrop(false);
    };
    const SelectedFlag = selectedCountry.Flag;
    return (
        <>
            <div>
                <div className="flex items-center">
                    <div className="relative">
                        <button
                            onClick={handleClick}
                            className="z-10 inline-flex shrink-0 items-center rounded-l-lg rounded-r-none border border-gray-300 bg-gray-100  py-3 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            >
                            <SelectedFlag /> {selectedCountry.code}
                            <DownCaret />
                        </button>
                        <input type="hidden" name="phone_prefix" value={selectedCountry.code} />
                        {drop &&
                        <div id="dropdown-phone-3" className="absolute left-0 mt-1 z-10 w-56 rounded-lg bg-white shadow dark:bg-gray-700">
                            <ul className="p-2 text-sm font-medium text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button-2">
                                {countries.map((country, index) => {
                                    const Flag = country.Flag;
                                    return <li key={index}>
                                    <button type="button" onClick={() => handleSelect(country)} className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <span className="inline-flex items-center">
                                            <Flag />
                                            {country.label} ({country.code})
                                        </span>
                                    </button>
                                </li>
                                })}
                                
                            </ul>
                        </div>
                        }
                        </div>
                        <div className="relative w-full">
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} name="phone" type="text" id="phone-input" className="z-20 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-l-none rounded-r-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                        </div>
                    </div>                  
                </div>
        </>
    );
};