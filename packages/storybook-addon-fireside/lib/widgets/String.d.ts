import * as t from "../types";
type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.StringOptions;
    hasError: boolean;
};
export default function String(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
