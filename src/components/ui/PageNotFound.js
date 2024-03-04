import React from 'react'
import { Link } from 'react-router-dom'
import error from '../../assets/404.jpg'
import Logo from '../layout/menu/Logo'

const PageNotFound = () => {
  return (
    <>
      {/* <header className='main-nav cus-nav navbar fixed-top navbar-expand-md navbar-dark bg-primary'>
        <div className='container-md d-flex justify-content-start text-white'>
          <Link
            className='navbar-brand cus-navbar-brand me-4 ripple res-hide-md'
            to='/'
          >
            <Logo />
          </Link>
        </div>
      </header> */}
      <div className='container-md d-flex flex-column justify-content-center align-items-center'>
        <img className='position-relative' src={error} alt='' />
        <Link
          className='btn btn-outline-light cus-outline ripple cus-tooltip position-absolute back py-2 px-3 mt-5 rounded-md rounded text-center box-shadow text-white text-decoration-none bg-primary'
          to='/'
          title='Quay lại trang chủ'
        >
          <i class='fas fa-angle-left me-2'></i>
          Quay lại trang chủ
        </Link>
      </div>
    </>
  )
}

export default PageNotFound
