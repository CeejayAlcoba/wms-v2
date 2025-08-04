import { createContext, useContext } from "react";

type CurrentStepContextType = {
  handleNext: ()=> void
  handlePrev: ()=> void
  currentStep:number,
};

export const CurrentStepContext = createContext<CurrentStepContextType | null>(null);

const useCurrentStep = () => {
  const context = useContext(CurrentStepContext);
  if (!context) throw new Error("CurrentStepContext is null");

  return context;
};

export default useCurrentStep;
