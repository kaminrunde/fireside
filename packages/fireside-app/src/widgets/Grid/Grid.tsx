import * as React from 'react'
import styled, {css} from 'styled-components'
import ActionButtons, {t} from 'widgets/ActionButtons'
import * as $grid from 'modules/grid'
import {useLoadingComponent, useComponents} from 'modules/components'
import useGridWidth from './hooks/useGridWidth'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {FiPlus,FiMinus} from 'react-icons/fi'
import GridItem from './GridItem'
import GridHeight from './GridHeight'
import {MdInfoOutline} from 'react-icons/md'
import SettingsButton from './SettingsButton'

const GRID_MARGIN = 5
const ROW_HEIGHT = 40
const CONTEXT_WIDTH = 120

type Props = {
  mediaSize: string
}

export default function Grid (props:Props) {
  const grid = $grid.useGrid(props.mediaSize)
  const loadingComponent = useLoadingComponent()
  const components = useComponents()
  const gridWidth = useGridWidth()
  const [draggingName, setDraggingName] = React.useState('')
  const [active, setActive] = React.useState<null|string>(null)
  const [actionButtons, setActionButtons] = React.useState<t.ActionButton[]>([])
  const [
    [hoverComponentId,hoverComponentToTop], 
    setHoverComponentId
  ] = React.useState<[string|null,boolean]>([null,false])

  const [labels, componentNames] = React.useMemo(() => {
    let labelDict:Record<string, string> = {}
    let nameDict:Record<string, string> = {}
    for (let c of components.data) {
      labelDict[c.id] = c.props.gridArea
      nameDict[c.id] = c.name
    }
    return [labelDict, nameDict]
  }, [components.data])

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
          <SettingsButton mediaSize={props.mediaSize} />
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
            <GridHeight key={i} mediaSize={props.mediaSize} index={i} height={height}/>
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
                    mediaSize={props.mediaSize}
                    rowHeight={ROW_HEIGHT}
                    active={active === item.i} 
                    item={item}
                    onMouseEnter={() => setHoverComponentId([item.i, false])}
                    onMouseLeave={() => setHoverComponentId([null, false])}
                    label={labels[item.i]}
                    onClick={handleItemClick(item.i)}/>
                </div>
              ))}
          </GridLayout>
        </div>
      </div>
      <div className='buffer-offset'/>
      <div className='buffer'>
        {components.data
        .filter(c => !grid.data.gridAreas.find(area => area.i === c.id))
        .map(c => (
          <BufferComponent 
            data-name={c.id}
            className='component' 
            draggable 
            active={active === c.id}
            onDragStart={(e:any) => {
              setDraggingName(c.id)
              e.dataTransfer.setData("text/plain", "")
            }}
            onClick={handleItemClick(c.id)}
            onDragEnd={() => setDraggingName('')}
            onMouseEnter={() => setHoverComponentId([c.id, true])}
            onMouseLeave={() => setHoverComponentId([null, false])}
            unselectable="on" 
            key={c.id}>
              {c.props.gridArea}
          </BufferComponent>
        ))}
        <div className='offset'/>
      </div>

      {hoverComponentId && (
        <HoverInfo top={hoverComponentToTop}>
          <div className='info'>
            <MdInfoOutline/> 
          </div>
          <div className='labels'>
            <span className='area'>{labels[hoverComponentId]}</span>
            <span className='name'>{componentNames[hoverComponentId]}</span>
          </div>
        </HoverInfo>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 5px;
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  padding-bottom: 200px;

  .react-grid-layout {
    padding-bottom: 50px;
    box-sizing: content-box;
  }

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
    }

    > .right {
      flex: 1;
    }
  }

  > .buffer-offset {
    height: 450px;
    width: 100%;
  }

  > .buffer {
    position: fixed;
    background: whitesmoke;
    z-index: 999999999;
    box-shadow: 0px -3px 5px 1px rgba(0,0,0,0.19);
    left: 0;
    right: 0;
    bottom: 0;
    height: 200px;
    overflow: auto;
    padding: 20px 20px 50px 20px;
    border-top: 1px solid lightgrey;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;

    @media (min-width: 800px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1100px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (min-width: 1400px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    @media (min-width: 1700px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    > .offset {
      height: 80px;
      width: 100%;
    }
  }
`

const HoverInfo = styled.div`
  position: fixed;
  ${p => p.top ? css`top:20px;` : css`bottom:20px;`}
  left: 20px;
  background: #607d8b;
  color: white;
  font-family: "Open Sans", sans-serif;
  padding: 5px 10px;
  padding-right: 20px;
  font-size: 14px;
  z-index: 9999999999;
  display: flex;

  > .info {
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    > svg {
      font-size: 16px;
    }
  }

  > .labels {
    flex: 1;
    > span { display: block; }
    > .name {
      font-size: 18px;
    }
  }
`

const BufferComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: steelblue;
  width: 100%;
  color: white;
  cursor: pointer;
  height: ${ROW_HEIGHT}px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;

  border-left: 8px solid transparent;

  ${(props:any) => props.active && `
    border-left: 8px solid #795548;
  `}
`