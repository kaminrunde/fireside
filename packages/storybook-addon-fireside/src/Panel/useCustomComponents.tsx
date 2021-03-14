import * as React from 'react'

const Context = React.createContext<Record<string,any>>({})

export function CustomComponentsProvider (props:{
  value:Record<string, any>
  children: any
}) {
  return (
    <Context.Provider value={props.value}>
      {props.children}
    </Context.Provider>
  )
}

export default function useCustomComponents () {
  return React.useContext(Context)
}