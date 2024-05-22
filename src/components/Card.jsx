import React from "react";

const Card = ({ children, style }) => {
  return (
    <div
      className={`bg-white border border-gray-200 shadow-xl rounded-md pb-5 mx-4 ${style}`}
    >
      {children}
    </div>
  );
};

export default Card;
