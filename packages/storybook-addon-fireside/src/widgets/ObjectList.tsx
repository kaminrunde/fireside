import * as React from 'react'
import styled from 'styled-components'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import Widget from '../Panel/Widget'
import * as t from '../types'
import produce from 'immer'
import objPath = require('object-path')
const arrayMove =  require('array-move')

type Props = {
  value: object[],
  onChange: (value:object[]) => void,
  focus: boolean,
  options: t.ObjectListOptions,
}

export default function ObjectList (props:Props) {
  const [activeRowIndex, setActiveRowIndex] = React.useState<number|null>(null)
  const isActive = typeof activeRowIndex === 'number'
  return (
    <Wrapper>
      {isActive && (
        <div className='edit'>
          {props.options.schema.map(knob => (
            <Widget
              knob={knob}
              onUpdate={val => props.onChange(produce(props.value, value => {
                objPath.set(value[activeRowIndex], knob.prop, val)
              }))}
            />
          ))}
        </div>
      )}
      {isActive || <SortableList 
        items={props.value} 
        getName={props.options.getRowName}
        onSortEnd={({oldIndex,newIndex}) => {
          props.onChange(arrayMove(props.value, oldIndex, newIndex))
        }}
        onDelete={index => {
          props.onChange(props.value.filter((_,i) => i !== index))
        }}
        onUpdate={(index) => {
          setActiveRowIndex(index)
        }}
      />}

      <button className='add' onClick={() => {
        if(isActive){
          setActiveRowIndex(null)
        }
        else {
          props.onChange(produce(props.value, value => {
            let entry = {}
            for(let knob of props.options.schema) {
              objPath.set(entry, knob.prop, knob.value)
            }
            value.push(entry)
          }))
          setActiveRowIndex(props.value.length)
        }
      }}>{isActive ? 'SAVE' : 'ADD'}</button>
    </Wrapper>
  )
}


const SortableItem = SortableElement(({value, onDelete, onUpdate, getName}) => {
  const [pendingDelete, setPendingDelete] = React.useState(false)

  if(pendingDelete) return (
    <Item className='SortableItem' highlight>
      {/* <span>Delete "{value}"?</span> */}
      <span>Delete "{getName(value)}"?</span>
      <div className='update keep' onMouseDown={onDelete}>Y</div>
      <div className='delete keep' onMouseDown={() => setPendingDelete(false)}>N</div>
    </Item>
  )

  return (
    <Item className='SortableItem'>
      <span>{getName(value)}</span>
      <div className='update' onMouseDown={onUpdate}>U</div>
      <div className='delete' onMouseDown={() => setPendingDelete(true)}>D</div>
    </Item>
  )
})

const SortableList = SortableContainer(({items, onDelete, onUpdate, getName}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem 
          key={`item-${index}`} 
          index={index} 
          value={value} 
          getName={getName}
          onDelete={() => onDelete(index)}
          onUpdate={() => onUpdate(index)}
        />
      ))}
    </ul>
  );
})

const Wrapper = styled.div`

  > .edit {
    border-left: 4px solid #1DA7FD;
    background: #d3d3d34d;
  }

  > ul {
    list-style: none;
    margin: 0;
    padding: 3px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    background: #d3d3d34d;
    cursor: grabbing;
  }

  > .add {
    margin-top: 5px;
    display: block;
    width: 100%;
    border: 1px solid lightgrey;
    background: #8bc34a;
    padding: 8px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    color: white;
  }
`

const Item = styled.li`
  padding: 10px;
  margin: 3px 0;
  border: 1px solid lightgrey;
  border-radius: 3px;
  background: ${p => p.highlight ? '#FFE4C4' : 'white'};
  list-style: none;
  font-size: 14px;
  cursor: grabbing;
  display: flex;

  > input {
    display: block;
    width: 100%;
    border: none;
    background: none;
  }

  > span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > .update, .delete {
    display: none;
    margin-left: 15px;
    width: 16px;
    text-align: center;
    cursor: pointer;
  }

  > .keep {
    display: block;
  }

  > .update {
    background: gold;
    outline: gold solid 5px;
  }

  > .delete {
    background: OrangeRed;
    outline: OrangeRed solid 5px;
  }

  &:hover {
    > .update, .delete {
      display: block;
    }
  }
`