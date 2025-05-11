import { CompactCart } from "../Common/CompactCart";

export const OrderReview = () => {
  return (
    <>
        <div className="flex w-full rounded-xl shadow-xs mx-auto pt-5 text-left space-x-4">
            <div className="w-3/4 space-y-5">
                <div className="w-full bg-white p-10 rounded-xl border-1 border-purple-200">
                    <div className="flex flex-wrap -mx-3 mb-3">
                        <h3 className="block uppercase tracking-wide text-purple-700 text-lg font-bold ml-2">
                            Order Review
                        </h3>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-3">
                        <div className="w-full md:w-1/2 px-3 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Delivery Address
                            </label>
                            <span className="text-gray-700 py-3 text-sm mb-3 leading-tight italic">Address Goes Here...</span>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Contact Details
                            </label>
                            <span className="text-gray-700 py-3 text-sm mb-3 leading-tight italic">Contact Details Goes Here...</span>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white p-10 rounded-xl border-1 border-purple-200">
                    <div className="flex flex-wrap -mx-3 mb-3">
                        <h3 className="block uppercase tracking-wide text-purple-700 text-lg font-bold ml-2">
                            Payment
                        </h3>
                    </div>
                </div>
            </div>
            <div className="w-1/4">
                <CompactCart />                    
            </div>
        </div>
    </>
  );
};