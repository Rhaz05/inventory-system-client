import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import {
  Cog6ToothIcon,
  PencilIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { FaRegUser } from "react-icons/fa";
import UserMenu from "./UserMenu";

const User = () => {
  const { auth } = useAuth();
  return (
    <Menu>
      <MenuButton className="inline-flex whitespace-nowrap items-center gap-2 rounded-md bg-teal-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white">
        <FaRegUser />
        {auth?.userInfo?.fullname ? (
          <p>{auth?.userInfo?.fullname}</p>
        ) : (
          <p>No User Name Found</p>
        )}
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="w-[10rem] origin-top-right rounded-lg border border-gray-300 bg-white p-1 mt-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none"
        >
          <UserMenu route={"/profile"} Icon={PencilIcon} title={"Profile"} />
          <UserMenu
            route={"/settings"}
            Icon={Cog6ToothIcon}
            title={"Settings"}
          />
          <UserMenu
            route={"/logout"}
            Icon={ArrowLeftStartOnRectangleIcon}
            title={"Logout"}
          />
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default User;
