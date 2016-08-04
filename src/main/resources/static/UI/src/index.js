import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import createathonApp from './reducers'
import App from './components'

let store = createStore(createathonApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)