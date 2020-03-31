"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function useKnobs(channel) {
    const [knobs, setKnobs] = React.useState([]);
    const allKnobs = React.useRef([]);
    const [key, setKey] = React.useState(1);
    const [tabs, setTabs] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('DEFAULT');
    React.useEffect(() => {
        channel.on('storyboard-bridge/set-knobs', knobs => {
            // setAllKnobs(knobs)
            allKnobs.current = knobs;
            const tabsSet = new Set();
            for (let knob of knobs)
                tabsSet.add(knob.options.tab || 'DEFAULT');
            const tabs = [...tabsSet];
            let activeTab = 'DEFAULT';
            if (!tabsSet.has('DEFAULT') && tabs[0])
                activeTab = tabs[0];
            const filteredKnobs = calculateKnobs(knobs, activeTab);
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
        update: (knob, value) => {
            knob.value = value;
            channel.emit('storyboard-bridge/set-knob-value', {
                knobId: knob.id,
                payload: value
            });
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