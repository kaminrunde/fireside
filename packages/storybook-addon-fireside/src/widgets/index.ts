import String from './String'
import Constant from './Constant'
import Number from './Number'
import Markdown from './Markdown'
import Bool from './Bool'
import StringList from './StringList'
import * as t from '../types'

export default function getWidget (knob:t.Knob) {
  return {
    string: String,
    constant: Constant,
    number: Number,
    markdown: Markdown,
    bool: Bool,
    stringList: StringList
  }[knob.type]
}