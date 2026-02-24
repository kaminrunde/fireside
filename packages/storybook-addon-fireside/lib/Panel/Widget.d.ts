import * as t from "../types";
type Props = {
    knob: t.Knob | t.SimpleKnob;
    onUpdate: (value: any) => void;
};
export default function Widget(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
