import * as React from 'react'
import styled from 'styled-components'
import {useComponents} from 'modules/components'

export default function ComponentList () {
  const components = useComponents()
  return (
    <Wrapper className='ComponentList'>
      <div className='row'>
        <div className='first'>
          <div className='title'>Banner-1</div>
          <div className='last-updated'><b>last changed:</b> vor 3 Tagen</div>
          <div className='created'><b>created:</b> 04.06.2020 10:30</div>
        </div>
        <div className='second'>Banner</div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .row {
    padding-bottom: 10px;
    border-bottom: 1px solid lightgrey;
    margin: 10px;
    display: flex;

    > .first {
      flex: 1;

      > .title {
        font-size: 20px;
        line-height: 26px;
        font-weight: bold;
      }
    }

    > .second {
      margin: 0 30px;
      font-size: 24px;
      display: flex;
      height: auto;
      align-items: center;
    }
  }
`