import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import DumpingGroundComponent from './components/dumping-ground/dumping-ground';

export default () => {
  return (
    <HashRouter hashType='noslash'>
      <Switch>
        <Route exact path='/' component={DumpingGroundComponent} />
        <Route exact path='/dump' component={DumpingGroundComponent} />
        <Route component={() => <h1>204 No Content</h1>} />
      </Switch>
    </HashRouter>
  )
}
