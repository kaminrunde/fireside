import * as t from './types'
import {createController} from '@kaminrunde/fireside-utils'

export const preprocessProps = (props:t.UserConfig):t.UserConfig => ({
  ...props,
  label: 'my-custom-label'
})

export default createController({
  createContext (props, {getGridContext}) {
    const gridContext = getGridContext()
  }
})