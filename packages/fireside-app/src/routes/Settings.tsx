import * as React from 'react'
import styled from 'styled-components'
import {useActiveMediaSizes} from 'modules/settings'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import MediaIcon from 'components/MediaIcon'
import config from 'config'

type Props = {
  path: string
}

export default function Settings (props:Props) {
  const ms = useActiveMediaSizes()
  return (
    <Wrapper className='Settings'>
      <div className='row ms'>
        <h3>Active Media-Sizes</h3>
        {Object.entries(ms.data).map(([key,active], i) => {
          const entry = config.mediaSizes.find(m => m.key === key)
          if(!entry) return null
          return (
            <div className='toggle' key={key}>
              {entry.icon && <MediaIcon icon={entry.icon}/>}
              <div className='label'>{entry.label}</div>
              <div className='value'>
                <Toggle
                  checked={active}
                  onChange={e => i!==0 && ms.toggleSize(key)} />
              </div>
            </div>
          )
        })}
        <hr/>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;

  > .row {
    > h3 {
      font-family: 'Open Sans', sans-serif;
    }
  }

  .toggle {
    display: flex;
    > .label {
      margin-left: 10px;
      min-width: 150px;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
    }
  }
`