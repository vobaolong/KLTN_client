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
      <div className='d-flex justify-content-center align-items-center res-hide-lg border-bottom pb-2'>
        <span className='cus-sidebar-item--db d-flex align-items-end gap-1'>
          <img
            loading='lazy'
            src={logoSmall}
            style={{ width: '30px' }}
            alt=''
          />
          {!isCollapsed && (
            <span className='p-0 m-0 text-muted text-uppercase fw-bold'>
              {`${admin.firstName} ${admin.lastName}`}
            </span>
          )}
        </span>
        <button
          className='res-hide border-0 position-absolute bg-transparent'
          style={{ right: '-10px' }}
          onClick={onToggle}
        >
          <i
            class={`text-muted fs-5 fa-solid fa-circle-chevron-${
              isCollapsed ? 'right' : 'left'
            }`}
          ></i>
        </button>
      </div>
      <ul
        className={`pt-2 nav nav-pills flex-column mb-auto justify-content-around ${
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
            <i className='fa-solid fa-chart-pie'></i>
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
            <i className='fa-solid fa-user-group'></i>
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
            <i className='fa-solid fa-store'></i>
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
            <i className='fa-solid fa-clipboard'></i>
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
            <i className='fa-solid fa-retweet'></i>
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
            <i className='fa-solid fa-list'></i>
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
            <i className='fa-solid fa-palette'></i>
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
            <i className='fa-solid fa-box'></i>
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
            <i className='fa-solid fa-shield-alt'></i>
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
            <i className='fa-solid fa-calculator'></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.commissions')}</span>
            )}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/delivery`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'delivery' ? 'active' : ''
            }`}
          >
            <i className='fa-solid fa-truck'></i>
            {!isCollapsed && (
              <span className='ms-3 res-hide-lg'>{t('admin.deliveries')}</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminSideBar
