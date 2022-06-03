"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const useKnobs_1 = require("./hooks/useKnobs");
const Widget_1 = require("./Widget");
const Tabs_1 = require("./Tabs");
const useCustomComponents_1 = require("./useCustomComponents");
function Panel({ channel }) {
    const _a = useKnobs_1.default(channel), { knobs, props, update, key } = _a, tabs = __rest(_a, ["knobs", "props", "update", "key"]);
    const [customComponents, setCustomComponents] = React.useState({});
    React.useEffect(() => {
        // @ts-ignore
        if (window.__customKnobs)
            setCustomComponents(window.__customKnobs);
        // @ts-ignore
        window.__addCustomKnob = (name, component) => setCustomComponents(dict => (Object.assign(Object.assign({}, dict), { [name]: component })));
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
//# sourceMappingURL=Panel.js.map