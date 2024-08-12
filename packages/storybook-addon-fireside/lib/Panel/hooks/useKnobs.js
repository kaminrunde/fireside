"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
exports.default = useKnobs;
function calculateKnobs(knobs, tab) {
    return knobs.filter((knob) => {
        if (!knob.options.tab && tab === "DEFAULT")
            return true;
        else
            return knob.options.tab === tab;
    });
}
