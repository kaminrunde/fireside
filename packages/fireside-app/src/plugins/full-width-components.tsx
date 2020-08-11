import {FaArrowsAltH} from 'react-icons/fa'
import createPlugin from './createPlugin'

export default createPlugin<boolean>(ctx => ({
  name: 'full-width-component',
  Badge: FaArrowsAltH,
  componentContext: {
    defaultValue: false,
    key: 'fullWidth',
    hasBadge: active => active,
    icon: {
      isActive: active => active,
      onClick: active => ctx.setState(!active)
    },
  }
}))

