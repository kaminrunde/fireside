import * as React from 'react'
import styled from 'styled-components'
import * as components from 'modules/components'
import ActionButtons from 'widgets/ActionButtons'
import config from 'config'

export default function Storybook () {
  const ref = React.useRef<null|HTMLIFrameElement>(null)
  const [component, setComponent] = React.useState<components.t.Component|null>(null)
  const [setupFinished, setSetupFinished] = React.useState(false)
  const loadingComponent = components.useLoadingComponent()
  
  React.useEffect(() => {
    const listener = (e:any) => {
      if(typeof e.data !== 'object' || !e.data.type) return
      switch(e.data.type){
        case "fireside-update-component": {
          setComponent({...e.data.component, fullWidth: loadingComponent.data?.fullWidth || false})
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
      defaultStory: config.defaultStory
    }, '*')
  }, [setupFinished, loadingComponent.isLoading, loadingComponent.data])
  
  return (
    <Wrapper className='Storybook' visible={loadingComponent.isLoading}>
      {loadingComponent.isLoading && (
        <ActionButtons
          buttons={[
            {
              label: 'Save',
              type: 'primary',
              onClick: () => loadingComponent.data 
              ? loadingComponent.update(loadingComponent.data.props.gridArea, component)
              : loadingComponent.add(component)
            },{
              label: 'Abort',
              type: 'danger',
              onClick: () => loadingComponent.unload()
           }
          ]}
        />
      )}
      <iframe ref={ref} src={config.storybookUrl} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  z-index: 99999999;
  top: 60px;
  left:0;
  right:0;
  bottom:0;
  visibility: ${(props:any) => props.visible ? 'visible' : 'hidden'};
  > iframe {
    width: 100%; 
    height:100%;
    border: none;
  }
`