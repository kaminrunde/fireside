export declare type StoryContext = {
    kind: string;
    story: string;
    id: string;
};
export interface KnobOptions {
    hint?: string;
    tab?: string;
}
export interface StringOptions extends KnobOptions {
}
export interface NumberOptions extends KnobOptions {
}
export interface MarkdownOptions extends KnobOptions {
}
export interface SimpleKnob {
    type: 'string' | 'constant' | 'number' | 'markdown';
    prop: string;
    label: string;
    value: any;
    options: KnobOptions;
}
export interface Knob extends SimpleKnob {
    id: string;
    story: StoryContext;
}
export declare type Controller = {
    versionUpdate?: Function;
    createContext?: Function;
    preprocessProps?: Function;
    createStoryEvents?: Function;
};
export declare type Component = {
    id: string;
    name: string;
    props: object;
};
declare type Event = 'storyboard-bridge/set-knobs' | 'storyboard-bridge/set-knob-value' | 'storyboard-bridge/select-story' | 'storyboard-bridge/story-selected' | 'storyboard-bridge/hydrate-component' | 'storyboard-bridge/update-component-name' | 'storyboard-bridge/update-component-props' | 'storyboard-bridge/init-knob-manager';
export declare type Channel = {
    emit: (event: Event, options?: any) => void;
    on: (event: Event, cb: (val: any) => void) => void;
    once: (event: Event, cb: (val: any) => void) => void;
};
export {};
