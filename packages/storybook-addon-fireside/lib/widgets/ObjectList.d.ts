import * as t from "../types";
type Props = {
    value: object[];
    onChange: (value: object[]) => void;
    focus: boolean;
    options: t.ObjectListOptions;
    hasError: boolean;
};
export default function ObjectList(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
