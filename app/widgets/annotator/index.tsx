import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './annotator.scss'
import Annotator from './annotator';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(Annotator);
