import * as React from 'react';
import * as t from './types';
/**
 * manages string props. use this knob for simple labels. for more
 * complex inputs use the markdown knob
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {string} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @yields {string}
 * @example
 * k.string('label', 'Label', 'hello world')
 */
export declare const string: (prop: string, label: string, value: string, options?: t.StringOptions) => t.SimpleKnob;
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
export declare const constant: (prop: string, label: string, value: any, options?: {}) => t.SimpleKnob;
/**
 * manages number props.
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {number} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @yields {number}
 * @example
 * k.number('size', 'Your Size', 4)
 */
export declare const number: (prop: string, label: string, value: number, options?: t.NumberOptions) => t.SimpleKnob;
/**
 * manages markdown string props. use this knob for complex text.
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {string} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @yields {string}
 * @example
 * k.markdown('content', 'Your Content', '# Headline')
 */
export declare const markdown: (prop: string, label: string, value: string, options?: t.MarkdownOptions) => t.SimpleKnob;
/**
 * manages boolean props
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {boolean} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @yields {boolean}
 * @example
 * k.bool('isPrimary', 'Is Primary', true)
 */
export declare const bool: (prop: string, label: string, value: boolean, options?: t.BoolOptions) => t.SimpleKnob;
/**
 * yields a sortable list of strings
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {string[]} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
 * @yields {string[]}
 * @example
 * k.stringList('todos', 'List of Todos', ['buy coffee', 'star fireside on github'])
 */
export declare const stringList: (prop: string, label: string, value: string[], options?: t.StringListOptions) => t.SimpleKnob;
/**
 * yields a sortable list of objects. You have to define a schema just like you define the schema of your component.
 * Every Knob can be used. Even further ObjectList knobs. That way you can build any deep object schema
 * @param {string} prop name of prop. can also be in nested form. eg: "obj.prop". for more information see docs of "object-path"
 * @param {string} label displayed in storybook as prop label. should be short and descriptive. If more information is needed use the options.hint property
 * @param {object[]} value default value
 * @param {string} options.hint the knob description
 * @param {string} options.tab the tabname the knob will be displayed in storybook
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
export declare const objectList: (prop: string, label: string, value: object[], options: t.ObjectListOptions) => t.SimpleKnob;
export declare const create: (name: string, component: React.ElementType, simpleKnobs: t.SimpleKnob[], controller?: t.Controller) => any;
export declare function registerWidgetSelector<UserConfig>(name: string, cb: (props: UserConfig) => {
    kind: string;
    story: string;
}): void;
