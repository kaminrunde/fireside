import String from './String'
import Constant from './Constant'
import Number from './Number'
import * as t from '../types'

export default function getWidget (knob:t.Knob) {
  return {
    string: String,
    constant: Constant,
    number: Number
  }[knob.type]
}