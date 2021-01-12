/// <reference types="react" />
import * as t from '../types';
declare type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.MarkdownOptions;
    hasError: boolean;
};
export default function Markdown(props: Props): JSX.Element;
export {};
