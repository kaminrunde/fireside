import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
const Context = React.createContext({});
export function CustomComponentsProvider(props) {
    return (_jsx(Context.Provider, { value: props.value, children: props.children }));
}
export default function useCustomComponents() {
    return React.useContext(Context);
}
