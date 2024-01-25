import * as React from "react";
import * as t from "../types";
declare type Props = {
    value: string[];
    onChange: (value: string[]) => void;
    focus: boolean;
    options: t.StringListOptions;
    hasError: boolean;
};
export default function StringList(props: Props): React.JSX.Element;
export {};
