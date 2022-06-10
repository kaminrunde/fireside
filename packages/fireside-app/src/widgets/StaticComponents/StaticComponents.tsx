import * as React from 'react'
import styled from 'styled-components'
import { useStaticComponents } from 'modules/plugins'
import Component from './Component'

export default function StaticComponents () {
  const components = useStaticComponents()
  return (
    <Wrapper>
      {components.data.map((c,i) => (
        <Component 
          key={i}
          pluginKey={c.meta.key}
          component={c.payload}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div``