"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function useTabs(allKnobs) {
    const [tabs, setTabs] = React.useState(['DEFAULT']);
    const [activeTab, setActiveTab] = React.useState('DEFAULT');
    const [knobs, setKnobs] = React.useState([]);
    React.useEffect(() => {
        const tabsSet = new Set();
        for (let knob of allKnobs)
            tabsSet.add(knob.options.tab || 'DEFAULT');
        const tabs = [...tabsSet];
        const newActiveTab = !tabsSet.has('DEFAULT') ? tabs[0] || 'DEFAULT' : 'DEFAULT';
        const knobs = allKnobs.filter(knob => {
            if (!knob.options.tab && activeTab === 'DEFAULT')
                return true;
            else
                return knob.options.tab === activeTab;
        });
        setTabs(tabs);
        setKnobs(knobs);
        setActiveTab(newActiveTab);
    }, [allKnobs, activeTab]);
    return { tabs, knobs, activeTab, setActiveTab };
}
exports.default = useTabs;
//# sourceMappingURL=useTabs.js.map