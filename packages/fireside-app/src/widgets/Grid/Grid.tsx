import * as React from 'react'
import styled from 'styled-components'
import ActionButtons, {t} from 'widgets/ActionButtons'
import {useGrid} from 'modules/grid'
import {useLoadingComponent, useComponents} from 'modules/components'
import useGridWidth from './hooks/useGridWidth'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {FiPlus,FiMinus,FiSettings} from 'react-icons/fi'
import {FaArrowsAltH} from 'react-icons/fa'
import GridItem from './GridItem'

const GRID_MARGIN = 5
const ROW_HEIGHT = 40
const CONTEXT_WIDTH = 120

type Props = {
  mediaSize: string
}

export default function Grid (props:Props) {
  const grid = useGrid(props.mediaSize)
  const loadingComponent = useLoadingComponent()
  const components = useComponents()
  const gridWidth = useGridWidth()
  const [draggingName, setDraggingName] = React.useState('')
  const [active, setActive] = React.useState<null|string>(null)
  const [actionButtons, setActionButtons] = React.useState<t.ActionButton[]>([])
  // const plugins = useComponentPlugins()

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
        onClick: () => {
          const gridArea = grid.data.gridAreas.find(area => area.i === active)
          if(!gridArea) return
          grid.toBuffer(gridArea)
        }
      }
    ])
    return () => setActionButtons([])
  }, [active, loadingComponent.load])

  // set propper z-index
  function calcZIndex () {
    setTimeout(() => {
      const list = Array.from(document.querySelectorAll('.react-grid-item'))
      list.forEach((row:any) => {
        if(!row.style) return
        const yMatch = row.style.transform.match(/, (.*)px\)/)
        if(yMatch) row.style.zIndex = yMatch[1]
      })
    }, 50)
  }

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
              <div className='context'>
                {/* <button><FaArrowsAltH/></button> */}
                <button>Hello World</button>
                <button><FiSettings/></button>
              </div>
              <div className='badges'>
                {/* <div><FaArrowsAltH/></div> */}
              </div>
            </div>
          ))}
        </div>
        <div className='right' ref={gridWidth.ref}>
          <GridLayout 
            layout={grid.data.gridAreas} 
            cols={grid.data.widths.length} 
            rowHeight={ROW_HEIGHT}
            droppingItem={{i:'insert', w:1, h:1}}
            onLayoutChange={(layout:any) => {
              grid.updateGrid(layout.filter((e:any) => e.i !== 'insert'))
              calcZIndex()
            }}
            margin={[GRID_MARGIN,GRID_MARGIN]}
            isDroppable
            onDrop={(target:any) => grid.addFromBuffer({...target, i:draggingName, static:true})}
            width={gridWidth.data}>
              {grid.data.gridAreas.map(item => (
                <div key={item.i}>
                  <GridItem 
                    rowHeight={ROW_HEIGHT}
                    active={active === item.i} 
                    item={item}
                    onClick={handleItemClick(item.i)}/>
                </div>
              ))}
          </GridLayout>
        </div>
      </div>
      <div className='buffer'>
        {components.data
        .filter(c => !grid.data.gridAreas.find(area => area.i === c.props.gridArea))
        .map(c => (
          <BufferComponent 
            data-name={c.props.gridArea}
            className='component' 
            draggable 
            active={active === c.props.gridArea}
            onDragStart={(e:any) => {
              setDraggingName(c.props.gridArea)
              e.dataTransfer.setData("text/plain", "")
            }}
            onClick={handleItemClick(c.props.gridArea)}
            onDragEnd={() => setDraggingName('')}
            unselectable="on" 
            key={c.props.gridArea}>
              {c.props.gridArea}
          </BufferComponent>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  padding-bottom: 200px;

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
        cursor: pointer;
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
        font-family: 'Open Sans', sans-serif;
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
        position: relative;
        > input {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 14px;
          border: none;
          background: whitesmoke;
          text-align: center;
          font-family: 'Open Sans', sans-serif;
          &:focus {
            background: white;
          }
        }
        > .context {
          box-sizing: border-box;
          border: 1px solid lightgrey;
          border-radius: 8px;
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          margin-left: 100%;
          background: white;
          z-index: 999;

          > button {
            width: max-content;
            font-size: 12px;
            background: none;
            border: none;
            padding: 0 15px;
            cursor: pointer;
            border-left: 1px solid lightgrey;
            padding-top: 3px;
            > svg {font-size: 15px;}
            &:first-child { border-left: none;}
          }
        }

        > .badges {
          position: absolute;
          right: -12px;
          top: -5px;
          > div {
            border: 1px solid grey;
            background: white;
            border-radius: 20px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            > svg { font-size: 12px;}
          }
        }

        &:hover {
          > .context {
            display: flex;
          }
          > .badges {
            display: none;
          }
        }
      }
    }

    > .right {
      flex: 1;
    }
  }

  > .buffer {
    position: absolute;
    background: whitesmoke;
    box-shadow: 0px -3px 5px 1px rgba(0,0,0,0.19);
    left: 0;
    right: 0;
    bottom: 0;
    height: 200px;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid lightgrey;
  }
`

const BufferComponent = styled.div`
  padding: 10px;
  background: steelblue;
  width: 300px;
  color: white;
  text-align: center;
  cursor: pointer;
  margin: 3px;
  height: ${ROW_HEIGHT}px;
  font-family: 'Open Sans', sans-serif;

  border-left: 8px solid transparent;

  ${(props:any) => props.active && `
    border-left: 8px solid #795548;
  `}
`