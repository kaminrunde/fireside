import * as React from 'react';
import * as t from '../types';
declare type Props = {
    value: number;
    onChange: (value: number) => void;
    focus: boolean;
    options: t.NumberOptions;
    hasError: boolean;
};
export default function String(props: Props): React.JSX.Element;
export {};
