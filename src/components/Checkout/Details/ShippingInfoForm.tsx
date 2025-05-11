import Select from 'react-select'
import './react-select-custom.css';
import { Dispatch, SetStateAction } from 'react';

type ShippingInfoFormType = {
    setData: Dispatch<SetStateAction<{}>>
}

const cityData = [
    { "city": "Jaipur", "state": "Rajasthan", "pincode": "302020" },
    { "city": "Bangalore", "state": "Karnataka", "pincode": "560001" },
    { "city": "New Delhi", "state": "Delhi", "pincode": "110001" }
]

const cityOptions = cityData.map((item) => {
    return {
        label: item.city,
        value: item.city,
        state: item.state,
        pincode: item.pincode
    }
})

const stateOptions = cityData.map((item) => {
    return {
        label: item.state,
        value: item.state
    }
})

export const ShippingInfoForm = ({setData}: ShippingInfoFormType) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSelect = (selectedOption: any, meta: any) => {
        const {value} = selectedOption;
        const {name} = meta;
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
                        Shipping Information
                    </h3>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Street Address
                        </label>
                        <input onChange={handleChange} name='streetAddress' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Street Address" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Locality / Landmark (Optional)
                        </label>
                        <input onChange={handleChange} name='locality' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Apt./Suite/Unit, Locality, Landmark etc." />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            City
                        </label>
                        <Select 
                            id='grid-city'
                            classNames={{
                                control: () => 'react-select-custom'
                            }} 
                            placeholder="Select a city..."
                            components={{
                                DropdownIndicator: () => null, // remove down arrow
                                IndicatorSeparator: () => null,
                            }}
                            onChange={handleSelect} name='city' 
                            options={cityOptions} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            State
                        </label>
                        <Select 
                            id="grid-state"
                            classNames={{
                                control: () => 'react-select-custom'
                            }} 
                            placeholder="Select State..."
                            components={{
                                DropdownIndicator: () => null, // remove down arrow
                                IndicatorSeparator: () => null,
                            }}
                            onChange={handleSelect} name='state' 
                            options={stateOptions} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Pin Code
                        </label>
                        <input onChange={handleChange} name='pincode' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                    </div>
                </div>
            </div>
        </>
    );
};