import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getToken, signout } from '../../../apis/auth'
import Logo from './Logo'
import SearchBar from './SearchBar'
import SigninItem from '../../item/SigninItem'
import AccountInit from '../../init/AccountInit'
import VendorInit from '../../init/VendorInit'
import UserSmallCard from '../../card/UserSmallCard'
import StoreSmallCard from '../../card/StoreSmallCard'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import Language from '../../ui/Language'

const MainNav = ({ navFor = 'user' }) => {
  const { t } = useTranslation()
  const { cartCount } = useSelector((state) => state.account.user)
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)

  const [isConfirming, setIsConfirming] = useState(false)
  const history = useHistory()
  const { refreshToken } = getToken()

  const handleSignout = () => {
    setIsConfirming(true)
  }

  const onSignoutSubmit = () => {
    signout(refreshToken, () => {
      history.go(0)
    })
  }

  return (
    <header className='d-flex flex-column align-items-center justify-content-center main-nav cus-nav navbar fixed-top navbar-expand-md navbar-dark bg-primary'>
      {isConfirming && (
        <ConfirmDialog
          title='Đăng Xuất'
          color='danger'
          onSubmit={onSignoutSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div className='container-md'>
        <Link
          className='navbar-brand cus-navbar-brand me-4 ripple res-hide-md'
          to='/'
        >
          <Logo />
        </Link>

        {navFor === 'user' && <SearchBar />}
        {navFor !== 'user' && (
          <h1 className='logo text-white m-0'>
            {navFor} <span className='res-hide'>dashboard</span>
          </h1>
        )}
        <Language />
        {!getToken() ? (
          <ul className='nav cus-sub-nav ms-2' style={{ minWidth: 'unset' }}>
            <li className='nav-item'>
              <SigninItem />
            </li>
          </ul>
        ) : (
          <>
            <ul className='nav cus-sub-nav ms-4 d-flex justify-content-end res-hide-md'>
              <li className='nav-item'>
                <AccountInit />
              </li>

              {navFor === 'vendor' && (
                <li className='nav-item'>
                  <VendorInit />
                </li>
              )}

              {navFor === 'user' && (
                <li className='nav-item position-relative'>
                  <Link
                    className='btn btn-outline-light cus-outline ripple cus-tooltip'
                    to='/account/following'
                  >
                    <i className='fas fa-heart'></i>
                  </Link>
                  <small className='cus-tooltip-msg'>{t('favorite')}</small>
                </li>
              )}

              {navFor === 'user' && getToken().role === 'user' && (
                <li className='nav-item position-relative'>
                  <Link
                    className='btn btn-outline-light cus-outline ripple cus-tooltip'
                    to='/account/storeManager'
                  >
                    <i className='fas fa-store'></i>
                  </Link>
                  <small className='cus-tooltip-msg text-capitalize'>
                    {t('manageShop')}
                  </small>
                </li>
              )}

              {navFor === 'user' && getToken().role === 'user' && (
                <li className='nav-item'>
                  <div className='cart-item-wrap position-relative'>
                    <Link
                      className='btn btn-outline-light cus-outline ripple cus-tooltip'
                      to='/cart'
                    >
                      <i className='fas fa-bag-shopping'></i>
                    </Link>
                    {
                      <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary cus-tooltip'>
                        {cartCount < 100 ? cartCount : '99+'}
                        <span className='visually-hidden'>products</span>
                      </span>
                    }
                    <small className='cus-tooltip-msg'>{t('cart')}</small>
                  </div>
                </li>
              )}

              {navFor === 'user' && getToken().role === 'admin' && (
                <li className='nav-item position-relative'>
                  <Link
                    className='btn btn-outline-light cus-outline ripple cus-tooltip'
                    to='/admin/dashboard'
                  >
                    <i className='fas fa-user-tie'></i>
                  </Link>
                  <small className='cus-tooltip-msg'>Dashboard</small>
                </li>
              )}

              {/* {navFor !== 'user' && (
                <li className='nav-item position-relative'>
                  <Link
                    className='btn btn-outline-light cus-outline ripple cus-tooltip'
                    to='/'
                  >
                    <i className='fas fa-home'></i>
                  </Link>
                  <small className='cus-tooltip-msg'>Quay lại trang chủ</small>
                </li>
              )} */}
            </ul>

            <button
              className='btn btn-outline-light cus-outline ripple mx-2 d-none res-dis-md'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasNavbarMainNav'
              aria-controls='offcanvasNavbarMainNav'
            >
              <i className='fas fa-bars'></i>
            </button>

            <div
              className='offcanvas offcanvas-end d-none res-dis-md'
              tabIndex='-1'
              id='offcanvasNavbarMainNav'
              aria-labelledby='offcanvasNavbarMainNavLabel'
              style={{ flexGrow: 'unset', width: '40%' }}
            >
              <div className='offcanvas-header bg-primary'>
                <h5
                  className='offcanvas-title me-5'
                  id='offcanvasNavbarMainNavLabel'
                >
                  <Link className='text-decoration-none' to='/'>
                    <Logo />
                  </Link>
                </h5>
                <button
                  type='button'
                  className='btn-close btn-close-white text-reset'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'
                ></button>
              </div>

              <div className='offcanvas-body'>
                <UserSmallCard user={user} link='/account/profile' />

                {navFor === 'vendor' && (
                  <div className='mt-2'>
                    <StoreSmallCard
                      store={store}
                      link={`/vendor/${store._id}`}
                    />
                  </div>
                )}

                <ul className='navbar-nav justify-content-end flex-grow-1 mt-3'>
                  <li className='nav-item p-2'>
                    <Link className='link-hover link-dark d-block' to='/'>
                      <i className='fas fa-home me-2'></i>
                      {t('home')}
                    </Link>
                  </li>

                  {navFor === 'user' && (
                    <li className='nav-item p-2'>
                      <Link
                        className='link-hover link-dark d-block'
                        to='/account/following'
                      >
                        <i className='fas fa-heart me-2'></i>
                        {t('favorite')}
                      </Link>
                    </li>
                  )}

                  {getToken().role === 'user' && (
                    <li className='nav-item p-2'>
                      <Link
                        className='link-hover link-dark d-block'
                        to='/account/storeManager'
                      >
                        <i className='fas fa-store me-2'></i>
                        {t('manageShop')}
                      </Link>
                    </li>
                  )}

                  {navFor === 'user' && getToken().role === 'user' && (
                    <li className='nav-item p-2'>
                      <Link className='link-hover link-dark d-block' to='/cart'>
                        <i className='fas fa-bag-shopping me-2'></i>
                        {t('cart')}
                      </Link>
                    </li>
                  )}

                  {navFor === 'user' && getToken().role === 'admin' && (
                    <li className='nav-item p-2'>
                      <Link
                        className='link-hover link-dark d-block'
                        to='/admin/dashboard'
                      >
                        <i className='fas fa-user-tie me-2'></i>
                        Dashboard
                      </Link>
                    </li>
                  )}

                  <li
                    className='nav-item p-2 link-hover link-dark'
                    onClick={handleSignout}
                  >
                    <i className='fas fa-sign-out-alt me-2'></i>
                    {t('button.logout')}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default MainNav
