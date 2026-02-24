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
      // @ts-expect-error react-icons types not yet compatible with React 19 types
      return <FaMobileAlt />;
    case "TABLET":
      // @ts-expect-error react-icons types not yet compatible with React 19 types
      return <FaTabletAlt />;
    case "LAPTOP":
      // @ts-expect-error react-icons types not yet compatible with React 19 types
      return <FaLaptop />;
    case "DESKTOP":
      // @ts-expect-error react-icons types not yet compatible with React 19 types
      return <FaDesktop />;
    case "DESKTOP_L":
      // @ts-expect-error react-icons types not yet compatible with React 19 types
      return <FaTv />;
    default:
      return null;
  }
}
