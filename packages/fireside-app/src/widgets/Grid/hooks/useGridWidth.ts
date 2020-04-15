import * as React from 'react'

export default function useGridWidth () {
  const [data, setGridWidth] = React.useState(500)
  const ref = React.useRef<HTMLDivElement|null>(null)
  
  React.useEffect(() => {
    if(!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setGridWidth(rect.width)
  }, [])

  return { data, ref }
}