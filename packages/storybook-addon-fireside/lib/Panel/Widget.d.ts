import * as t from "../types";
type Props = {
    knob: t.Knob | t.SimpleKnob;
    onUpdate: (value: any) => void;
    parentProps?: any;
};
export default function Widget(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
