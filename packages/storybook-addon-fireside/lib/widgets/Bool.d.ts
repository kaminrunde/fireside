/// <reference types="react" />
import * as t from '../types';
declare type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
    focus: boolean;
    options: t.BoolOptions;
};
export default function Bool(props: Props): JSX.Element;
export {};
