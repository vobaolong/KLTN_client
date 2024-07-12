import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getToken, signout } from '../../../apis/auth'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Language from '../../ui/Language'
import SigninItem from '../../item/SigninItem'
import SellerInit from '../../init/SellerInit'
import AccountInit from '../../init/AccountInit'
import UserSmallCard from '../../card/UserSmallCard'
import ConfirmDialog from '../../ui/ConfirmDialog'
import StoreSmallCard from '../../card/StoreSmallCard'
import { useTranslation } from 'react-i18next'
import BellButton from './BellButton'

const MainNav = ({ navFor = 'user' }) => {
  const { t } = useTranslation()
  const { cartCount } = useSelector((state) => state.account.user)
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)
  const [isConfirming, setIsConfirming] = useState(false)
  const { refreshToken } = getToken()
  const history = useHistory()

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
      className={`d-flex flex-column align-items-center justify-content-center main-nav cus-nav navbar fixed-top navbar-expand-md navbar-dark box-shadow ${
        navFor !== 'user' ? 'bg-body text-dark' : 'bg-primary text-white'
      }`}
    >
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.logOut')}
          color='danger'
          onSubmit={onSignoutSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div
        className={`${
          navFor === 'seller' || getToken().role === 'admin'
            ? 'container-xxl'
            : 'container-md'
        }`}
      >
        <Link className='me-4 res-hide-md' to='/'>
          {navFor === 'user' ? (
            <Logo navFor={navFor} />
          ) : (
            <Logo width='150px' navFor={navFor} />
          )}
        </Link>

        {navFor === 'user' && <SearchBar />}

        {navFor !== 'user' && (
          <h2 className='text-uppercase m-0'>{navFor} dashboard</h2>
        )}
        <span className='res-dis-md d-none footer-links text-end'>
          <BellButton navFor={navFor} />
        </span>
        {!getToken() ? (
          <ul className='nav cus-sub-nav ms-1' style={{ minWidth: 'unset' }}>
            <li className='nav-item'>
              <Language />
            </li>
            <li className='nav-item'>
              <SigninItem title={t('button.signIn')} />
            </li>
          </ul>
        ) : (
          <div className='d-flex justify-content-end'>
            <ul className='nav cus-sub-nav d-flex justify-content-end res-hide-md gap-1'>
              <Language />
              <BellButton navFor={navFor} />
              {navFor === 'seller' && (
                <li className='nav-item'>
                  <SellerInit />
                </li>
              )}

              {navFor === 'user' && getToken().role === 'user' && (
                <li className='nav-item'>
                  <div className='cart-item-wrap position-relative'>
                    <Link
                      className='btn lang rounded-circle ripple cus-tooltip rounded-1 inherit'
                      to='/cart'
                    >
                      <i className='fa-solid fa-bag-shopping'></i>
                    </Link>
                    {cartCount > 0 && (
                      <span
                        style={{ top: '20%', left: '80%' }}
                        className='position-absolute translate-middle badge rounded-pill bg-danger'
                      >
                        {cartCount < 100 ? cartCount : '99+'}
                      </span>
                    )}
                    <small className='cus-tooltip-msg'>{t('cart')}</small>
                  </div>
                </li>
              )}
              {navFor === 'user' && getToken().role === 'admin' && (
                <li className='nav-item position-relative'>
                  <Link
                    className='btn lang rounded-circle ripple cus-tooltip rounded-1 inherit'
                    to='/admin/dashboard'
                  >
                    <i className='fa-light fa-chart-line'></i>
                  </Link>
                  <small className='cus-tooltip-msg'>
                    {t('admin.adDashboard.dashboard')}
                  </small>
                </li>
              )}
              <li className='nav-item ms-1'>
                <AccountInit />
              </li>
            </ul>

            <button
              className='btn btn-outline-light cus-outline ripple mx-2 d-none res-dis-md rounded-1'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasNavbarMainNav'
              aria-controls='offcanvasNavbarMainNav'
            >
              <i className='fa-light fa-bars'></i>
            </button>

            <div
              className='offcanvas offcanvas-end d-none res-dis-md'
              tabIndex='-1'
              id='offcanvasNavbarMainNav'
              aria-labelledby='offcanvasNavbarMainNavLabel'
              style={{ flexGrow: 'unset', width: 'unset' }}
            >
              <div className='offcanvas-header bg-primary-rgba'>
                <h5
                  className='offcanvas-title me-5'
                  id='offcanvasNavbarMainNavLabel'
                >
                  <Link className='text-decoration-none' to='/'>
                    <Logo width='120px' />
                  </Link>
                </h5>
                <button
                  type='button'
                  className='btn-close btn-close-black'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'
                ></button>
              </div>

              <div className='offcanvas-body'>
                <UserSmallCard user={user} link='/account/profile' />
                <hr />
                {navFor === 'seller' && (
                  <StoreSmallCard store={store} link={`/seller/${store._id}`} />
                )}

                <ul className='navbar-nav justify-content-end flex-grow-1 gap-2 mt-2'>
                  <li className='nav-item bg-value rounded-1 p-2'>
                    <Link className='link-hover link-dark d-block' to='/'>
                      <i className='text-primary fs-9 fa-light fa-home me-2'></i>
                      {t('home')}
                    </Link>
                  </li>

                  {getToken().role === 'user' && (
                    <li className='nav-item bg-value rounded-1 p-2'>
                      <Link
                        className='link-hover link-dark d-block'
                        to='/account/store'
                      >
                        <i className='text-primary fs-9 fa-light fa-store me-2'></i>
                        {t('myStore')}
                      </Link>
                    </li>
                  )}

                  {navFor === 'user' && getToken().role === 'user' && (
                    <li className='nav-item bg-value rounded-1 p-2 position-related'>
                      <Link
                        className='link-hover link-dark d-block '
                        to='/cart'
                      >
                        <i className='text-primary fs-9 fa-light fa-bag-shopping me-2'></i>
                        {t('cart')}
                        <sup className='ms-1 text-danger'>
                          ({cartCount > 0 ? cartCount : '0'})
                        </sup>
                      </Link>
                    </li>
                  )}

                  {navFor === 'user' && getToken().role === 'admin' && (
                    <li className='nav-item bg-value rounded-1 p-2'>
                      <Link
                        className='link-hover link-dark d-block'
                        to='/admin/dashboard'
                      >
                        <i className='text-primary fs-9 fa-light fa-chart-line me-2'></i>
                        {t('admin.adDashboard.dashboard')}
                      </Link>
                    </li>
                  )}
                  <hr className='my-1' />
                  <li
                    className='nav-item bg-value rounded-1 p-2 link-hover link-dark'
                    onClick={handleSignout}
                  >
                    <i className='text-primary fs-9 fa-light fa-sign-out-alt me-2'></i>
                    <span className='text-danger'>{t('button.logout')}</span>
                  </li>
                  <hr className='my-1' />
                  <Language vertical={false} />
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default MainNav
