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
    return (React.createElement(CustomComponentsProvider, { value: customComponents },
        React.createElement(Wrapper, null,
            React.createElement(Tabs, { key: key, tabs: tabs }),
            knobs
                .filter((knob) => {
                if (!knob.options.shouldDisplay)
                    return true;
                return knob.options.shouldDisplay(props);
            })
                .map((knob) => (React.createElement(Widget, { key: knob.id + key, knob: knob, parentProps: props, onUpdate: (val) => update(knob, val) }))))));
}
const Wrapper = styled.div `
  color-scheme: light;
  padding-bottom: 300px;
`;
