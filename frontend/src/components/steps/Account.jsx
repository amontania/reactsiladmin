import { useStepperContext } from "../../contexts/StepperContext";
import { forwardRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Switch from "../Switch";
import { services } from "../../services/services";
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineCalendar } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Account({ handleClick }) {
  const { t } = useTranslation();
  registerLocale("es", es);
  const { userData, setUserData, currentStep, setCurrentStep } =
    useStepperContext();
  console.log("data3", userData);

  const FormSchema = z.object({
    firstName: z.string().min(3, { message: t("Required") }),
    lastName: z.string().min(3, { message: t("Required") }),
    dateBirth: z.date({
      required_error: t("Required"),
      invalid_type_error: t("DateTitle"),
    }),
    national: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      { required_error: t("Required") }
    ),
    radioSex: z.string().min(1, {
      required_error: t("Required"),
      invalid_type_error: t("Required"),
      message: t("Required"),
    }),
    country: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      { required_error: t("Required") }
    ),
    city: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      { required_error: t("Required") }
    ),
    neighBor: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      { required_error: t("Required") }
    ),

    address: z.string().min(3, { message: t("Required") }),

    school: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      { required_error: t("Required") }
    ),
  });

  const [startDate, setStartDate] = useState(new Date());

  const [languagesp, setLanguagEsp] = useState(true);

  const [listNational, setListNational] = useState([]);
  const [listCountry, setListCountry] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [listNeighBor, setListNeighBor] = useState([]);
  const [listSchool, setListSchool] = useState([]);

  const {
    firstName,
    lastName,
    dateBirth,
    national,
    radioSex,
    country,
    city,
    neighBor,
    address,
    school,
    addresSchool,
    celSchool,
  } = userData;
  const defaultValues = {
    firstName,
    lastName,
    dateBirth,
    national,
    radioSex,
    country,
    city,
    neighBor,
    address,
    school,
    addresSchool,
    celSchool,
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ resolver: zodResolver(FormSchema), defaultValues });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setUserData({ ...userData, [name]: value });
  };

  console.log(errors);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const handleRegistration = async (data) => {
    // alert(JSON.stringify(data));
    await sleep(5000);
    console.log("data1", data);
    const {
      firstName,
      lastName,
      dateBirth,
      national,
      radioSex,
      country,
      city,
      neighBor,
      address,
      school,
      addresschool,
      celschool,
    } = data;

    console.log("data1", data);
    /* setUserData({
      ...userData,
      data,
    });*/

    // let data1 = data;
    setUserData({
      ...userData,
      ["firstName"]: firstName,
      ["lastName"]: lastName,
      ["dateBirth"]: dateBirth,
      ["national"]: national,
      ["radioSex"]: radioSex,
      ["country"]: country,
      ["city"]: city,
      ["neighBor"]: neighBor,
      ["address"]: address,
      ["school"]: school,
      ["addresSchool"]: addresSchool,
      ["celSchool"]: celSchool,
    });
    // data = JSON.stringify(values);

    // console.log("user" + JSON.stringify(userData));
    handleClick("next");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await services.getAllCombo(
          "http://127.0.0.1:4000/api/util",
          1,
          1
        );
        const data = response.data.data[0];
        const options = data.map((d) => ({
          value: d.Codigo,
          label: d.Descripcion,
        }));
        setListNational(options);

        const data1 = response.data.data[1];
        const options1 = data1.map((d) => ({
          value: d.Codigo,
          label: d.Descripcion,
        }));
        setListCountry(options1);

        const data2 = response.data.data[2];
        const options2 = data2.map((d) => ({
          value: d.Codigo,
          label: d.Descripcion,
        }));
        setListCity(options2);

        const data3 = response.data.data[3];
        const options3 = data3.map((d) => ({
          value: d.Codigo,
          label: d.Descripcion,
        }));
        setListNeighBor(options3);

        const data4 = response.data.data[4];
        const options4 = data4.map((d) => ({
          value: d.Codigo,
          label: d.Descripcion,
        }));
        setListSchool(options4);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <form className="w-full " onSubmit={handleSubmit(handleRegistration)}>
      {/* Inicio de FirstName  */}
      <div className="flex flex-wrap -mx-3 mb-6 justify-between xl:bg-white  lg:bg-green-500 md:bg-red-500">
        <div className="relative w-full  lg:w-1/2 xl:w-1/2  ">
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder={t("FirstName")}
            className={`peer w-full border-b-2 border-gray-300 text-gray-900  focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.firstName ? "border border-red-500 rounded" : ""
            }`}
            {...register("firstName")}
            aria-invalid={errors.firstName ? "true" : "false"}
            disabled={isSubmitting}
          />
          <label
            className="absolute left-0 -top-3.5 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 block  tracking-wide text-gray-600 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            {t("FirstName")}
          </label>
          <span role="alert">
            {errors.firstName && (
              <div className="text-red-500 text-xs italic ">
                {errors.firstName.message}
              </div>
            )}
          </span>
        </div>
        {/* Fin de FirstName  */}

        {/* Inicio de LastName */}

        <div className="w-full  lg:w-1/2 xl:w-1/2 px-3 mb-6">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            {t("LastName")}
          </label>

          <input
            type="text"
            name="lastName"
            placeholder={t("LastName")}
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.lastName ? "border border-red-500 rounded" : ""
            }`}
            {...register("lastName")}
            aria-invalid={errors.lastName ? "true" : "false"}
            disabled={isSubmitting}
          />
          <span role="alert">
            {errors.lastName && (
              <div className="text-red-500 text-xs italic ">
                {errors.lastName.message}
              </div>
            )}
          </span>
        </div>
        {/**Fin de LastName */}

        {/* Comienzo DateBirth  */}

        <div className="w-full  lg:w-1/3 xl:w-1/3 mb-6 px-3  ">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2">
            {t("DateBirth")}
          </label>

          <Controller
            control={control}
            rules={{ required: t("Required") }}
            name="dateBirth"
            defaultValue={dateBirth}
            render={({ field }) => (
              <ReactDatePicker
                className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.dateBirth ? "border border-red-500 rounded" : ""
                }`}
                selected={field.value}
                onChange={(e) => field.onChange(e)}
                placeholderText={t("DateTitle")}
                dateFormat="dd/MM/yyyy"
                locale={t("LocalDate")}
                disabled={isSubmitting}
              />
            )}
          />
          <span role="alert">
            {errors.dateBirth && (
              <div className="text-red-500 text-xs italic ">
                {errors.dateBirth.message}
              </div>
            )}
          </span>
        </div>
        {/*-- Fin de DateBirth --*/}

        {/*-- Nacionalidad --*/}
        <div className="w-full lg:w-1/3 xl:w-1/3 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-national"
          >
            {t("Nacionality")}
          </label>

          <Controller
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.national ? "border border-red-500 rounded" : ""
            }`}
            name="national"
            control={control}
            defaultValue={national}
            render={({ field }) => (
              <Select
                isClearable
                {...field}
                options={listNational}
                onChange={(e) => field.onChange(e)}
                disabled={isSubmitting}
              />
            )}
          />
          <span role="alert">
            {errors.national && (
              <div className="text-red-500 text-xs italic ">
                {errors.national.message}
              </div>
            )}
          </span>
        </div>
        {/*-- Fin de Nacionalidad --*/}

        {/*-- Sexo --*/}
        <div className="w-full  lg:w-1/3 xl:w-1/3    ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-sex"
          >
            {t("Sex")}
          </label>

          <div className="flex  text-center item-center ">
            <div className="relative">
              <input
                name="radioSex"
                {...register("radioSex")}
                type="radio"
                className="hidden peer"
                id="1"
                disabled={isSubmitting}
                value="1"
              />
              <label
                htmlFor="1"
                className="flex items-center gap-4 py-2 px-6 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-purple-900 peer-checked:text-white cursor-pointer transition"
              >
                <h6 className="text-base"> {t("Male")}</h6>
              </label>
              <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-purple-700 scale-0 peer-checked:scale-100 transition delay-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 text-white my-auto mx-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                {...register("radioSex")}
                type="radio"
                name="radioSex"
                className="hidden peer"
                id="2"
                value="2"
                disabled={isSubmitting}
              />
              <label
                htmlFor="2"
                className="flex items-center gap-4 py-2 px-6 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-purple-900 peer-checked:text-white cursor-pointer transition"
              >
                <h6 className="text-base"> {t("Female")}</h6>
              </label>
              <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-purple-700 scale-0 peer-checked:scale-100 transition delay-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 text-white my-auto mx-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </div>
            </div>
          </div>
          <span role="alert">
            {errors.radioSex && (
              <div className="text-red-500 text-xs italic ">
                {errors.radioSex.message}
              </div>
            )}
          </span>
        </div>
        {/*-- Fin de Sexo --*/}

        <div className="w-full   mb-6 px-3 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-placebirth"
          >
            {t("PlaceBirth")}
          </label>
        </div>

        {/*-- Country --*/}
        <div className="w-full  lg:w-1/4 xl:w-1/4 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-country"
          >
            {t("Country")}
          </label>

          <Controller
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.country ? "border border-red-500 rounded" : ""
            }`}
            name="country"
            control={control}
            defaultValue={country}
            render={({ field }) => (
              <Select
                isClearable
                {...field}
                options={listCountry}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <span role="alert">
            {errors.country && (
              <div className="text-red-500 text-xs italic ">
                {errors.country.message}
              </div>
            )}
          </span>
        </div>
        {/*-- End of Country --*/}

        {/*-- City --*/}
        <div className="w-full  lg:w-1/4 xl:w-1/4 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            {t("City")}
          </label>

          <Controller
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.city ? "border border-red-500 rounded" : ""
            }`}
            name="city"
            control={control}
            defaultValue={city}
            render={({ field }) => (
              <Select
                isClearable
                {...field}
                options={listCity}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <span role="alert">
            {errors.city && (
              <div className="text-red-500 text-xs italic ">
                {errors.city.message}
              </div>
            )}
          </span>
        </div>
        {/*-- End of Country --*/}

        {/*-- NeighBor --*/}
        <div className="w-full  lg:w-1/4 xl:w-1/4 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-neighbor"
          >
            {t("NeighBor")}
          </label>

          <Controller
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.neighBor ? "border border-red-500 rounded" : ""
            }`}
            name="neighBor"
            control={control}
            defaultValue={neighBor}
            render={({ field }) => (
              <Select
                isClearable
                {...field}
                options={listNeighBor}
                onChange={(e) => field.onChange(e)}
                disabled={isSubmitting}
              />
            )}
          />
          <span role="alert">
            {errors.neighBor && (
              <div className="text-red-500 text-xs italic">
                {errors.neighBor.message}
              </div>
            )}
          </span>
        </div>
        {/*-- End of Neighborhood --*/}

        {/*-- Address --*/}
        <div className="w-full  lg:w-1/4 xl:w-1/4 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-address"
          >
            {t("Address")}
          </label>
          <input
            type="text"
            placeholder={t("Address")}
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.address ? "border border-red-500 rounded" : ""
            }`}
            {...register("address")}
            aria-invalid={errors.address ? "true" : "false"}
            disabled={isSubmitting}
          />
          <span role="alert">
            {errors.address && (
              <div className="text-red-500 text-xs italic ">
                {errors.address.message}
              </div>
            )}
          </span>
        </div>
        {/* End Address */}

        {/*-- Previous --*/}
        <div className="w-full  lg:w-1/3 xl:w-1/3 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-school"
          >
            {t("Previous")}
          </label>

          <Controller
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.school ? "border border-red-500 rounded" : ""
            }`}
            name="school"
            control={control}
            defaultValue={school}
            render={({ field }) => (
              <Select
                isClearable
                {...field}
                options={listSchool}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <span role="alert">
            {errors.school && (
              <div className="text-red-500 text-xs italic">
                {errors.school.message}
              </div>
            )}
          </span>
        </div>
        {/*-- End of Neighborhood --*/}

        {/*-- Address School --*/}
        <div className="w-full  lg:w-1/4 xl:w-1/4 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-addressschool"
          >
            {t("AddresSchool")}
          </label>
          <input
            type="text"
            name="addresSchool"
            placeholder={t("AddresSchool")}
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.addresSchool ? "border border-red-500 rounded" : ""
            }`}
            {...register("addresschool")}
            aria-invalid={errors.addresSchool ? "true" : "false"}
            disabled={isSubmitting}
          />
          <span role="alert">
            {errors.addresSchool && (
              <div className="text-red-500 text-xs italic ">
                {errors.addresSchool.message}
              </div>
            )}
          </span>
        </div>
        {/* End Address */}

        {/*-- Cel School --*/}
        <div className="w-full  lg:w-1/4 xl:w-1/4 px-3 mb-6 ">
          <label
            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-celschool"
          >
            {t("CelSchool")}
          </label>
          <input
            type="text"
            name="celschool"
            placeholder={t("CelSchool")}
            className={`w-full border border-gray-300  rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.celSchool ? "border border-red-500 rounded" : ""
            }`}
            {...register("celschool")}
            aria-invalid={errors.celSchool ? "true" : "false"}
            disabled={isSubmitting}
          />
          <span role="alert">
            {errors.celSchool && (
              <div className="text-red-500 text-xs italic ">
                {errors.celSchool.message}
              </div>
            )}
          </span>
        </div>
        {/* End Cel School */}

        {/*      <div className="w-full">
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </div>*/}
        <div className="w-full container flex justify-around mt-4 mb-8">
          {/* back button */}
          {currentStep > 1 ? (
            <button
              onClick={() => handleClick("back")}
              className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer
       border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
       ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {currentStep > 1 ? t("Back") : ""}
              disabled={isSubmitting}
            </button>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer
       hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
          >
            {t("Next")}
          </button>
        </div>
      </div>
    </form>
  );
}
