import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Avatar from '../../image/Avatar'

const AccountSideBar = ({ user = {}, isCollapsed, onToggle }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]
  return (
    <>
      {user.role === 'user' && (
        <div className='sticky-sidebar d-flex flex-column flex-shrink-0 p-2 box-shadow bg-body rounded-1 res-account-sidebar mt-md-4 mt-sm-0'>
          <ul className='nav nav-pills flex-column mb-auto justify-content-around gap-1'>
            <div className='res-hide-lg text-wrap d-flex gap-2 align-items-center'>
              <Avatar name=' ' avatar={user.avatar} size='small' />
              <div>
                <small className='fw-light'>Tài khoản của</small>
                <p>{user.firstName + ' ' + user.lastName}</p>
              </div>
            </div>

            <hr className='res-hide-lg my-2' />
            <li className='nav-item'>
              <Link
                to='/account/profile'
                className={`nav-link cus-sidebar-item ripple link-dark ${
                  path === 'profile' ? 'active' : ''
                }`}
              >
                <i
                  className={`${
                    path === 'profile' ? 'fa-solid' : 'fa-light'
                  } text-start fa-user`}
                ></i>
                <span className='ms-2 res-hide-xl'>
                  {t('userDetail.myAccount')}
                </span>
                <span className='ms-2 d-none res-dis-inline-xl res-hide-lg'>
                  {t('userDetail.myAccount')}
                </span>
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/account/purchase'
                className={`nav-link cus-sidebar-item ripple link-dark ${
                  path === 'purchase' ? 'active' : ''
                }`}
              >
                <i
                  className={`${
                    path === 'purchase' ? 'fa-solid' : 'fa-light'
                  } w-10 text-start fa-receipt`}
                ></i>
                <span className='ms-2 res-hide-xl'>
                  {t('userDetail.myPurchase')}
                </span>
                <span className='ms-2 d-none res-dis-inline-xl res-hide-lg'>
                  {t('userDetail.myPurchase')}
                </span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/account/addresses'
                className={`nav-link cus-sidebar-item ripple link-dark ${
                  path === 'addresses' ? 'active' : ''
                }`}
              >
                <i
                  className={`${
                    path === 'addresses' ? 'fa-solid' : 'fa-light'
                  } w-10 text-start fa-location-dot`}
                ></i>
                <span className='ms-2 res-hide-xl'>
                  {t('userDetail.address')}
                </span>
                <span className='ms-2 d-none res-dis-inline-xl res-hide-lg'>
                  {t('userDetail.address')}
                </span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/account/wallet'
                className={`nav-link cus-sidebar-item ripple link-dark ${
                  path === 'wallet' ? 'active' : ''
                }`}
              >
                <i
                  className={`${
                    path === 'wallet' ? 'fa-solid' : 'fa-light'
                  } w-10 text-start fa-wallet`}
                ></i>
                <span className='ms-2 res-hide-lg'>{t('wallet')}</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/account/store'
                className={`nav-link cus-sidebar-item ripple link-dark ${
                  path === 'store' ? 'active' : ''
                }`}
              >
                <i
                  className={`${
                    path === 'store' ? 'fa-solid' : 'fa-light'
                  } w-10 text-start fa-store`}
                ></i>
                <span className='ms-2 res-hide-xl'>{t('manageStore')}</span>
                <span className='ms-2 d-none res-dis-inline-xl res-hide-lg'>
                  {t('manageStore')}
                </span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/account/following'
                className={`nav-link cus-sidebar-item ripple link-dark ${
                  path === 'following' ? 'active' : ''
                }`}
              >
                <i
                  className={`${
                    path === 'following' ? 'fa-solid' : 'fa-light'
                  } w-10 text-start fa-heart`}
                ></i>
                <span className='ms-2 res-hide-lg'>{t('favorite')}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default AccountSideBar
