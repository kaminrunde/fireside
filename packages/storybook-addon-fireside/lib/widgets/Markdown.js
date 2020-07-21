"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const rich_markdown_editor_1 = require("rich-markdown-editor");
function Markdown(props) {
    return (React.createElement(Wrapper, { focus: props.focus },
        React.createElement(rich_markdown_editor_1.default, { defaultValue: props.value, onChange: get => props.onChange(get()) })));
}
exports.default = Markdown;
const Wrapper = styled_components_1.default.div `
  border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
  border-radius: 3px;
  padding-left: 5px;
`;
//# sourceMappingURL=Markdown.js.map