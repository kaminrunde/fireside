"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomComponentsProvider = void 0;
const React = require("react");
const Context = React.createContext({});
function CustomComponentsProvider(props) {
    return (React.createElement(Context.Provider, { value: props.value }, props.children));
}
exports.CustomComponentsProvider = CustomComponentsProvider;
function useCustomComponents() {
    return React.useContext(Context);
}
exports.default = useCustomComponents;
//# sourceMappingURL=useCustomComponents.js.map