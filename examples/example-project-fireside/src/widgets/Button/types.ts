
export type UserConfig = {
  label: string
  __version: number
}

export type Context = any

export type Props = UserConfig & {context?:Context}