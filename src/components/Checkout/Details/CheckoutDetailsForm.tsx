import { SetStateAction, useState, Dispatch } from "react";
import { CompactCart } from "../Common/CompactCart";
import { ContactInfoForm } from "./ContactInfoForm";
import { ShippingInfoForm } from "./ShippingInfoForm";
import { GiftInfoForm } from "./GiftInfoForm";

type CheckoutDetailsFormType = {
    setContactInfo: Dispatch<SetStateAction<{}>>,
    setShippingInfo: Dispatch<SetStateAction<{}>>,
    setGiftOptions: Dispatch<SetStateAction<boolean>>
}

export const CheckoutDetailsForm = ({setContactInfo, setShippingInfo, setGiftOptions} : CheckoutDetailsFormType) => {
    const [error, setError] = useState('');

    return (
        <>
            <div className="flex w-full rounded-xl shadow-xs mx-auto pt-5 text-left space-x-4">
                <form className="w-3/4 space-y-5">
                    <ContactInfoForm setData={setContactInfo} error={error} />
                    <ShippingInfoForm setData={setShippingInfo} />
                    <GiftInfoForm setData={setGiftOptions} />
                </form>
                <div className="w-1/4">
                    <CompactCart />                    
                </div>
            </div>
        </>
    );
};