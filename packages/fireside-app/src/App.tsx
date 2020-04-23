import * as React from 'react'
import {Router} from '@reach/router'
import Snackbar from 'widgets/Snackbar'
import {history} from './store'
import Header from 'widgets/Header'

import IndexRoute from 'routes/Index'
import GridRoute from 'routes/Grid'


export default function App() {
  return (
    <div className="App">
      <Header/>
      <Router history={history}>
        <IndexRoute path='/'/>
        <GridRoute path='/grid/:mediaSize' mediaSize=''/>
      </Router>
      <Snackbar/>
    </div>
  )
}
