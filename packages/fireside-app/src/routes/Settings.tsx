import * as React from 'react'
import styled from 'styled-components'
import {useActiveMediaSizes} from 'modules/settings'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

type Props = {
  path: string
}

export default function Settings (props:Props) {
  const ms = useActiveMediaSizes()
  return (
    <Wrapper className='Settings'>
      <div className='row ms'>
        <h3>Active Media-Sizes</h3>
        {Object.entries(ms.data).map(([name,active]) => (
          <div className='toggle' key={name}>
            <div className='label'>{name}</div>
            <div className='value'>
              <Toggle
                checked={active}
                onChange={e => ms.toggleSize(name)} />
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
`