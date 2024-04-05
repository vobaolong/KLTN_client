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
    <header
      className={`d-flex flex-column align-items-center justify-content-center main-nav cus-nav navbar fixed-top navbar-expand-md navbar-dark ${
        getToken().role === 'admin'
          ? 'text-primary bg-primary'
          : 'bg-primary border-bottom'
      } `}
    >
      {isConfirming && (
        <ConfirmDialog
          title='Đăng Xuất'
          color='danger'
          onSubmit={onSignoutSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div
        className={`${
          navFor === 'vendor' || getToken().role === 'admin'
            ? 'container-xxl'
            : 'container-md'
        }`}
      >
        <Link className='me-4 res-hide-md' to='/'>
          <Logo />
        </Link>
        {navFor === 'user' && <SearchBar />}
        {navFor !== 'user' && (
          <h3 className='text-uppercase text-white m-0'>
            {navFor} <span className='res-hide'>dashboard</span>
          </h3>
        )}
        {!getToken() ? (
          <ul className='nav cus-sub-nav ms-2' style={{ minWidth: 'unset' }}>
            <li className='nav-item'>
              <Language />
            </li>
            <li className='nav-item'>
              <SigninItem />
            </li>
          </ul>
        ) : (
          <>
            <ul className='nav cus-sub-nav ms-4 d-flex justify-content-end res-hide-md'>
              <Language />
              <li className='nav-item ms-2'>
                <AccountInit />
              </li>
              {navFor === 'vendor' && (
                <li className='nav-item'>
                  <VendorInit />
                </li>
              )}
              {navFor === 'user' && getToken().role !== 'admin' && (
                <li className='nav-item position-relative'>
                  <Link
                    className='btn btn-outline-light cus-outline ripple cus-tooltip rounded-1'
                    to='/account/following'
                  >
                    <i className='fa-solid fa-heart'></i>
                  </Link>
                  <small className='cus-tooltip-msg'>{t('favorite')}</small>
                </li>
              )}
              {navFor === 'user' && getToken().role === 'user' && (
                <li className='nav-item'>
                  <div className='cart-item-wrap position-relative'>
                    <Link
                      className='btn btn-outline-light cus-outline ripple cus-tooltip rounded-1'
                      to='/cart'
                    >
                      <i className='fa-solid fa-bag-shopping'></i>
                    </Link>
                    {
                      <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cus-tooltip'>
                        {cartCount < 100 ? cartCount : '-'}
                      </span>
                    }
                    <small className='cus-tooltip-msg'>{t('cart')}</small>
                  </div>
                </li>
              )}
              {navFor === 'user' && getToken().role === 'admin' && (
                <li className='nav-item position-relative'>
                  <Link
                    className='btn btn-outline-light cus-outline ripple cus-tooltip rounded-1'
                    to='/admin/dashboard'
                  >
                    <i className='fa-solid fa-chart-pie'></i>
                  </Link>
                  <small className='cus-tooltip-msg'>
                    {t('admin.adDashboard.dashboard')}
                  </small>
                </li>
              )}
            </ul>

            <button
              className='btn btn-outline-light cus-outline ripple mx-2 d-none res-dis-md rounded-1'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasNavbarMainNav'
              aria-controls='offcanvasNavbarMainNav'
            >
              <i className='fa-solid fa-bars'></i>
            </button>

            <div
              className='offcanvas offcanvas-end d-none res-dis-md'
              tabIndex='-1'
              id='offcanvasNavbarMainNav'
              aria-labelledby='offcanvasNavbarMainNavLabel'
              style={{ flexGrow: 'unset', width: 'unset' }}
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
                      <i className='fa-solid fa-home me-2'></i>
                      {t('home')}
                    </Link>
                  </li>

                  {navFor === 'user' && getToken().role !== 'admin' && (
                    <li className='nav-item p-2'>
                      <Link
                        className='link-hover link-dark d-block'
                        to='/account/following'
                      >
                        <i className='fa-solid fa-heart me-2'></i>
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
                        <i className='fa-solid fa-store me-2'></i>
                        {t('manageStore')}
                      </Link>
                    </li>
                  )}

                  {navFor === 'user' && getToken().role === 'user' && (
                    <li className='nav-item p-2'>
                      <Link className='link-hover link-dark d-block' to='/cart'>
                        <i className='fa-solid fa-bag-shopping me-2'></i>
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
                        <i className='fa-solid fa-chart-pie me-2'></i>
                        {t('admin.adDashboard.dashboard')}
                      </Link>
                    </li>
                  )}

                  <li
                    className='nav-item p-2 link-hover link-dark'
                    onClick={handleSignout}
                  >
                    <i className='fa-solid fa-sign-out-alt me-2'></i>
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
