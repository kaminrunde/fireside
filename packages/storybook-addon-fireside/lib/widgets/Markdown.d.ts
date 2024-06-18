import * as React from 'react';
import * as t from '../types';
type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.MarkdownOptions;
    hasError: boolean;
};
export default function Markdown(props: Props): React.JSX.Element;
export {};
