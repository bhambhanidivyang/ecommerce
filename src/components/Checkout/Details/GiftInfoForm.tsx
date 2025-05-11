import { Dispatch, SetStateAction, useState } from "react";

type GiftInfoFormType = {
    setData: Dispatch<SetStateAction<boolean>>
}

export const GiftInfoForm = ({setData}: GiftInfoFormType) => {
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        setData(() => checked);
    }
    return (
    <>
        <div className="w-full bg-white p-10 rounded-xl border-1 border-purple-200">
            <div className="flex flex-wrap -mx-3 mb-3">
                <h3 className="block uppercase tracking-wide text-purple-700 text-lg font-bold ml-2">
                    Gift Options
                </h3>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3 md:mb-0 flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-purple-600 focus:ring-purple-500"
                        id="giftOption"
                        onChange={handleCheck}
                    />
                    <label htmlFor="giftOption" className="text-gray-700">
                    &#x1F381; Order include gift(s). The delivery package will have gift wrapped products.
                    </label>
                </div>
            </div>
        </div>
    </>
  );
};