import { NavLink } from "react-router-dom";
import { MenuItem } from "@headlessui/react";

const UserMenu = ({ route, Icon, title }) => {
  return (
    <MenuItem className="hover:bg-slate-200">
      <NavLink
        to={route}
        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
      >
        <Icon className="size-4 text-teal-600/85" />
        {title}
      </NavLink>
    </MenuItem>
  );
};

export default UserMenu;
