import * as React from 'react'
import * as t from './types'

type Props = {
  component: React.ElementType,
  props: object,
  controller:t.Controller
}

export default function WidgetWrapper (props:Props) {
  const [setupFinished, componentProps] = useComponentProps(props)
  if(!setupFinished) return null
  return <props.component {...componentProps}/>
}

function useComponentProps (props:Props):[boolean,object] {
  const [finished, setFinished] = React.useState(false)
  const [finalProps, setFinalProps] = React.useState(props.props)

  React.useEffect(() => {
    const getGridContext = () => {
      const context = { minRow: 0, maxRow: 0, byMediaSize: {}}
      const proxy = new Proxy(context.byMediaSize, {
        get: () => ({
          row: 0,
          col: 0,
          totalRows: 1,
          totalCols: 1,
          colStretch: 1,
          rowStretch: 1,
        }),
        has: () => true
      })
      context.byMediaSize = proxy
      return context
    }
    (async () => {
      let newProps:any = {...props.props}

      if(props.controller.preprocessProps){
        newProps = await props.controller.preprocessProps(newProps, {getGridContext})
      }
      if(props.controller.createContext){
        newProps.context = await props.controller.createContext(newProps)
      }
      setFinalProps(newProps)
      setFinished(true)
    })()
  }, [props.controller, props.props])

  return [finished,finalProps]
}