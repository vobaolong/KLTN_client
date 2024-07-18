import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SellerSideBar = ({ user = {}, store = {} }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]

  return (
    <div className='sticky-sidebar d-flex flex-column flex-shrink-0 p-2 box-shadow bg-body rounded-1 res-account-sidebar'>
      <ul className='nav nav-pills flex-column mb-auto justify-content-around gap-1'>
        <li className='nav-item'>
          <Link
            to={`/seller/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === store._id ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === store._id ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-chart-line`}
            ></i>
            <span className='ms-3 res-hide-xl'>
              {t('admin.adDashboard.overview')}
            </span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/seller/profile/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'profile' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'profile' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-store`}
            ></i>
            <span className='ms-3 res-hide-xl'>{t('storeDetail.profile')}</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/seller/products/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'products' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'products' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-box`}
            ></i>
            <span className='ms-3 res-hide-xl'>
              {t('storeDetail.products')}
            </span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/seller/staff/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'staff' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'staff' ? 'fa-solid' : 'fa-light'
              } w-10 text-center  fa-user-group`}
            ></i>
            <span className='ms-3 res-hide-xl'>{t('storeDetail.staff')}</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/seller/orders/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'orders' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'orders' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-receipt`}
            ></i>
            <span className='ms-3 res-hide-xl'>{t('storeDetail.orders')}</span>
          </Link>
        </li>

        <li className='nav-item w-100'>
          <Link
            to={`/seller/return/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'return' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'return' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-arrow-rotate-left`}
            ></i>
            <span className='ms-3 res-hide-xl'>
              {t('storeDetail.requestReturn')}
            </span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/seller/wallet/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'wallet' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'wallet' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-wallet`}
            ></i>
            <span className='ms-3 res-hide-xl'>{t('wallet')}</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to={`/seller/review/${store._id}`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'review' ? 'active' : ''
            }`}
          >
            <i
              className={`${
                path === 'review' ? 'fa-solid' : 'fa-light'
              } w-10 text-center fa-comment`}
            ></i>
            <span className='ms-3 res-hide-xl'>{t('review')}</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SellerSideBar
