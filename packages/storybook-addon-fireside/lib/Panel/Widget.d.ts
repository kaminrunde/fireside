/// <reference types="react" />
import * as t from '../types';
declare type Props = {
    knob: t.Knob | t.SimpleKnob;
    customComponents: Record<string, any>;
    onUpdate: (value: any) => void;
};
export default function Widget(props: Props): JSX.Element;
export {};
