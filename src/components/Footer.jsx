import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full py-9">
      <span className="mx-auto text-sm">
        Copyright &copy; Powered by{" "}
        <a
          target="_blank"
          className="text-red-600 cursor-pointer"
          href="https://www.5lsolutions.com/"
        >
          5L Solutions
        </a>
      </span>
    </div>
  );
};

export default Footer;
