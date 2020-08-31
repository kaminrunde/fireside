import * as at from './const'

export const setState = (key:string, state:any) => ({
  type: at.SET_STATE,
  meta: {key},
  payload: state
})

export type SetState = ReturnType<typeof setState>

export type Action = SetState