import * as React from "react";
import * as t from "./types";
type Props = {
    component: React.JSX.ElementType;
    props: object;
    controller: t.Controller;
};
export default function WidgetWrapper(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
