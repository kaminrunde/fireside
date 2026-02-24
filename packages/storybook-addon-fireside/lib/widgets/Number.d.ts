import * as t from "../types";
type Props = {
    value: number;
    onChange: (value: number) => void;
    focus: boolean;
    options: t.NumberOptions;
    hasError: boolean;
};
export default function String(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
