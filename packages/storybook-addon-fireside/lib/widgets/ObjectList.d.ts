/// <reference types="react" />
import * as t from '../types';
declare type Props = {
    value: object[];
    onChange: (value: object[]) => void;
    focus: boolean;
    options: t.ObjectListOptions;
    hasError: boolean;
};
export default function ObjectList(props: Props): JSX.Element;
export {};
