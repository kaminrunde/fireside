import * as t from './types'

export const preprocessProps = (props:t.UserConfig):t.UserConfig => ({
  ...props,
  label: 'my-custom-label'
})
