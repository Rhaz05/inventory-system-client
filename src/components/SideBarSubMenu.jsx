import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { FaRegCircle, FaCircle } from "react-icons/fa";

const SideBarSubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <li
        className={`link ${
          pathname.includes(data.name) && "text-teal-800 bg-green-100/45"
        }`}
        onClick={() => setSubMenuOpen((prev) => !prev)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={`transform ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={{ height: subMenuOpen ? "auto" : 0 }}
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.map((menu) => (
          <li key={menu}>
            <NavLink
              to={`/${menu}`}
              className="link !bg-transparent capitalize"
            >
              {pathname.includes(menu) ? (
                <FaCircle className="text-teal-600" />
              ) : (
                <FaRegCircle />
              )}
              {menu}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SideBarSubMenu;
