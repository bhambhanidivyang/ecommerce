import { useEffect, useState } from "react";

type StepperProps = {
    labels: string[] ,
    stage: number
}

const stepStyle = {
    activeli: "flex items-center text-purple-600 dark:text-purple-500",
    activespan: "flex items-center justify-center w-5 h-5 me-2 text-xs border border-purple-600 rounded-full shrink-0 dark:border-purple-500",
    inactiveli: "flex items-center",
    inactivespan: "flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400"
}

export const Stepper = ({ labels, stage }: StepperProps) => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        setStep(stage);
    }, [stage]);

    return (
        <>
            <div className="w-full">
                <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                    {labels && labels.map((label, index) => {
                        const styleLi = step === (index + 1) ? stepStyle.activeli : stepStyle.inactiveli;
                        const styleSpan = step === (index + 1) ? stepStyle.activespan : stepStyle.inactivespan;
                        return <li key={index} className={styleLi}>
                            <span className={styleSpan}>
                                {index+1}
                            </span>
                            {label}
                            { (index !== labels.length - 1) &&
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                                </svg>
                            }
                        </li>
                    })}
                </ol>
            </div>
        </>
    );
};