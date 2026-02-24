import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as manager from "./knob-manager";
import WidgetWrapper from "./WidgetWrapper";
import { addons } from "storybook/preview-api";
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
export const string = (prop, label, value, options = {}) => ({ type: "string", prop, label, value, options });
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
export const constant = (prop, label, value, options = {}) => ({ type: "constant", prop, label, value, options });
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
export const number = (prop, label, value, options = {}) => ({ type: "number", prop, label, value, options });
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
export const markdown = (prop, label, value, options = {}) => ({ type: "markdown", prop, label, value, options });
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
export const bool = (prop, label, value, options = {}) => ({ type: "bool", prop, label, value, options });
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
export const stringList = (prop, label, value, options = {}) => ({ type: "stringList", prop, label, value, options });
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
export const objectList = (prop, label, value, options) => ({ type: "objectList", prop, label, value, options });
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
export const select = (prop, label, value, options) => ({ type: "select", prop, label, value, options });
export const create = (name, component, simpleKnobs, controller = {}) => (args, context) => {
    const [, update] = React.useState(0);
    const channel = addons.getChannel();
    React.useEffect(() => {
        channel.emit("storyboard-bridge/story-component-loaded", context.id);
    }, [context.id]);
    const knobs = manager.getKnobs(context, simpleKnobs, controller, name, () => update((i) => i + 1));
    let props = manager.getProps(knobs);
    return _jsx(WidgetWrapper, { component, props, controller });
};
export function registerWidgetSelector(name, cb) {
    manager.addSelector(name, cb);
}
export function createCustomKnob(name) {
    return (prop, label, value, options) => ({
        type: "custom-knob",
        prop,
        label,
        value,
        options: { ...options, __name: name },
    });
}
export function registerKnob(name, component) {
    if (typeof window === "undefined")
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
