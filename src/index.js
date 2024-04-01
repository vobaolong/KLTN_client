import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import Routes from './pages/Routes'
import { Provider } from 'react-redux'
import store from './store'
import './style.css'
import './responsive.css'
import ScrollToTop from 'react-scroll-to-top'
import './i18n/i18n'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer
        position='bottom-left'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
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
      <Suspense
        fallback={
          <div className='loading-container'>
            <div className='loader'></div>
          </div>
        }
      >
        <Routes />
      </Suspense>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
