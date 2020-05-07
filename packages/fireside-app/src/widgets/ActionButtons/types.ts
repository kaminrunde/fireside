
export type ActionButton = {
  label: string,
  type: 'primary' | 'secondary' | 'danger',
  /** what should happen when we click on the button */
  onClick: () => void
}