import React from "react";

const Input = ({ eventHandler, label, value }) => {
  return (
    <div className="flex flex-col static">
      <label
        htmlFor="item"
        className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit capitalize"
      >
        {label}
      </label>
      <input
        type="text"
        placeholder="Write here..."
        name="item"
        value={value}
        onChange={eventHandler}
        className="border-teal-400 h-10 px-[10px] py-[11px] text-md bg-white border rounded-[5px] text-gray-600 focus:outline-none placeholder:text-black/25"
        id="item"
      />
    </div>
  );
};

export default Input;
