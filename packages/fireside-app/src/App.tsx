import * as React from 'react'
import {Router} from '@reach/router'
import Snackbar from 'widgets/Snackbar'
import {history} from './store'
import Header from 'containers/Header'
import Sidebar from 'containers/Sidebar'
import Storybook from 'widgets/Storybook'

import IndexRoute from 'routes/Index'
import GridRoute from 'routes/Grid'
import Settings from 'routes/Settings'


export default function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <Router history={history}>
        <IndexRoute path='/'/>
        <GridRoute path='/grid/:mediaSize' mediaSize=''/>
        <Settings path='/settings' />
      </Router>
      <Snackbar/>
      <Storybook/>
    </div>
  )
}
