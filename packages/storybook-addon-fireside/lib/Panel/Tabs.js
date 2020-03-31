"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
function Tabs(props) {
    if (props.tabs.tabs.length === 1)
        return null;
    return (React.createElement(Wrapper, null, props.tabs.tabs.map(tab => (React.createElement(Tab, { key: tab, active: tab === props.tabs.activeTab, children: tab, onClick: () => props.tabs.setActiveTab(tab) })))));
}
exports.default = Tabs;
const Wrapper = styled_components_1.default.div `
  display: flex;
  border-bottom: 1px solid lightgrey;
`;
const Tab = styled_components_1.default.button `
  padding: 10px;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  ${props => props.active && `
    color: #1da7fd;
    border-bottom: 2px solid #1da7fd;;
    font-weight: bold;
  `}
`;
//# sourceMappingURL=Tabs.js.map