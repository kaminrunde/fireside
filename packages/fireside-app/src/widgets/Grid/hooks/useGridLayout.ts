import * as React from 'react'

// demo
const WIDTHS = ['1fr', '1fr', '1fr', '1fr']
const HEIGHTS = ['auto']
const LAYOUT = [
  {i: 'a', x: 0, y: 0, w: 1, h: 1},
  {i: 'b', x: 1, y: 0, w: 1, h: 1},
  {i: 'c', x: 2, y: 0, w: 1, h: 1}
]

export default function useGridLayout () {
  const [widths, setWidths] = React.useState(WIDTHS)
  const [heights, setHeights] = React.useState(HEIGHTS)
  const [layout, setLayout] = React.useState(LAYOUT)


  const onChange = React.useCallback(layout => {
    console.log(layout)
    // setHeights(['auto', 'auto'])
    // setWidths(['1fr', '1fr', '1fr', '1fr', '1fr'])
  }, [])

  return { layout, heights, widths, onChange
  }
}