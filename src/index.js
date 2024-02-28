import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './pages/Routes'
import { Provider } from 'react-redux'
import store from './store'
import './style.css'
import './responsive.css'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
