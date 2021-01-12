import String from './String';
import Number from './Number';
import Markdown from './Markdown';
import Bool from './Bool';
import StringList from './StringList';
import ObjectList from './ObjectList';
import * as t from '../types';
export default function getWidget(knob: t.Knob | t.SimpleKnob): typeof String | (() => any) | typeof Number | typeof Markdown | typeof Bool | typeof StringList | typeof ObjectList;
