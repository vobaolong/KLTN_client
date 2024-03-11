import { Link, useLocation } from 'react-router-dom'
import Avatar from '../../image/Avatar'

const AdminSideBar = ({ user = {} }) => {
  const path = useLocation().pathname.split('/')[2]
  return (
    <div className='sticky-sidebar d-flex flex-column flex-shrink-0 p-2 shadow bg-body rounded res-account-sidebar'>
      <ul className='nav nav-pills flex-column mb-auto'>
        <div className='position-relative mx-auto mb-4 res-hide-xl d-none'>
          <Avatar
            avatar={user.avatar}
            name={user.firstName + ' ' + user.lastName}
            alt={user.firstName + ' ' + user.lastName}
          />
        </div>
        <hr className='res-hide-xl d-none' />
        <li className='nav-item'>
          <Link
            to={`/admin/dashboard`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'dashboard' ? 'active' : ''
            }`}
            style={{ height: '48px' }}
          >
            <i className='fas fa-chart-pie'></i>
            <span className='ms-3 res-hide-xl'>Dashboard</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/user`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'user' ? 'active' : ''
            }`}
          >
            <i className='fas fa-user-friends'></i>
            <span className='ms-3 res-hide-xl'>Users</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/store`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'store' ? 'active' : ''
            }`}
          >
            <i className='fas fa-store'></i>
            <span className='ms-3 res-hide-xl'>Stores</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/order'
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'order' ? 'active' : ''
            }`}
          >
            <i className='fas fa-clipboard'></i>
            <span className='ms-3 res-hide-xl'>Orders</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/transaction'
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'transaction' ? 'active' : ''
            }`}
            style={{ height: '48px', whiteSpace: 'nowrap' }}
          >
            <i className='fas fa-retweet'></i>
            <span className='ms-3 res-hide-xl'>Transaction</span>
            {/* <span className="ms-3 d-none res-dis-lg res-hide-xl">Trans</span> */}
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/category`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'category' ? 'active' : ''
            }`}
          >
            <i className='fas fa-boxes'></i>
            <span className='ms-3 res-hide-xl'>Category</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/style`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'style' ? 'active' : ''
            }`}
          >
            <i className='fab fa-black-tie'></i>
            <span className='ms-3 res-hide-xl'>Style</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/product`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'product' ? 'active' : ''
            }`}
          >
            <i className='fas fa-box'></i>
            <span className='ms-3 res-hide-xl'>Products</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/level`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'level' ? 'active' : ''
            }`}
          >
            <i className='fas fa-shield-alt'></i>
            <span className='ms-3 res-hide-xl'>Level</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/commission`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'commission' ? 'active' : ''
            }`}
            style={{ height: '48px', whiteSpace: 'nowrap' }}
          >
            <i className='fas fa-calculator'></i>
            <span className='ms-3 res-hide-xl'>Commission</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/delivery`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'delivery' ? 'active' : ''
            }`}
          >
            <i className='fas fa-truck'></i>
            <span className='ms-3 res-hide-xl'>Delivery</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/setting`}
            className={`nav-link cus-sidebar-item cus-sidebar-item--db ripple link-dark ${
              path === 'setting' ? 'active' : ''
            }`}
          >
            <i class='fa-solid fa-gear'></i>
            <span className='ms-3 res-hide-xl'>Setting</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminSideBar
