import * as React from 'react';
import * as t from './types';
export declare const string: (prop: string, label: string, value: string, options?: t.KnobOptions) => t.SimpleKnob;
export declare const constant: (prop: string, label: string, value: any, options?: t.KnobOptions) => t.SimpleKnob;
export declare const create: (name: string, component: React.ElementType<any>, simpleKnobs: t.SimpleKnob[], controller?: t.Controller) => any;
export declare const registerWidgetSelector: (name: string, cb: (props: object) => {
    kind: string;
    story: string;
}) => void;
