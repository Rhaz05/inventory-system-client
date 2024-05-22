import { NavLink } from "react-router-dom";
import { FaTriangleExclamation } from "react-icons/fa6";
import NotFound from "../assets/images/404.png";

const PageNotFound = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center  h-[100vh]">
      <FaTriangleExclamation className="text-yellow-400 text-8xl mb-4" />
      <div className="flex">
        <img src={NotFound} alt="" className="w-[7rem] mb-5 mr-4" />
        <h1 className="text-6xl font-bold mb-4">Not Found</h1>
      </div>

      <p className="text-xl mb-5">
        This page does not exist{/* Idol Mali ka nanaman ng pindot ano na! */}
      </p>
      <NavLink to="/">
        <button className="text-white bg-red-500 rounded-md px-3 py-2 mt-4">
          Go Back
        </button>
      </NavLink>
    </section>
  );
};

export default PageNotFound;
