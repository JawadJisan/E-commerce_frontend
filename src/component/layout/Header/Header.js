import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import "./Header.css";

const options = {
  burgerColor: "crimson",
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "15vmax",
  navColor1: "#fff5f5",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Login",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/login",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link3Size: "2vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  link3Color: "red",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  nav5justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  link3Margin: "3vmax",
  // profileIcon: true,
  ProfileIconElement: logo,
  profileIconUrl: "/login",
  profileIconColor: "red",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />
};

export default Header;