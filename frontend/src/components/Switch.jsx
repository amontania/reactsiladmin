import { useState } from "react";

function Switch(state) {
  const [toggle, setToggle] = useState(state);
  // console.log(state);
  const toggleClass = " transform translate-x-5";
  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center ">
        {/*   Switch Container */}

        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-blue-400 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
            console.log(toggle);
          }}
        >
          {/* Switch */}
          <div
            className={
              "bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? null : toggleClass)
            }
          ></div>
        </div>
      </div>
    </>
  );
}

export default Switch;
