import * as React from 'react'
import styled from 'styled-components'
import {useComponents, useLoadingComponent} from 'modules/components'
import parseTimestamp from './utils/parseTimestamp'
import {useUsedComponents} from 'modules/grid'

export default function ComponentList () {
  const components = useComponents()
  const loading = useLoadingComponent()
  const usedComponents = useUsedComponents()
  return (
    <Wrapper className='ComponentList'>
      {components.data.map(c => (
        <Row key={c.id} inUse={usedComponents.data.has(c.id)}>
          <div className='gridName'>
            <div className='title'>{c.props.gridArea}</div>
            <div className='last-updated'><b>changed:</b> {parseTimestamp(c.updatedAt)}</div>
            <div className='created'><b>created:</b> {parseTimestamp(c.createdAt)}</div>
          </div>
          <div className='name'>{c.name}</div>
          <div className='button-list'>
          <div className='btn-duplicate'>
              <button onClick={() => components.duplicateComponent(c)}>duplicate</button>
            </div>
            <div className='btn-update'>
              <button onClick={() => loading.load(c.id)}>update</button>
            </div>
            <div className='btn-remove'>
              <button onClick={() => components.removeComponent(c)}>remove</button>
            </div>
          </div>
        </Row>
      ))}

      <button className='add' onClick={() => loading.load()}>
        Add Component
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`

  > .add {
    display: black;
    width: calc(100% - 20px);
    margin: 10px;
    font-size: 24px;
    border: none;
    background: #8bc34a;
    padding: 15px;
    text-transform: uppercase;
    color: whitesmoke;
    cursor: pointer;
  }
`

const Row = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid lightgrey;
  margin: 10px;
  display: flex;
  position: relative;

  > .gridName {
    flex: 1;

    > .title {
      font-size: 20px;
      line-height: 26px;
      font-weight: bold;
      font-family: 'Open Sans', sans-serif;
      color: ${p => p.inUse ? '#555' : '#ff5722'};
    }

    > .last-updated, .created {
      font-family: 'Roboto', sans-serif;
      color: grey;
      font-size: 12px;
    }
  }

  > .name {
    margin: 0 30px;
    font-size: 18px;
    display: flex;
    height: auto;
    line-break: loose;
    word-break: break-all;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
  }

  &:hover {
    > .button-list {
      display: flex !important;
    }
    > .name {
      display: none;
      @media (min-width: 800px) {
        display: flex;
      }
    }
  }

  > .button-list {
    position: absolute;
    top: 10px;
    right: 0;
    display: none;

    @media (min-width: 800px) {
      position: static;
      display: flex;
    }
    
    > .btn-update, .btn-remove, .btn-duplicate {
      margin: 0 5px;
      display: flex;
      height: auto;
      align-items: center;
      > button {
        border: none;
        background: none;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        padding: 10px;
        color: whitesmoke;
        cursor: pointer;
        font-weight: bold;
        border-radius: 3px;
        text-transform: uppercase;
      }

      &.btn-update > button {background: #8bc34a;}
      &.btn-remove > button {background: #ff5722;}
      &.btn-duplicate > button {background: #41e2ff;}
    }
  }

`