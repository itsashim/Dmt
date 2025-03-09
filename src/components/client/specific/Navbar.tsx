/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo, Svg } from "../../../assets";
import { Drawer, Dropdown, message } from "antd";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { MenuProps } from "antd";
import { RootAppState } from "../../../redux/store";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelectors";
import Button from "../../shared/Button";
import { logout } from "../../../redux/actions/auth";
import { updateUserRole } from "../../../redux/actions/user";
import { clearEvents } from "../../../redux/reducers/events";
import { clearPlaces } from "../../../redux/reducers/places";

const SwitchRole = () => {
  const dispatch = useAppDispatch();
  const {
    user: { role },
  } = useAppSelector((state: RootAppState) => state.auth);

  return (
    <Button
      title={`Switch to ${role === "BUYER" ? "Seller" : "Buyer"}`}
      onClick={async () => {
        await dispatch(updateUserRole());
        message.success(`User role switched successfully.`);
      }}
    />
  );
};

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(clearPlaces());
    dispatch(clearEvents());
    navigate(`/auth/login`);
  };

  return (
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  );
};

const UserMenu = ({ userName, role }: { userName: string; role: string }) => {
  const items: MenuProps["items"] = [
    ...(role === "SELLER"
      ? [
          {
            key: "0",
            label: <NavLink to="/app/dashboard">Dashboard</NavLink>,
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "1",
      label: <SwitchRole />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <Logout />,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
      <button type="button" className={`flex gap-2 items-center rounded-md `}>
        <FaCircleUser className={`text-xl text-primary`} />
        <span className={`capitalize text-black font-semibold`}>
          {userName}
        </span>
        <MdKeyboardArrowDown className={`text-xl text-primary`} />
      </button>
    </Dropdown>
  );
};

const linkStyle =
  `flex justify-start lg:justify-center items-center gap-4 lg:gap-2 lg:rounded-none lg:p-0 lg:bg-transparent w-full lg:w-auto` as string;

const NavLinks = ({
  role,
  isAuthenticated,
  userName,
}: {
  role: "ADMIN" | "BUYER" | "SELLER";
  isAuthenticated: boolean;
  userName: string;
}) => (
  <div
    className={`flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16 ${role}`}
  >
    {role === "BUYER" && (
      <NavLink to={`/trip-board`} type="button" className={linkStyle}>
        <img src={Svg.heart} />
        <span className={`text-black text-base font-semibold`}>
          Trip Boards
        </span>
      </NavLink>
    )}

    {!isAuthenticated && (
      <div
        className={`flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16`}
      >
        <NavLink
          to={`/auth/login`}
          type="button"
          className={"flex justify-start "}
        >
          <img src={Svg.person} />
          <span className={`text-base font-medium text-primary`}>Login</span>
        </NavLink>
      </div>
    )}

    {isAuthenticated && (
      <div className={`hidden lg:block`}>
        <UserMenu userName={userName} role={role ?? "GUEST"} />
      </div>
    )}

    {!isAuthenticated && (
      <NavLink
        to={`/auth/login`}
        className="flex items-center rounded-md bg-white ring-1 ring-primary text-primary hover:ring-white hover:bg-primary hover:opacity-70 hover:ease-in-out hover:duration-150 hover:text-white px-3 py-2 text-sm font-semibold shadow-sm"
      >
        Get Started
      </NavLink>
    )}
  </div>
);

const Navbar: FC = () => {
  const {
    user: { role, firstName, lastName },
    isAuthenticated,
  } = useSelector((state: RootAppState) => state.auth);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  const userName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Guest";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bottom-0 z-[999] bg-white flex justify-between items-center shadow-md px-4 md:px-8 h-20 border border-b-fade-white`}
    >
      <NavLink to={`/`} type="button" className={linkStyle}>
        <img src={Logo.logo_purple} className={`w-20 md:w-24`} />
      </NavLink>

      {role && (
        <div className={`hidden lg:block`}>
          <NavLinks
            role={role}
            isAuthenticated={isAuthenticated}
            userName={userName}
          />
        </div>
      )}
      <div className={`flex gap-4 justify-center items-center lg:hidden`}>
        {isAuthenticated && (
          <div className={`block lg:hidden`}>
            <UserMenu userName={userName} role={role ?? "GUEST"} />
          </div>
        )}
        <button type="button" onClick={toggleDrawer}>
          <HiMenu className={`text-black text-4xl`} />
        </button>
      </div>

      <Drawer
        placement={`right`}
        width={500}
        onClose={toggleDrawer}
        open={open}
        onClick={toggleDrawer}
        closeIcon={<IoClose className={`text-black text-4xl`} />}
      >
        {role && (
          <NavLinks
            role={role}
            isAuthenticated={isAuthenticated}
            userName={userName}
          />
        )}
      </Drawer>
    </nav>
  );
};

export default Navbar;
