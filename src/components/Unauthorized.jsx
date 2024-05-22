import { NavLink } from "react-router-dom";
import { FaTriangleExclamation } from "react-icons/fa6";
import NotFound from "../assets/images/404.png";

const Unauthorized = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-[100vh] my-auto">
      <FaTriangleExclamation className="text-red-500 text-8xl mb-4" />
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold mb-4">Error 429</h1>
        <h1 className="text-6xl font-bold mb-4">Unauthorized</h1>
      </div>

      <p className="text-xl mb-5">Idol di pwede yang ginagawa mo!</p>
      <NavLink to="/login">
        <button className="text-white bg-red-500 rounded-md px-3 py-2 mt-4">
          Go Back
        </button>
      </NavLink>
    </section>
  );
};

export default Unauthorized;
