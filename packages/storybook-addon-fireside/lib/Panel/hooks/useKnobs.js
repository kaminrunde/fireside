"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const objPath = require("object-path");
function useKnobs(channel) {
    const [knobs, setKnobs] = React.useState([]);
    const [props, setProps] = React.useState({});
    const allKnobs = React.useRef([]);
    const [key, setKey] = React.useState(1);
    const [tabs, setTabs] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('DEFAULT');
    React.useEffect(() => {
        channel.on('storyboard-bridge/set-knobs', (knobs) => {
            // setAllKnobs(knobs)
            allKnobs.current = knobs;
            const tabsSet = new Set();
            for (let knob of knobs)
                tabsSet.add(knob.options.tab || 'DEFAULT');
            const tabs = [...tabsSet];
            let activeTab = 'DEFAULT';
            if (!tabsSet.has('DEFAULT') && tabs[0])
                activeTab = tabs[0];
            let filteredKnobs = calculateKnobs(knobs, activeTab);
            const props = {};
            for (const knob of knobs)
                objPath.set(props, knob.prop, knob.value);
            setProps(props);
            setKnobs(filteredKnobs);
            setTabs(tabs);
            setActiveTab(activeTab);
            setKey(key => key + 1);
        });
    }, [channel]);
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
            channel.emit('storyboard-bridge/set-knob-value', {
                knobId: knob.id,
                payload: value
            });
            const props = {};
            for (const knob of allKnobs.current)
                objPath.set(props, knob.prop, knob.value);
            setProps(props);
        },
        key: key.toString(),
        tabs,
        activeTab,
        setActiveTab: overloadedSetActiveTab
    };
}
exports.default = useKnobs;
function calculateKnobs(knobs, tab) {
    return knobs.filter(knob => {
        if (!knob.options.tab && tab === 'DEFAULT')
            return true;
        else
            return knob.options.tab === tab;
    });
}
//# sourceMappingURL=useKnobs.js.map