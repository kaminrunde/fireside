import * as t from "../types";
type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.SelectOptions;
    hasError: boolean;
};
export default function Select(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
