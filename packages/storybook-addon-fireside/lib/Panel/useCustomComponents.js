import * as React from "react";
const Context = React.createContext({});
export function CustomComponentsProvider(props) {
    return (React.createElement(Context.Provider, { value: props.value }, props.children));
}
export default function useCustomComponents() {
    return React.useContext(Context);
}
