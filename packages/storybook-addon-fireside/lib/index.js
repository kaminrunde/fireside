"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWidgetSelector = exports.create = exports.select = exports.objectList = exports.stringList = exports.bool = exports.markdown = exports.number = exports.constant = exports.string = void 0;
const React = require("react");
const manager = require("./knob-manager");
const WidgetWrapper_1 = require("./WidgetWrapper");
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
exports.string = (prop, label, value, options = {}) => ({ type: 'string', prop, label, value, options });
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
exports.constant = (prop, label, value, options = {}) => ({ type: 'constant', prop, label, value, options });
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
exports.number = (prop, label, value, options = {}) => ({ type: 'number', prop, label, value, options });
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
exports.markdown = (prop, label, value, options = {}) => ({ type: 'markdown', prop, label, value, options });
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
exports.bool = (prop, label, value, options = {}) => ({ type: 'bool', prop, label, value, options });
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
exports.stringList = (prop, label, value, options = {}) => ({ type: 'stringList', prop, label, value, options });
/**
 * yields a sortable list of objects. You have to define a schema just like you define the schema of your component.
 * Every Knob can be used. Even further ObjectList knobs. That way you can build any deep object schema
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {object[]} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @param {Function} options.validate validate the value. if this functions returns a string the form-filed will be hilighted
 * @yields {string[]}
 * @example
 * k.objectList('todos', 'List of Todos', [], {
 *   schema: [
 *     k.string('title', 'Title', ''),
 *     k.markdown('description', 'Description', '')
 *   ],
 *   getRowName: row => row.title
 * })
 */
exports.objectList = (prop, label, value, options) => ({ type: 'objectList', prop, label, value, options });
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
exports.select = (prop, label, value, options) => ({ type: 'select', prop, label, value, options });
exports.create = (name, component, simpleKnobs, controller = {}) => (context) => {
    const knobs = manager.getKnobs(context, simpleKnobs, controller, name);
    let props = manager.getProps(knobs);
    return React.createElement(WidgetWrapper_1.default, Object.assign({}, { component, props, controller }));
};
function registerWidgetSelector(name, cb) {
    manager.addSelector(name, cb);
}
exports.registerWidgetSelector = registerWidgetSelector;
//# sourceMappingURL=index.js.map