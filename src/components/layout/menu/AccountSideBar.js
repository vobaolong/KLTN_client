import { Link, useLocation } from 'react-router-dom'
import Avatar from '../../image/Avatar'

const AccountSideBar = ({ user = {} }) => {
  const path = useLocation().pathname.split('/')[2]
  return (
    <div className='sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded res-account-sidebar'>
      <ul className='nav nav-pills flex-column mb-auto'>
        <div className='mx-auto mb-4 res-hide-lg'>
          <Avatar
            avatar={user.avatar}
            name={user.firstName + ' ' + user.lastName}
            alt={user.firstName + ' ' + user.lastName}
          />
        </div>

        <hr className='res-hide-lg' />

        <li className='nav-item'>
          <Link
            to='/account/profile'
            className={`nav-link cus-sidebar-item ripple link-dark ${
              path == 'profile' ? 'active' : ''
            }`}
          >
            <i className='fas fa-user-circle'></i>
            <span className='ms-3 res-hide-xl'>Tài Khoản Của Tôi</span>
            <span className='ms-3 d-none res-dis-inline-xl res-hide-lg'>
              Profile
            </span>
          </Link>
        </li>

        {user.role == 'user' && (
          <li className='nav-item'>
            <Link
              to='/account/purchase'
              className={`nav-link cus-sidebar-item ripple link-dark ${
                path == 'purchase' ? 'active' : ''
              }`}
            >
              <i className='fas fa-shopping-bag'></i>
              <span className='ms-3 res-hide-xl'>Đơn Mua</span>
              <span className='ms-3 d-none res-dis-inline-xl res-hide-lg'>
                Purchases
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
              <i className='fas fa-map-marker-alt'></i>
              <span className='ms-3 res-hide-xl'>Địa Chỉ</span>
              <span className='ms-3 d-none res-dis-inline-xl res-hide-lg'>
                Address
              </span>
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
              <i className='fas fa-store'></i>
              <span className='ms-3 res-hide-xl'>Quản Lý Cửa Hàng</span>
              <span className='ms-3 d-none res-dis-inline-xl res-hide-lg'>
                Stores
              </span>
            </Link>
          </li>
        )}

        <li className='nav-item'>
          <Link
            to='/account/following'
            className={`nav-link cus-sidebar-item ripple link-dark ${
              path === 'following' ? 'active' : ''
            }`}
          >
            <i className='fas fa-heart'></i>
            <span className='ms-3 res-hide-lg'>Yêu Thích</span>
          </Link>
        </li>

        {user.role == 'user' && (
          <li className='nav-item'>
            <Link
              to='/account/GDCoins'
              className={`nav-link cus-sidebar-item ripple link-dark ${
                path === 'GDCoins' ? 'active' : ''
              }`}
            >
              <i className='fas fa-coins'></i>
              <span className='ms-3 res-hide-lg'>Ví</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AccountSideBar
