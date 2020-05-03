import * as React from 'react'
import styled from 'styled-components'
import {useLoadingComponent} from 'modules/components'
import ActionButtons, {t} from 'widgets/ActionButtons'

const url = "http://localhost:6006/"

export default function Storybook () {
  const ref = React.useRef<null|HTMLIFrameElement>(null)
  const [component, setComponent] = React.useState<object|null>(null)
  const [setupFinished, setSetupFinished] = React.useState(false)
  const loadingComponent = useLoadingComponent()
  
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
    if(!loadingComponent.isLoading) return

    ref.current?.contentWindow?.postMessage({
      type: 'fireside-hydrate-component',
      component: loadingComponent.data,
      defaultStory: 'any'
    }, '*')
  }, [setupFinished, loadingComponent.isLoading, loadingComponent.data])
  
  return (
    <Wrapper className='Storybook' visible={loadingComponent.isLoading}>
      {loadingComponent.data && (
        <ActionButtons
          buttons={[
            {
              label: 'Save',
              type: 'primary',
              onClick: () => loadingComponent.unload()
            },{
             label: 'Abort',
             type: 'danger',
             onClick: () => loadingComponent.unload()
           }
          ]}
        />
      )}
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
  visibility: ${(props:any) => props.visible ? 'visible' : 'hidden'};
  > iframe {width: 100%; height:100%;border: none;}
`