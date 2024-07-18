import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const AdminSideBar = ({ user = {} }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]

  return (
    <div
      className='sticky-sidebar d-flex flex-column flex-shrink-0 p-2 box-shadow bg-body rounded-1 res-account-sidebar
      '
    >
      <ul className='nav nav-pills flex-column mb-auto justify-content-around gap-1'>
        <li className='nav-item'>
          <Link
            to={`/admin/dashboard`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'dashboard' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'dashboard' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-chart-line`}
            ></i>
            <span className='ms-3 res-hide-lg'>
              {t('admin.adDashboard.dashboard')}
            </span>
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
              className={`${
                path === 'user' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-user-group`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.users')}</span>
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
              className={`${
                path === 'store' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-store`}
            ></i>

            <span className='ms-3 res-hide-lg'>{t('admin.stores')}</span>
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
              className={`${
                path === 'order' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-receipt`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.orders')}</span>
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
              className={`${
                path === 'transaction' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-money-bill-transfer`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.transactions')}</span>
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
              className={`${
                path === 'category' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-list`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.categories')}</span>
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
              className={`${
                path === 'variant' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-palette`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.variants')}</span>
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
              className={`${
                path === 'product' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-box`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.products')}</span>
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
              className={`${
                path === 'level' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-shield-alt`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.levels')}</span>
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
              className={`${
                path === 'commission' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-percent`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.commissions')}</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/report`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'report' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'report' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-triangle-exclamation`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.reports')}</span>
          </Link>
        </li>
        {/*  */}
        <li className='nav-item'>
          <Link
            to={`/admin/review`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'review' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'review' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-comment`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.reviews')}</span>
          </Link>
        </li>
        {/*  */}
        <li className='nav-item'>
          <Link
            to={`/admin/brand`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'brand' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'brand' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-font-awesome`}
            ></i>
            <span className='ms-3 res-hide-lg'>{t('admin.brands')}</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminSideBar
