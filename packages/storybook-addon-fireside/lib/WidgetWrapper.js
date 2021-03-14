"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
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
        (() => __awaiter(this, void 0, void 0, function* () {
            let newProps = Object.assign({}, props.props);
            if (props.controller.preprocessProps) {
                newProps = yield props.controller.preprocessProps(newProps);
            }
            if (props.controller.createContext) {
                newProps.context = yield props.controller.createContext(newProps);
            }
            setFinalProps(newProps);
            setFinished(true);
            setKey(key => key + 1);
        }))();
    }, [props.controller, props.props]);
    return [finished, finalProps, key];
}
//# sourceMappingURL=WidgetWrapper.js.map