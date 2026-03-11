import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import styled from "styled-components";
import useKnobs from "./hooks/useKnobs";
import Widget from "./Widget";
import Tabs from "./Tabs";
import { CustomComponentsProvider } from "./useCustomComponents";
import { getPersistentChannel } from "../persistentChannel";
export default function Panel({ channel }) {
    const persistentChannel = getPersistentChannel(channel);
    const { knobs, props, update, key, ...tabs } = useKnobs(persistentChannel);
    const [customComponents, setCustomComponents] = React.useState({});
    React.useEffect(() => {
        // @ts-ignore
        if (window.__customKnobs)
            setCustomComponents(window.__customKnobs);
        // @ts-ignore
        window.__addCustomKnob = (name, component) => setCustomComponents((dict) => ({ ...dict, [name]: component }));
    }, []);
    return (_jsx(CustomComponentsProvider, { value: customComponents, children: _jsxs(Wrapper, { children: [_jsx(Tabs, { tabs: tabs }, key), knobs
                    .filter((knob) => {
                    if (!knob.options.shouldDisplay)
                        return true;
                    return knob.options.shouldDisplay(props);
                })
                    .map((knob) => (_jsx(Widget, { knob: knob, onUpdate: (val) => update(knob, val) }, knob.id + key)))] }) }));
}
const Wrapper = styled.div `
  color-scheme: light;
  padding-bottom: 300px;
`;
