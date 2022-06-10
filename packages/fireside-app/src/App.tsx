import * as React from 'react'
import {Router} from '@reach/router'
import Snackbar from 'widgets/Snackbar'
import {history} from './store'
import Header from 'containers/Header'
import Sidebar from 'containers/Sidebar'
import Modal from 'containers/Modal'
import EnforceFullscreen from 'containers/EnforceFullscreen'
import Storybook from 'widgets/Storybook'

import IndexRoute from 'routes/Index'
import GridRoute from 'routes/Grid'
import Settings from 'routes/Settings'
import AlertBox from 'widgets/AlertBox/AlertBox'
import StaticComponents from 'widgets/StaticComponents/StaticComponents'


export default function App() {
  return (
    <div className="App">
      <EnforceFullscreen/>
      <Header/>
      <Sidebar/>
      <Router history={history}>
        <IndexRoute path='/'/>
        <GridRoute path='/grid/:mediaSize' mediaSize=''/>
        <Settings path='/settings' />
      </Router>
      <Storybook/>
      <Snackbar/>
      <Modal/>
      <StaticComponents/>
      <AlertBox />
    </div>
  )
}
