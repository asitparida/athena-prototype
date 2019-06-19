import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.scss'

import Main from './pages/main';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(Main)
