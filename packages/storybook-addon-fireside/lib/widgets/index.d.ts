import String from './String';
import Number from './Number';
import Markdown from './Markdown';
import Bool from './Bool';
import * as t from '../types';
export default function getWidget(knob: t.Knob): (() => any) | typeof String | typeof Number | typeof Markdown | typeof Bool;
