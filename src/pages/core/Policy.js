import { Link } from 'react-router-dom'
import policy from '../../assets/policy'
import Logo from '../../components/layout/menu/Logo'

const Policy = () => {
  return (
    <>
      <header className='main-nav cus-nav navbar fixed-top navbar-expand-md navbar-dark bg-primary'>
        <div className='container-md d-flex justify-content-start text-white'>
          <Link
            className='navbar-brand cus-navbar-brand me-4 ripple res-hide-md'
            to='/'
          >
            <Logo />
          </Link>
          <h5 className='font-weight-light m-0 ms-2 border-start px-3'>
            Trung tâm trợ giúp Zenpii
          </h5>
        </div>
      </header>
      <div className='body container-fluid'>
        <h3 className='text-uppercase text-center'>Chính sách bảo mật</h3>

        <div className='text-justify mt-3'>
          <span>{policy.title}</span>
          <p>{policy.subTitle.mainTitle}</p>
        </div>
      </div>
    </>
  )
}
export default Policy
