import * as React from "react";
import * as t from "../types";
type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
    focus: boolean;
    hasError: boolean;
    options: t.BoolOptions;
};
export default function Bool(props: Props): React.JSX.Element;
export {};
