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
exports.registerKnob = exports.createCustomKnob = exports.registerWidgetSelector = exports.create = exports.select = exports.objectList = exports.stringList = exports.bool = exports.markdown = exports.number = exports.constant = exports.string = void 0;
const React = __importStar(require("react"));
const manager = __importStar(require("./knob-manager"));
const WidgetWrapper_1 = __importDefault(require("./WidgetWrapper"));
/**
 * manages string props. use this knob for simple labels. for more
 * complex inputs use the markdown knob
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {string} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @yields {string}
 * @example
 * k.string('label', 'Label', 'hello world')
 */
const string = (prop, label, value, options = {}) => ({ type: 'string', prop, label, value, options });
exports.string = string;
/**
 * store anything you like here. This knob won't be visible in storybook.
 * But be carefull what you want to store. The constant is only usefull for distinguising
 * different implementations (stories) of the same component. For everything else use a locale
 * config object
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label won't be visible so leave it blank
 * @param {string} value default value. can be anything
 * @yields {string}
 * @example
 * k.constant('__version', '', 1)
 */
const constant = (prop, label, value, options = {}) => ({ type: 'constant', prop, label, value, options });
exports.constant = constant;
/**
 * manages number props.
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {number} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @yields {number}
 * @example
 * k.number('size', 'Your Size', 4)
 */
const number = (prop, label, value, options = {}) => ({ type: 'number', prop, label, value, options });
exports.number = number;
/**
 * manages markdown string props. use this knob for complex text.
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {string} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @yields {string}
 * @example
 * k.markdown('content', 'Your Content', '# Headline')
 */
const markdown = (prop, label, value, options = {}) => ({ type: 'markdown', prop, label, value, options });
exports.markdown = markdown;
/**
 * manages boolean props
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {boolean} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @yields {boolean}
 * @example
 * k.bool('isPrimary', 'Is Primary', true)
 */
const bool = (prop, label, value, options = {}) => ({ type: 'bool', prop, label, value, options });
exports.bool = bool;
/**
 * yields a sortable list of strings
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {string[]} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @yields {string[]}
 * @example
 * k.stringList('todos', 'List of Todos', ['buy coffee', 'star fireside on github'])
 */
const stringList = (prop, label, value, options = {}) => ({ type: 'stringList', prop, label, value, options });
exports.stringList = stringList;
/**
 * yields a sortable list of objects. You have to define a schema just like you define the schema of your component.
 * Every Knob can be used. Even further ObjectList knobs. That way you can build any deep object schema
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {object[]} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @yields {object[]}
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @example
 * k.objectList('todos', 'List of Todos', [], {
 *   schema: [
 *     k.string('title', 'Title', ''),
 *     k.markdown('description', 'Description', '')
 *   ],
 *   getRowName: row => row.title
 * })
 */
const objectList = (prop, label, value, options) => ({ type: 'objectList', prop, label, value, options });
exports.objectList = objectList;
/**
 * same as string but with predefined options. useful if you only want to have specific options
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {object[]} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @yields {string[]}
 * @example
 * k.select('position', 'Position', 'left', {
  *   options: [
  *     { label: 'left', value: 'left' },
  *     { label: 'center', value: 'center' },
  *     { label: 'right', value: 'right' },
  *   ]
  * })
  */
const select = (prop, label, value, options) => ({ type: 'select', prop, label, value, options });
exports.select = select;
const create = (name, component, simpleKnobs, controller = {}) => (args, context) => {
    const [, update] = React.useState(0);
    const knobs = manager.getKnobs(context, simpleKnobs, controller, name, () => update(i => i + 1));
    let props = manager.getProps(knobs);
    return React.createElement(WidgetWrapper_1.default, { component, props, controller });
};
exports.create = create;
function registerWidgetSelector(name, cb) {
    manager.addSelector(name, cb);
}
exports.registerWidgetSelector = registerWidgetSelector;
function createCustomKnob(name) {
    return (prop, label, value, options) => ({
        type: 'custom-knob',
        prop,
        label, value,
        options: { ...options, __name: name }
    });
}
exports.createCustomKnob = createCustomKnob;
function registerKnob(name, component) {
    if (typeof window === 'undefined')
        return;
    // @ts-ignore
    if (!window.__customKnobs)
        window.__customKnobs = {};
    // @ts-ignore
    window.__customKnobs[name] = component;
    // @ts-ignore
    if (window.__addCustomKnob) {
        // @ts-ignore
        window.__addCustomKnob(name, component);
    }
}
exports.registerKnob = registerKnob;
