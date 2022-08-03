import { useStepperContext } from "../../contexts/StepperContext";

export default function Details({ handleClick }) {
  const { userData, setUserData, steps, currentStep, setCurrentStep } =
    useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Address
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["address"] || ""}
            name="address"
            placeholder="Address"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          City
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["city"] || ""}
            name="city"
            placeholder="City"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="container flex justify-around mt-4 mb-8">
        {/* back button */}
        <button
          onClick={() => handleClick("back")}
          className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer
      border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
      ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Atrás
        </button>

        <button
          type="submit"
          onClick={() => handleClick("next")}
          className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer
      hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
        >
          Sgte.
        </button>
      </div>
    </div>
  );
}
