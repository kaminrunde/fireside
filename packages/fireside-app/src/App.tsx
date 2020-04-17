import * as React from 'react'
import {Router} from '@reach/router'
import Snackbar from 'widgets/Snackbar'

import IndexRoute from 'routes/Index'


export default function App() {
  return (
    <div className="App">
      <Router>
        <IndexRoute path='/'/>
      </Router>
      <Snackbar/>
    </div>
  )
}
