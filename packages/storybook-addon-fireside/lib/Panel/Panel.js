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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const useKnobs_1 = __importDefault(require("./hooks/useKnobs"));
const Widget_1 = __importDefault(require("./Widget"));
const Tabs_1 = __importDefault(require("./Tabs"));
const useCustomComponents_1 = require("./useCustomComponents");
function Panel({ channel }) {
    const { knobs, props, update, key, ...tabs } = (0, useKnobs_1.default)(channel);
    const [customComponents, setCustomComponents] = React.useState({});
    React.useEffect(() => {
        // @ts-ignore
        if (window.__customKnobs)
            setCustomComponents(window.__customKnobs);
        // @ts-ignore
        window.__addCustomKnob = (name, component) => setCustomComponents(dict => ({ ...dict, [name]: component }));
    }, []);
    return (React.createElement(useCustomComponents_1.CustomComponentsProvider, { value: customComponents },
        React.createElement(Wrapper, null,
            React.createElement(Tabs_1.default, { key: key, tabs: tabs }),
            knobs
                .filter(knob => {
                if (!knob.options.shouldDisplay)
                    return true;
                return knob.options.shouldDisplay(props);
            })
                .map(knob => (React.createElement(Widget_1.default, { key: knob.id + key, knob: knob, onUpdate: val => update(knob, val) }))))));
}
exports.default = Panel;
const Wrapper = styled_components_1.default.div `
  padding-bottom: 300px;
`;
