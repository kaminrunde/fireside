import String from './String';
import * as t from '../types';
export default function getWidget(knob: t.Knob): typeof String | (() => any);
