import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoSmall from '../../../assets/logoSmall.png'
import { useSelector } from 'react-redux'

const AdminSideBar = ({ user = {}, isCollapsed, onToggle }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]
  const admin = useSelector((state) => state.account.user)

  return (
    <div
      className='sticky-sidebar d-flex flex-column flex-shrink-0 p-2 box-shadow bg-body rounded-1 res-account-sidebar
      '
    >
      <div className='d-flex justify-content-center align-items-center py-2'>
        <span className='cus-sidebar-item--db d-flex align-items-end gap-1'>
          <img
            loading='lazy'
            src={logoSmall}
            style={{ width: '30px' }}
            alt=''
          />
          {!isCollapsed && (
            <span className='p-0 m-0 text-muted text-uppercase fw-bold res-hide'>
              {`${admin.firstName} ${admin.lastName}`}
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
      <hr />
      <ul
        className={`nav nav-pills flex-column mb-auto justify-content-around gap-1 ${
          isCollapsed ? 'text-center' : ''
        }`}
      >
        <li className='nav-item'>
          <Link
            to={`/admin/dashboard`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'dashboard' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'dashboard' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-chart-line`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>
                {t('admin.adDashboard.dashboard')}
              </span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/user`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'user' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'user' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-user-group`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.users')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/store`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'store' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'store' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-store`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.stores')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/order'
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'order' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'order' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-receipt`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.orders')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/transaction'
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'transaction' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'transaction' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-money-bill-transfer`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>
                {t('admin.transactions')}
              </span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/category`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'category' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'category' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-list`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.categories')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/variant`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'variant' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'variant' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-palette`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.variants')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/product`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'product' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'product' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-box`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.products')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/level`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'level' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'level' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-shield-alt`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.levels')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/commission`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'commission' ? 'active' : ''
            }`}
          >
            <i
              className={`${path === 'commission' ? 'fa-solid' : 'fa-light'} ${
                !isCollapsed ? 'w-10' : ''
              } text-center fa-percent`}
            ></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.commissions')}</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminSideBar
