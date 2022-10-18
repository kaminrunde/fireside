"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
function Markdown(props) {
    const ref = React.useRef(null);
    return (React.createElement(Wrapper, { focus: props.focus },
        React.createElement("textarea", { ref: ref, value: props.value, onChange: e => props.onChange(e.target.value), rows: 20 })));
}
exports.default = Markdown;
const Wrapper = styled_components_1.default.div `
  border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
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
//# sourceMappingURL=Markdown.js.map