import * as React from 'react'
import styled from 'styled-components'

const url = "http://localhost:6006/"

export default function Storybook () {
  const ref = React.useRef<null|HTMLIFrameElement>(null)
  const [component, setComponent] = React.useState<object|null>(null)
  const [setupFinished, setSetupFinished] = React.useState(false)
  
  React.useEffect(() => {
    const listener = (e:any) => {
      if(typeof e.data !== 'object' || !e.data.type) return
      switch(e.data.type){
        case "fireside-update-component": {
          setComponent(e.data.component)
          break
        }
        case "fireside-init": {
          setSetupFinished(true)
          break
        }
      }
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  },[])

  React.useEffect(() => {
    if(!setupFinished) return
    ref.current?.contentWindow?.postMessage({
      type: 'fireside-hydrate-component',
      component: {
        id: 'generic-id',
        name: 'Button',
        props: {
          label: 'hydrated'
        }
      }
    }, '*')
  }, [setupFinished])
  
  return (
    <Wrapper className='Storybook'>
      <iframe ref={ref} src={url} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  left:0;
  right:0;
  bottom:0;
  > iframe {width: 100%; height:100%;border: none;}
`