import String from './String';
import Number from './Number';
import * as t from '../types';
export default function getWidget(knob: t.Knob): typeof String | (() => any) | typeof Number;
