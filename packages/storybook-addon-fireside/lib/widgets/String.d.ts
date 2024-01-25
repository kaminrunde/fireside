import * as React from 'react';
import * as t from '../types';
declare type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.StringOptions;
    hasError: boolean;
};
export default function String(props: Props): React.JSX.Element;
export {};
