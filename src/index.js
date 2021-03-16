import React from 'react'
import ReactDOM from 'react-dom'
import Context from './Context'
import { App } from './routes/App'

const url = document.querySelector('#hfURL').value

ReactDOM.render(
  <Context.Provider urlWS={url}>
    <App />
  </Context.Provider>,
  document.getElementById('app')
)
