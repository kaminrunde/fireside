import * as React from "react";
import objPath from "object-path";
export default function useKnobs(channel) {
    const [knobs, setKnobs] = React.useState([]);
    const [props, setProps] = React.useState({});
    const allKnobs = React.useRef([]);
    const [key, setKey] = React.useState(1);
    const [tabs, setTabs] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState("DEFAULT");
    React.useEffect(() => {
        // Initial die gespeicherten Knobs abrufen
        const savedKnobs = channel.getKnobs();
        if (savedKnobs.length > 0) {
            processKnobs(savedKnobs);
        }
        channel.on("storyboard-bridge/set-knobs", async (knobs) => {
            processKnobs(knobs);
        });
    }, [channel]);
    const processKnobs = async (knobs) => {
        const pendingFunctions = [];
        for (const knob of knobs) {
            for (const key in knob.options) {
                //@ts-ignore
                const knobOption = knob.options[key];
                if (typeof knobOption === "string" &&
                    knobOption.includes("function_")) {
                    const id = knob.options[key];
                    const promise = new Promise((resolve) => {
                        channel.emit("storyboard-bridge/request-function", id);
                        channel.on(`storyboard-bridge/response-function-${id}`, (fnString) => {
                            const fn = new Function("return " + fnString)();
                            knob.options[key] = fn;
                            resolve();
                        });
                    });
                    pendingFunctions.push(promise);
                }
            }
        }
        await Promise.all(pendingFunctions);
        allKnobs.current = knobs;
        const tabsSet = new Set();
        for (let knob of knobs)
            tabsSet.add(knob.options.tab || "DEFAULT");
        const newTabs = [...tabsSet];
        let newActiveTab = "DEFAULT";
        if (!tabsSet.has("DEFAULT") && newTabs[0])
            newActiveTab = newTabs[0];
        let filteredKnobs = calculateKnobs(knobs, newActiveTab);
        const newProps = {};
        for (const knob of knobs)
            objPath.set(newProps, knob.prop, knob.value);
        setProps(newProps);
        setKnobs(filteredKnobs);
        setTabs(newTabs);
        setActiveTab(newActiveTab);
        setKey((key) => key + 1);
    };
    const overloadedSetActiveTab = (tab) => {
        const filteredKnobs = calculateKnobs(allKnobs.current, tab);
        setKnobs(filteredKnobs);
        setActiveTab(tab);
    };
    return {
        knobs,
        props,
        update: (knob, value) => {
            knob.value = value;
            channel.emit("storyboard-bridge/set-knob-value", {
                knobId: knob.id,
                payload: value,
            });
            const props = {};
            for (const knob of allKnobs.current)
                objPath.set(props, knob.prop, knob.value);
            setProps(props);
        },
        key: key.toString(),
        tabs,
        activeTab,
        setActiveTab: overloadedSetActiveTab,
    };
}
function calculateKnobs(knobs, tab) {
    return knobs.filter((knob) => {
        if (!knob.options.tab && tab === "DEFAULT")
            return true;
        else
            return knob.options.tab === tab;
    });
}
