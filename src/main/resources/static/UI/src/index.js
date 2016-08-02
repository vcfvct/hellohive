import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import createathonApp from './reducers/reducers'
import App from './components/App'

let store = createStore(createathonApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)