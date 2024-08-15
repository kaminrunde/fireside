import * as React from "react";
import {
  FaMobileAlt,
  FaTabletAlt,
  FaLaptop,
  FaDesktop,
  FaTv,
} from "react-icons/fa";

type Props = {
  icon: "MOBILE" | "TABLET" | "LAPTOP" | "DESKTOP" | "DESKTOP_L";
};

export default function MediaIcon(props: Props) {
  switch (props.icon) {
    case "MOBILE":
      return <FaMobileAlt />;
    case "TABLET":
      return <FaTabletAlt />;
    case "LAPTOP":
      return <FaLaptop />;
    case "DESKTOP":
      return <FaDesktop />;
    case "DESKTOP_L":
      return <FaTv />;
    default:
      return null;
  }
}
