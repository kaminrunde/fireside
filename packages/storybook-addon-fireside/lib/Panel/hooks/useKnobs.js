"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
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
