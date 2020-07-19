"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWidgetSelector = exports.create = exports.bool = exports.markdown = exports.number = exports.constant = exports.string = void 0;
const React = require("react");
const manager = require("./knob-manager");
const WidgetWrapper_1 = require("./WidgetWrapper");
exports.string = (prop, label, value, options = {}) => ({ type: 'string', prop, label, value, options });
exports.constant = (prop, label, value, options = {}) => ({ type: 'constant', prop, label, value, options });
exports.number = (prop, label, value, options = {}) => ({ type: 'number', prop, label, value, options });
exports.markdown = (prop, label, value, options = {}) => ({ type: 'markdown', prop, label, value, options });
exports.bool = (prop, label, value, options = {}) => ({ type: 'bool', prop, label, value, options });
exports.create = (name, component, simpleKnobs, controller = {}) => (context) => {
    const knobs = manager.getKnobs(context, simpleKnobs, controller, name);
    let props = manager.getProps(knobs);
    return React.createElement(WidgetWrapper_1.default, Object.assign({}, { component, props, controller }));
};
exports.registerWidgetSelector = (name, cb) => {
    manager.addSelector(name, cb);
};
//# sourceMappingURL=index.js.map