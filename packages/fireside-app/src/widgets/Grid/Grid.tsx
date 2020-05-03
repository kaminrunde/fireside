import * as React from 'react'
import styled from 'styled-components'
import ActionButtons, {t} from 'widgets/ActionButtons'
import {useGrid} from 'modules/grid'
import {useLoadingComponent} from 'modules/components'
import useGridWidth from './hooks/useGridWidth'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {FiPlus,FiMinus,FiSettings} from 'react-icons/fi'

const GRID_MARGIN = 5
const ROW_HEIGHT = 40
const CONTEXT_WIDTH = 120

type Props = {
  mediaSize: string
}

export default function Grid (props:Props) {
  const grid = useGrid(props.mediaSize)
  const loadingComponent = useLoadingComponent()
  const gridWidth = useGridWidth()
  const [draggingName, setDraggingName] = React.useState('')
  const [active, setActive] = React.useState<null|string>(null)
  const [actionButtons, setActionButtons] = React.useState<t.ActionButton[]>([])

  const handleItemClick = (id:string) => () => {
    if(active === id) setActive(null)
    else setActive(id)
  }

  React.useEffect(() => {
    if(!active) return
    setActionButtons([
      {
        label: 'Update',
        type: 'primary',
        onClick: () => loadingComponent.load(active)
      },{
        label: 'To Buffer',
        type: 'danger',
        onClick: console.log
      }
    ])
    return () => setActionButtons([])
  }, [active])

  return (
    <Wrapper className='Grid'>
      {actionButtons.length > 0 && (
        <ActionButtons buttons={actionButtons}/>
      )}
      <div className='top'>
        <div className='context'>
          <button onClick={() => grid.removeWidth()}><FiMinus/></button>
          <button onClick={() => grid.addWidth()}><FiPlus/></button>
          <button><FiSettings/></button>
        </div>
        {grid.data.widths.map((width,i) => (
          <div className='width' key={i}>
            <input 
              type='text' 
              value={width} 
              onChange={e => grid.setWidth(i, e.target.value)} 
            />
          </div>
        ))}
      </div>
      <div className='bottom'>
        <div className='left'>
          {grid.data.heights.map((height,i) => (
            <div className='height' key={i}>
              <input 
                type='text' 
                value={height} 
                onChange={e => grid.setHeight(i, e.target.value)} 
              />
            </div>
          ))}
        </div>
        <div className='right' ref={gridWidth.ref}>
          <GridLayout 
            layout={grid.data.gridAreas} 
            cols={grid.data.widths.length} 
            rowHeight={ROW_HEIGHT}
            droppingItem={{i:'insert', w:1, h:1}}
            onLayoutChange={(layout:any) => grid.updateGrid(layout.filter((e:any) => e.i !== 'insert'))}
            margin={[GRID_MARGIN,GRID_MARGIN]}
            isDroppable
            onDrop={(target:any) => grid.addFromBuffer({...target, i:draggingName, static:true})}
            width={gridWidth.data}>
              {grid.data.gridAreas.map(item => (
                <Item 
                  key={item.i}
                  active={active === item.i} 
                  onClick={handleItemClick(item.i)}>
                    {item.i}
                </Item>
              ))}
          </GridLayout>
        </div>
      </div>
      <div className='buffer'>
        {grid.data.buffer.map(name => (
          <BufferComponent 
            data-name={name}
            className='component' 
            draggable 
            active={active === name}
            onDragStart={(e:any) => {
              setDraggingName(name)
              e.dataTransfer.setData("text/plain", "")
            }}
            onClick={handleItemClick(name)}
            onDragEnd={() => setDraggingName('')}
            unselectable="on" 
            key={name}>
              {name}
          </BufferComponent>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  > .drag {
    width: 500px;
    height: 40px;
    background: grey;
  }

  > .top {
    height: ${ROW_HEIGHT+10}px;
    display: flex;

    > .context {
      box-sizing: border-box;
      margin: ${GRID_MARGIN}px 0;
      width: ${CONTEXT_WIDTH}px;
      border: 1px solid lightgrey;
      border-radius: 8px;
      display: flex;

      > button {
        flex: 1;
        font-size: 15px;
        background: none;
        border: none;
        border-left: 1px solid lightgrey;
        padding-top: 3px;
        &:first-child { border-left: none;}
      }
    }

    > .width {
      flex: 1;
      line-height: 40px;
      margin: ${GRID_MARGIN}px;
      text-align: center;
      > input {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 14px;
        border: none;
        background: whitesmoke;
        text-align: center;
        &:focus {
          background: white;
        }
      }
    }
  }

  > .bottom {
    display: flex;
    > .left {
      width: ${CONTEXT_WIDTH}px;

      > .height {
        margin: ${GRID_MARGIN}px;
        height: ${ROW_HEIGHT}px;
        line-height: ${ROW_HEIGHT}px;
        text-align: center;
        > input {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 14px;
          border: none;
          background: whitesmoke;
          text-align: center;
          &:focus {
            background: white;
          }
        }
      }
    }

    > .right {
      flex: 1;
    }
  }

  > .buffer {
    margin-top: 50px;
  }
`

const Item = styled.div`
  background: lightgrey;
  line-height: ${ROW_HEIGHT}px;
  height: ${ROW_HEIGHT}px;
  padding: 0 10px;
  cursor: pointer;

  border-left: 8px solid transparent;

  ${(props:any) => props.active && `
    border-left: 8px solid #795548;
  `}
`

const BufferComponent = styled.div`
  padding: 10px;
  background: steelblue;
  width: 300px;
  color: white;
  text-align: center;
  cursor: pointer;

  border-left: 8px solid transparent;

  ${(props:any) => props.active && `
    border-left: 8px solid #795548;
  `}
`