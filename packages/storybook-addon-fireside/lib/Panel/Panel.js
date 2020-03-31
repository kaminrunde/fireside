"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const useKnobs_1 = require("./hooks/useKnobs");
const Widget_1 = require("./Widget");
const Tabs_1 = require("./Tabs");
const useTabs_1 = require("./hooks/useTabs");
function Panel({ channel }) {
    const [knobs, update, key] = useKnobs_1.default(channel);
    const tabs = useTabs_1.default(knobs);
    return (React.createElement(Wrapper, null,
        React.createElement(Tabs_1.default, { key: key, tabs: tabs }),
        tabs.knobs.map(knob => (React.createElement(Widget_1.default, { key: knob.id + key, knob: knob, onUpdate: val => update(knob, val) })))));
}
exports.default = Panel;
const Wrapper = styled_components_1.default.div `

`;
//# sourceMappingURL=Panel.js.map