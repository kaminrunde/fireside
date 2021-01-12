

export type State = {
  [mediaSize:string]: {
    [row:number]: string
  }
}

export type Options = {
  key: string,
  colors: {
    color: string,
    label: string
  }[]
}