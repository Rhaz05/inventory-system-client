import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import User from "./User";

const TopBar = () => {
  return (
    <>
      <nav className="relative bg-white w-full h-[5rem]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <div className="relative md:block hidden">
                <input
                  type="text"
                  id="top-bar-search"
                  placeholder="Search"
                  className="border border-gray-300 rounded-lg py-2 px-4 
                  w-[17rem] h-[2.5rem] focus:outline-none
                  focus:border-teal-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaSearch className="h-5 w-5 text-teal-500" />
                </div>
              </div>

              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <IoIosNotificationsOutline
                    size={26}
                    className="my-auto mr-5 cursor-pointer"
                  />
                  <User />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopBar;
