import * as t from "../types";
type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.MarkdownOptions;
    hasError: boolean;
};
export default function Markdown(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
