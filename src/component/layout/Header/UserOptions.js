import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import { RiDashboardLine } from 'react-icons/ri';
import { BsPersonCheckFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { MdListAlt } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state?.cart) || {}

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <MdListAlt />, name: "Orders", func: orders },
    { icon: <BsPersonCheckFill />, name: "Profile", func: account },
    {
      icon: (
        <AiOutlineShoppingCart
          style={{ color: cartItems?.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems?.length})`,
      func: cart,
    },
    { icon: <ImExit />, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <RiDashboardLine />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url ? user?.avatar?.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;