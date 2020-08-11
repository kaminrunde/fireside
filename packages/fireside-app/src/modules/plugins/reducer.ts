import {Plugin} from 'plugins/createPlugin'
import p1 from 'plugins/full-width-components'

export type State = Plugin<any>[]

export const defaultState:State = [p1]

export default function reducer (state:State) {
  return state
}