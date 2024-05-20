import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoSmall from '../../../assets/logoSmall.png'
import { useSelector } from 'react-redux'

const VendorSideBar = ({ user = {}, store = {}, isCollapsed, onToggle }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]
  const vendor = useSelector((state) => state.account.user)

  return (
    <div className='sticky-sidebar d-flex flex-column flex-shrink-0 p-2 box-shadow bg-body rounded-1 res-account-sidebar'>
      <div className='d-flex justify-content-center align-items-center res-hide pb-2'>
        <span className='cus-sidebar-item--db d-flex align-items-end gap-1'>
          <img
            loading='lazy'
            src={logoSmall}
            style={{ width: '30px' }}
            alt=''
          />
          {!isCollapsed && (
            <span className='p-0 m-0 text-dark-emphasis text-uppercase fw-bold'>
              {`${vendor.firstName} ${vendor.lastName}`}
            </span>
          )}
        </span>
        <span
          className='res-hide border-0 position-absolute pointer fs-5 rounded-circle'
          style={{ right: '-10px' }}
          onClick={onToggle}
        >
          <i
            className={`text-body-tertiary fs-5 fa-solid fa-circle-chevron-${
              isCollapsed ? 'right' : 'left'
            }`}
          ></i>
        </span>
      </div>
      <hr className='res-hide' />
      <ul
        className={`nav nav-pills flex-column mb-auto justify-content-around gap-1 ${
          isCollapsed ? 'text-center' : ''
        }`}
      >
        <li className='nav-item'>
          <Link
            to={`/vendor/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === store._id ? 'active' : ''
            }`}
          >
            <i
              className={`${path === store._id ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-chart-line`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-xl'>
                {t('admin.adDashboard.overview')}
              </span>
            )}
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/profile/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'profile' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'profile' ? 'fa-solid' : 'fa-light'}
							 ${!isCollapsed ? 'w-10' : ''} text-center fa-store`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-xl'>
                {t('storeDetail.profile')}
              </span>
            )}
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/products/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'products' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'products' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-box`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-xl'>
                {t('storeDetail.products')}
              </span>
            )}
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/staffs/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'staffs' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'staffs' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center  fa-user-group`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-xl'>
                {t('storeDetail.staffs')}
              </span>
            )}
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/orders/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'orders' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'orders' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-receipt`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-xl'>
                {t('storeDetail.orders')}
              </span>
            )}
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/vendor/wallet/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'wallet' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'wallet' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-wallet`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-xl'>{t('wallet')}</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default VendorSideBar
