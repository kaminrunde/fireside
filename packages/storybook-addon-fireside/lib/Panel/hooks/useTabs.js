"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function useTabs(allKnobs) {
    const [tabs, setTabs] = React.useState(['DEFAULT']);
    const [activeTab, setActiveTab] = React.useState('DEFAULT');
    const [knobs, setKnobs] = React.useState([]);
    const lastActiveTab = React.useRef(activeTab);
    const lastKnobs = React.useRef(null);
    React.useEffect(() => {
        const knobsChanged = lastKnobs.current !== allKnobs;
        lastKnobs.current = allKnobs;
        const tabsSet = new Set();
        for (let knob of allKnobs)
            tabsSet.add(knob.options.tab || 'DEFAULT');
        const tabs = [...tabsSet];
        let newActiveTab = lastActiveTab.current;
        if (!tabsSet.has('DEFAULT') && tabs[0] && (newActiveTab !== activeTab || knobsChanged)) {
            newActiveTab = tabs[0];
            setActiveTab(tabs[0]);
        }
        const knobs = allKnobs.filter(knob => {
            if (!knob.options.tab && newActiveTab === 'DEFAULT')
                return true;
            else
                return knob.options.tab === newActiveTab;
        });
        setTabs(tabs);
        setKnobs(knobs);
    }, [allKnobs, activeTab]);
    const overloadedSetActiveTab = tab => {
        setActiveTab(tab);
        lastActiveTab.current = tab;
    };
    return { tabs, knobs, activeTab, setActiveTab: overloadedSetActiveTab };
}
exports.default = useTabs;
//# sourceMappingURL=useTabs.js.map