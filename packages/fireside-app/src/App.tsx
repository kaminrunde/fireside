import * as React from 'react'
import config from 'config'

export default function App() {
  return (
    <div className="App">
      APP {config.foo}
    </div>
  )
}
