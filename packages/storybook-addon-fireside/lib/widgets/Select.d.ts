/// <reference types="react" />
import * as t from '../types';
declare type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.SelectOptions;
    hasError: boolean;
};
export default function Select(props: Props): JSX.Element;
export {};
