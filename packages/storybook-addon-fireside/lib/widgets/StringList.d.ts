/// <reference types="react" />
import * as t from "../types";
declare type Props = {
    value: string[];
    onChange: (value: string[]) => void;
    focus: boolean;
    options: t.StringListOptions;
    hasError: boolean;
};
export default function StringList(props: Props): JSX.Element;
export {};
