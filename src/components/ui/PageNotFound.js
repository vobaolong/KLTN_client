import React from 'react'
import { Link } from 'react-router-dom'
import error from '../../assets/404.jpg'

const PageNotFound = () => {
  return (
    <div className='container-md d-flex flex-column justify-content-center align-items-center'>
      <img loading='lazy' className='position-relative' src={error} alt='' />
      <Link
        className='btn btn-outline-light cus-outline ripple cus-tooltip position-absolute back py-2 px-3 mt-5 rounded-md rounded text-center box-shadow text-white text-decoration-none bg-primary'
        to='/'
        title='Quay lại trang chủ'
      >
        <i className='fa-solid fa-angle-left me-2'></i>
        Quay lại trang chủ
      </Link>
    </div>
  )
}

export default PageNotFound
