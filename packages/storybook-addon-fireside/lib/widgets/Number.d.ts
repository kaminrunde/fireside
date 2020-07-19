/// <reference types="react" />
import * as t from '../types';
declare type Props = {
    value: number;
    onChange: (value: number) => void;
    focus: boolean;
    options: t.NumberOptions;
};
export default function String(props: Props): JSX.Element;
export {};
