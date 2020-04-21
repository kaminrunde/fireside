import * as React from 'react'
import {Router} from '@reach/router'
import Snackbar from 'widgets/Snackbar'
import {history} from './store'

import IndexRoute from 'routes/Index'
import GridRoute from 'routes/Grid'


export default function App() {
  return (
    <div className="App">
      <Router history={history}>
        <IndexRoute path='/'/>
        <GridRoute path='/grid/:mediaSize' mediaSize=''/>
      </Router>
      <Snackbar/>
    </div>
  )
}
