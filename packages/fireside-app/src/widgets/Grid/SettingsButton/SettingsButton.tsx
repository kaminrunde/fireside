import * as React from 'react'
import styled from 'styled-components'
import {FiSettings} from 'react-icons/fi'
import PluginModal from '../PluginModal'
import Select from './Select'
import {useActiveMediaSizes} from 'modules/settings'
import config from 'config'
import * as $grid from 'modules/grid'

type Props = {
  mediaSize: string
}

export default function SettingsButton (props:Props) {
  const [open, setOpen] = React.useState(false)
  const ms = useActiveMediaSizes()
  const grid = $grid.useGrid(props.mediaSize)
  const [gridCopyLabel, setGridCopyLabel] = React.useState({
    label: 'Select...',
    key: ''
  })

  const handleCopyGridClick = () => {
    if(!gridCopyLabel.key) return
    grid.copyGridFrom(gridCopyLabel.key)
    setGridCopyLabel({ label: 'Select...', key: '' })
  }

  return (
    <>
    <button onClick={() => setOpen(true)}>
      <FiSettings/>
    </button>
    {open && (
      <PluginModal 
        title='Grid-Settings'
        onClose={() => setOpen(false)}
        components={[]}
        extraArgs={props}
      >
        <ModalContent>
          <div className='row'>
            <div className='label'>
              Copy entire grid from selected media-size. Current grid will be removed
            </div>
            <Select
              value={gridCopyLabel}
              options={config.mediaSizes
                .filter(row => ms.data[row.key] && row.key !== props.mediaSize)
                .map(ms => ({
                  key: ms.key,
                  label: ms.label
                }))
              }
              onSelect={setGridCopyLabel}
            />
            <button onClick={handleCopyGridClick}>
              Copy
            </button>
          </div>

          <button className='clear' onClick={grid.clearGrid}>
            Clear Grid
          </button>
        </ModalContent>
      </PluginModal>
    )}
    </>
  )
}

const ModalContent = styled.div`
  > .row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > .label {
      flex: 1;
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      color: #555;
    }

    > .Select {
      width: 200px;
    }

    > button {
      width: 100px;
      height: 40px;
      margin-left: 10px;
      background: #8bc34a;
      border: none;
      color: white;
      font-family: 'Open Sans', sans-serif;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

  > .clear {
    width: 100%;
    height: 40px;
    margin-left: 10px;
    background: #8bc34a;
    border: none;
    color: white;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    margin-bottom: 20px;
  }
`