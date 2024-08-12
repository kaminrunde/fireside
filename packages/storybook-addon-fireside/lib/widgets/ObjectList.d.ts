import * as React from "react";
import * as t from "../types";
type Props = {
    value: object[];
    onChange: (value: object[]) => void;
    focus: boolean;
    options: t.ObjectListOptions;
    hasError: boolean;
};
export default function ObjectList(props: Props): React.JSX.Element;
export {};
