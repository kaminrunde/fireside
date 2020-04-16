import * as React from 'react'
import styled from 'styled-components'
// import useGridLayout from './hooks/useGridLayout'
import {useGrid} from 'modules/grid'
import useGridWidth from './hooks/useGridWidth'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {FiPlus,FiMinus,FiSettings} from 'react-icons/fi'

const GRID_MARGIN = 5
const ROW_HEIGHT = 40
const CONTEXT_WIDTH = 120

export default function Grid () {
  const grid = useGrid()
  const gridWidth = useGridWidth()

  return (
    <Wrapper className='Grid'>
      <div className='drag' draggable unselectable="on" onDragStart={e => e.dataTransfer.setData("text/plain", "")}></div>
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
            droppingItem={{i:'test', w:1, h:1}}
            onLayoutChange={grid.updateGrid}
            margin={[GRID_MARGIN,GRID_MARGIN]}
            isDroppable
            onDrop={console.log}
            width={gridWidth.data}>
              {grid.data.gridAreas.map(item => (
                <Item key={item.i}>{item.i}</Item>
              ))}
          </GridLayout>
        </div>
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
`

const Item = styled.div`
  background: lightgrey;
  line-height: ${ROW_HEIGHT}px;
  height: ${ROW_HEIGHT}px;
  padding: 0 10px;
`
