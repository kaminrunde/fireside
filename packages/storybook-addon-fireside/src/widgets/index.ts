import String from './String'
import Constant from './Constant'
import * as t from '../types'

export default function getWidget (knob:t.Knob) {
  return {
    string: String,
    constant: Constant
  }[knob.type]
}