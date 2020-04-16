import * as React from 'react'
import styled from 'styled-components'
// import useGridLayout from './hooks/useGridLayout'
import {useGrid} from 'modules/grid'
import useGridWidth from './hooks/useGridWidth'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const GRID_MARGIN = 5
const ROW_HEIGHT = 40

export default function Grid () {
  const grid = useGrid()
  const gridWidth = useGridWidth()

  return (
    <Wrapper className='Grid'>
      <div className='drag' draggable unselectable="on" onDragStart={e => e.dataTransfer.setData("text/plain", "")}></div>
      <div className='top'>
        <div className='context'></div>
        {grid.data.widths.map((width,i) => (
          <div className='width' key={i}>{width}</div>
        ))}
      </div>
      <div className='bottom'>
        <div className='left'>
          {grid.data.heights.map((height,i) => (
            <div className='height' key={i}>{height}</div>
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
    height: 50px;
    display: flex;

    > .context {
      width: 150px;
    }

    > .width {
      flex: 1;
      line-height: 40px;
      margin: ${GRID_MARGIN}px;
      text-align: center;
      background: whitesmoke;
    }
  }

  > .bottom {
    display: flex;
    > .left {
      width: 150px;

      > .height {
        background: whitesmoke;
        margin: ${GRID_MARGIN}px;
        height: ${ROW_HEIGHT}px;
        line-height: ${ROW_HEIGHT}px;
        text-align: center;
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