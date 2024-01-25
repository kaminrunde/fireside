import * as React from 'react';
import * as t from '../types';
declare type Props = {
    knob: t.Knob | t.SimpleKnob;
    onUpdate: (value: any) => void;
};
export default function Widget(props: Props): React.JSX.Element;
export {};
