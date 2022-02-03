import * as t from './types';
export declare function getKnobs(context: t.StoryContext, simpleKnobs: t.SimpleKnob[], controller: t.Controller, name: string, rerender: () => void): t.Knob[];
export declare function getProps(knobs: t.Knob[]): object;
export declare function addSelector(name: string, cb: Function): void;
