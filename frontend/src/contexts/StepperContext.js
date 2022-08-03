import { createContext, useContext, useState } from "react";

const StepperContext = createContext({
  userData: "",
  setUserData: null,
  currentStep: 1,
});

export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <StepperContext.Provider
      value={{ userData, setUserData, currentStep, setCurrentStep }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData, currentStep, setCurrentStep } =
    useContext(StepperContext);

  return { userData, setUserData, currentStep, setCurrentStep };
  //{JSON.stringify(state, null, 2)}
}
