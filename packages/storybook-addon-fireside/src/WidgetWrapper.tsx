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
    (async () => {
      let newProps:any = {...props.props}

      if(props.controller.preprocessProps){
        newProps = await props.controller.preprocessProps(newProps)
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