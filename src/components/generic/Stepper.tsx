type StepperProps = {
    label1: string,
    label2: string,
    label3: string
}

export const Stepper = ({ label1, label2, label3 }: StepperProps) => {
  return (
    <>
      <div className="grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 text-center mx-auto p-5 w-full sm:w-3/4 lg:w-1/2">
            <div className="text-center">
                <label>{label1}</label>
                <div className="mx-auto mt-2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-purple-500">1</div>
            </div>
            <div className="text-center">
                <label></label>    
                <div className="mx-auto mt-10 flex items-center justify-center text-purple-500">----------------------</div>
            </div>
            <div className="text-center">
                <label>{label2}</label>
                <div className="mx-auto mt-2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-purple-500">2</div>
            </div>
            <div className="text-center">
                <label></label>
                <div className="mx-auto mt-10 flex items-center justify-center text-purple-500">----------------------</div>
            </div>
            <div className="text-center">
                <label>{label3}</label>
                <div className="mx-auto mt-2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-purple-500">3</div>
            </div>
        </div>
    </>
  );
};