
export type Message = {
  title: string
  content: string
  buttons?: {
    label: string
    type: 'primary' | 'secondary' | 'error'
    onClick?: () => void
  }[]
}