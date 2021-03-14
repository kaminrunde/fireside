import * as t from './types'
import {createController} from '@kaminrunde/fireside-utils'

export default createController<t.UserConfig, t.Context>({
  createContext (props, {getGridContext}) {
    const gridContext = getGridContext()
    return gridContext
  },
  preprocessProps (props) {
    return {
      ...props,
      label: 'my-custom-label'
    }
  },
  versionUpdate (props) {
    let newProps = props
    if(!props.__version){
      newProps = {...newProps}
      newProps.__version = 1
      newProps.label = newProps.label + '-version-1-'
    }
    return newProps
  }
})