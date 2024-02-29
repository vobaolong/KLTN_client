import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './pages/Routes'
import { Provider } from 'react-redux'
import store from './store'
import './style.css'
import './responsive.css'
import ScrollToTop from 'react-scroll-to-top'
import arrowIcon from './assets/arrow.svg'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ScrollToTop
        title='Go to top'
        smooth
        color='#ffffff'
        style={{
          justifyContent: 'center',
          display: 'grid',
          alignContent: 'center',
          zIndex: 1000
        }}
      />
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
