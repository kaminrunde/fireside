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
function Markdown(props) {
    const ref = React.useRef(null);
    return (React.createElement(Wrapper, { focus: props.focus.toString() },
        React.createElement("textarea", { ref: ref, value: props.value, onChange: (e) => props.onChange(e.target.value), rows: 20 })));
}
exports.default = Markdown;
const Wrapper = styled_components_1.default.div `
  border: 1px solid
    ${(props) => (props.focus === "true" ? "#1DA7FD" : "lightgrey")};
  border-radius: 3px;
  padding-left: 5px;
  > textarea {
    width: 100%;
    border: none;
    line-height: 30px;
    &:focus {
      outline: none;
    }
  }
`;
