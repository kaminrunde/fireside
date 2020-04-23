import * as React from 'react'
import styled from 'styled-components'

const url = "http://localhost:6006/"

export default function Storybook () {
  const [component, setComponent] = React.useState<object|null>(null)
  
  React.useEffect(() => {
    const listener = (e:any) => {
      if(typeof e.data !== 'object' || !e.data.type) return
      switch(e.data.type){
        case "fireside-update-component": {
          setComponent(e.data.component)
          break
        }
      }
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  },[])

  console.log('component', component)
  
  return (
    <Wrapper className='Storybook'>
      <iframe src={url} />
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