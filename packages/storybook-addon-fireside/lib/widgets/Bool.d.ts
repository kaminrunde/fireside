import * as t from "../types";
type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
    focus: boolean;
    hasError: boolean;
    options: t.BoolOptions;
};
export default function Bool(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
