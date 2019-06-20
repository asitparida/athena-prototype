import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import './styles.scss'
import { Subject } from 'rxjs';

import Main from './pages/main';
import store from './access/store/configureStore';
import { toggleDumpBar } from './access/actions/appActions';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store} >
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

render(Main)
