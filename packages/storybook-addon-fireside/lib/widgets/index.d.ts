import String from './String';
import Number from './Number';
import Markdown from './Markdown';
import Bool from './Bool';
import StringList from './StringList';
import * as t from '../types';
export default function getWidget(knob: t.Knob): typeof String | (() => any) | typeof Number | typeof Markdown | typeof Bool | typeof StringList;
