import { Link, useLocation } from 'react-router-dom'
import Avatar from '../../image/Avatar'
import ManagerRoleLabel from '../../label/ManagerRoleLabel'
import StoreActiveLabel from '../../label/StoreActiveLabel'
import { useTranslation } from 'react-i18next'

const VendorSideBar = ({ user = {}, store = {} }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]

  return (
    <div className='sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded-1 res-account-sidebar'>
      <ul className='nav nav-pills flex-column mb-auto'>
        <div className='position-relative mx-auto mb-4 res-hide-xl'>
          <Avatar
            avatar={store.avatar}
            name={
              <span className='d-inline-flex align-items-center'>
                {store.name}
                {/* <small className='ms-2'>
                  <ManagerRoleLabel
                    role={
                      store.ownerId && user._id === store.ownerId._id
                        ? 'owner'
                        : 'staff'
                    }
                    detail={false}
                  />
                </small>
                <small className='ms-1'>
                  <StoreActiveLabel isActive={store.isActive} detail={false} />
                </small> */}
              </span>
            }
            alt={store.name}
            hide={true}
          />

          <div className='manager-avatar-absolute'>
            <div className='cus-tooltip d-inline-block'>
              <Avatar
                avatar={user.avatar}
                alt={user.firstName + ' ' + user.lastName}
                size='small'
              />
            </div>
            <small className='cus-tooltip-msg'>
              Manager: {user.firstName + ' ' + user.lastName}
            </small>
          </div>
        </div>

        <hr className='res-hide-xl' />

        <li className='nav-item'>
          <Link
            to={`/vendor/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === store._id ? 'active' : ''
            }`}
            style={{ height: '48px' }}
          >
            <i className='fas fa-chart-pie'></i>
            <span className='ms-3 res-hide-xl'>
              {t('admin.adDashboard.dashboard')}
            </span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/profile/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'profile' ? 'active' : ''
            }`}
          >
            <i className='fas fa-store'></i>
            <span className='ms-3 res-hide-xl'>{t('storeDetail.profile')}</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/products/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'products' ? 'active' : ''
            }`}
          >
            <i className='fas fa-box'></i>
            <span className='ms-3 res-hide-xl'>
              {t('storeDetail.products')}
            </span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/staffs/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'staffs' ? 'active' : ''
            }`}
          >
            <i className='fas fa-user-friends'></i>
            <span className='ms-3 res-hide-xl'>{t('storeDetail.staffs')}</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/orders/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'orders' ? 'active' : ''
            }`}
          >
            <i className='fas fa-clipboard'></i>
            <span className='ms-3 res-hide-xl'>{t('storeDetail.orders')}</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/wallet/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'wallet' ? 'active' : ''
            }`}
          >
            <i class='fa-solid fa-wallet'></i>

            <span className='ms-3 res-hide-xl'>{t('wallet')}</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default VendorSideBar
