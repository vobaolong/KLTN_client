import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const AccountSideBar = ({ user = {} }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]
  return (
    <div className='sticky-sidebar d-flex flex-column flex-shrink-0 p-2 box-shadow bg-body rounded-1 res-account-sidebar'>
      <ul className='nav nav-pills flex-column mb-auto justify-content-around'>
        <li className='nav-item'>
          <Link
            to='/account/profile'
            className={`nav-link cus-sidebar-item ripple link-dark ${
              path === 'profile' ? 'active' : ''
            }`}
          >
            <i className='fa-solid fa-user-circle'></i>
            <span className='ms-3 res-hide-xl text-capitalize'>
              {t('userDetail.profile')}
            </span>
            <span className='ms-3 d-none res-dis-inline-xl res-hide-lg text-capitalize'>
              {t('userDetail.profile')}
            </span>
          </Link>
        </li>
        {user.role === 'user' && (
          <li className='nav-item'>
            <Link
              to='/account/purchase'
              className={`nav-link cus-sidebar-item ripple link-dark ${
                path === 'purchase' ? 'active' : ''
              }`}
            >
              <i className='fa-solid fa-bag-shopping'></i>
              <span className='ms-3 res-hide-xl text-capitalize'>
                {t('userDetail.myPurchase')}
              </span>
              <span className='ms-3 d-none res-dis-inline-xl res-hide-lg text-capitalize'>
                {t('userDetail.myPurchase')}
              </span>
            </Link>
          </li>
        )}
        {user.role === 'user' && (
          <li className='nav-item'>
            <Link
              to='/account/addresses'
              className={`nav-link cus-sidebar-item ripple link-dark ${
                path === 'addresses' ? 'active' : ''
              }`}
            >
              <i className='fa-solid fa-map-marker-alt'></i>
              <span className='ms-3 res-hide-xl text-capitalize'>
                {t('userDetail.address')}
              </span>
              <span className='ms-3 d-none res-dis-inline-xl res-hide-lg text-capitalize'>
                {t('userDetail.address')}
              </span>
            </Link>
          </li>
        )}
        {user.role === 'user' && (
          <li className='nav-item'>
            <Link
              to='/account/wallet'
              className={`nav-link cus-sidebar-item ripple link-dark ${
                path === 'wallet' ? 'active' : ''
              }`}
            >
              <i className='fa-solid fa-wallet'></i>
              <span className='ms-3 res-hide-lg'>{t('wallet')}</span>
            </Link>
          </li>
        )}
        {user.role === 'user' && (
          <li className='nav-item'>
            <Link
              to='/account/storeManager'
              className={`nav-link cus-sidebar-item ripple link-dark ${
                path === 'storeManager' ? 'active' : ''
              }`}
            >
              <i className='fa-solid fa-store'></i>
              <span className='ms-3 res-hide-xl text-capitalize'>
                {t('manageStore')}
              </span>
              <span className='ms-3 d-none res-dis-inline-xl res-hide-lg text-capitalize'>
                {t('manageStore')}
              </span>
            </Link>
          </li>
        )}
        {user.role === 'user' && (
          <li className='nav-item'>
            <Link
              to='/account/following'
              className={`nav-link cus-sidebar-item ripple link-dark ${
                path === 'following' ? 'active' : ''
              }`}
            >
              <i className='fa-solid fa-heart'></i>
              <span className='ms-3 res-hide-lg text-capitalize'>
                {t('favorite')}
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AccountSideBar
