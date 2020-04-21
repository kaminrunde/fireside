import * as React from 'react'
import {Router} from '@reach/router'
import Snackbar from 'widgets/Snackbar'
import {history} from './store'

import IndexRoute from 'routes/Index'


export default function App() {
  return (
    <div className="App">
      <Router history={history}>
        <IndexRoute path='/'/>
      </Router>
      <Snackbar/>
    </div>
  )
}
