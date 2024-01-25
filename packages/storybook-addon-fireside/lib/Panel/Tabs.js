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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
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
