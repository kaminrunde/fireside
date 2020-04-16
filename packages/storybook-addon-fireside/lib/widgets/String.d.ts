/// <reference types="react" />
import * as t from '../types';
declare type Props = {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
    options: t.StringOptions;
};
export default function String(props: Props): JSX.Element;
export {};
