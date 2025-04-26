import { useEffect, useState } from "react";

type StepperProps = {
    label1: string,
    label2: string,
    label3: string,
    stage: number
}

const stepState = {
    active: "mx-auto mt-2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-purple-500",
    inactive: "mx-auto mt-2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-gray-400"
}

export const Stepper = ({ label1, label2, label3, stage }: StepperProps) => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        setStep(stage);
    }, [stage]);

    return (
        <>
            <div className="grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 text-center mx-auto p-5 w-full sm:w-3/4 lg:w-1/2">
                <div className="text-center">
                    <label>{label1}</label>
                    <div className={ step === 1 ? stepState['active'] : stepState['inactive'] }>1</div>
                </div>
                <div className="text-center">
                    <label></label>
                    <div className="mx-auto mt-10 flex items-center justify-center text-gray-400">----------------------</div>
                </div>
                <div className="text-center">
                    <label>{label2}</label>
                    <div className={ step === 2 ? stepState['active'] : stepState['inactive'] }>2</div>
                </div>
                <div className="text-center">
                    <label></label>
                    <div className="mx-auto mt-10 flex items-center justify-center text-gray-400">----------------------</div>
                </div>
                <div className="text-center">
                    <label>{label3}</label>
                    <div className={ step === 3 ? stepState['active'] : stepState['inactive'] }>3</div>
                </div>
            </div>
        </>
    );
};