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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
function WidgetWrapper(props) {
    const [setupFinished, componentProps, key] = useComponentProps(props);
    if (!setupFinished)
        return null;
    return React.createElement(props.component, Object.assign({ key: key }, componentProps));
}
exports.default = WidgetWrapper;
function useComponentProps(props) {
    const [finished, setFinished] = React.useState(false);
    const [finalProps, setFinalProps] = React.useState(props.props);
    const [key, setKey] = React.useState(0);
    React.useEffect(() => {
        const getGridContext = () => {
            const context = { minRow: 0, maxRow: 0, byMediaSize: {} };
            const proxy = new Proxy(context.byMediaSize, {
                get: () => ({
                    row: 0,
                    col: 0,
                    totalRows: 1,
                    totalCols: 1,
                    colStretch: 1,
                    rowStretch: 1,
                }),
                has: () => true
            });
            context.byMediaSize = proxy;
            return context;
        };
        (async () => {
            let newProps = { ...props.props };
            if (props.controller.preprocessProps) {
                newProps = await props.controller.preprocessProps(newProps);
            }
            if (props.controller.createContext) {
                newProps.context = await props.controller.createContext(newProps, { getGridContext });
            }
            setFinalProps(newProps);
            setFinished(true);
            setKey(key => key + 1);
        })();
    }, [props.controller, props.props]);
    return [finished, finalProps, key];
}
