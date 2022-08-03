import "./App.css";
import { useState } from "react";

import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";

import { useStepperContext } from "./contexts/StepperContext";
import Account from "./components/steps/Account";
import Details from "./components/steps/Details";
import Final from "./components/steps/Final";
import Payment from "./components/steps/Payment";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { ReactComponent as LogoEs } from "./img/es.svg";
import { ReactComponent as LogoEn } from "./img/en.svg";

const lngs = {
  es: { nativeName: "Español" },
  en: { nativeName: "English" },
};

function App() {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit } = useForm();
  // const [currentStep, setCurrentStep] = useState(1);
  const { currentStep, setCurrentStep, userData } = useStepperContext();

  const steps = [t("Step1"), t("Step2"), t("Step3"), t("Step4"), t("Step5")];

  const lang = useState([
    { label: "es", image: "Spain.jpg" },
    { label: "en", image: "Inglaterra.jpg" },
  ]);

  //   "Account Information",
  //   "Personal Details",
  //   "Payment",
  //   "Complete",
  // ];
  //  const [userData, setUserData] = useState("");
  // const [finalData, setFinalData] = useState([]);

  const handleClick = (direction) => {
    let newStep = currentStep;

    console.log("user" + JSON.stringify(userData));

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account handleClick={handleClick} />;
      case 2:
        return <Details handleClick={handleClick} />;
      case 3:
        return <Payment handleClick={handleClick} />;
      case 4:
        return <Final />;
      default:
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-10/12  mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="flex flex-wrap px-3 mt-6 ">
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            className={`hover:bg-blue-700 focus:ring   py-2 px-4 border border-blue-700 rounded ${
              i18n.resolvedLanguage === lng
                ? " bg-blue-500 text-white font-bold"
                : " bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  border-blue-500 hover:border-transparent  "
            }`}
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>

      <div className="container horizontal mt-5">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>
      {/* Display Components*/}

      <div className="my-10 p-10">{displayStep(currentStep)}</div>
    </div>
  );
}

export default App;
