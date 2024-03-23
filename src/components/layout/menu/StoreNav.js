import { Link, useLocation } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import StoreSearchBar from './StoreSearchBar'
import StoreInit from '../../init/StoreInit'
import FollowStoreButton from '../../button/FollowStoreButton'
import StoreSmallCard from '../../card/StoreSmallCard'
import { useTranslation } from 'react-i18next'

const IMG = process.env.REACT_APP_STATIC_URL

const StoreNav = ({ store = {} }) => {
  const { t } = useTranslation()
  const path = useLocation().pathname.split('/')[2]
  const [updateDispatch] = useUpdateDispatch()

  const onHandleRun = (newStore) => {
    updateDispatch('store', newStore)
  }

  return (
    <nav
      className='store-nav navbar sticky-top-nav navbar-expand-md navbar-light bg-body shadow-sticky rounded-bottom'
      style={{ margin: '0 auto' }}
    >
      <div className='container-fluid res-d-flex-end-lg'>
        <Link className='navbar-brand res-hide-md' to={`/store/${store._id}`}>
          <StoreInit />
        </Link>

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0 gap-2'>
            <li className='nav-item'>
              <Link
                className={`rounded-1 hover nav-link ${
                  path === 'collection' ? 'active link-active' : ''
                }`}
                to={`/store/collection/${store._id}`}
              >
                {t('storeDetail.allProduct')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`rounded-1 nav-link hover ${
                  path === 'review&rating' ? 'active link-active' : ''
                }`}
                to={`/store/review&rating/${store._id}`}
              >
                <span className='res-hide-lg'>{t('storeDetail.rating')}</span>
                <span className='d-none res-dis-lg'>Review</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`rounded-1 hover nav-link ${
                  path === 'about' ? 'active link-active' : ''
                }`}
                to={`/store/about/${store._id}`}
              >
                {t('storeDetail.about')}
              </Link>
            </li>
          </ul>
        </div>

        <div className='d-inline-block res-searchbar-md'>
          <StoreSearchBar storeId={store._id} />
        </div>

        {getToken() && (
          <div className='d-inline-block ms-2'>
            <FollowStoreButton
              storeId={store._id}
              isFavorite={store.isFavorite}
              onRun={(store) => onHandleRun(store)}
            />
          </div>
        )}

        <button
          className='btn btn-outline-light cus-outline ripple ms-2 d-none res-dis-md'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasNavbarStoreNav'
          aria-controls='offcanvasNavbarStoreNav'
        >
          <i className='fas fa-bars'></i>
        </button>

        <div
          className='offcanvas offcanvas-end d-none res-dis-md'
          tabIndex='-1'
          id='offcanvasNavbarStoreNav'
          aria-labelledby='offcanvasNavbarStoreNavLabel'
          style={{
            flexGrow: 'unset',
            width: 'unset',
            marginTop: 'var(--header-height)'
          }}
        >
          <div className='offcanvas-header border-bottom'>
            <h5
              className='offcanvas-title me-5'
              id='offcanvasNavbarStoreNavLabel'
            >
              <StoreSmallCard store={store} link={`/store/${store._id}`} />
            </h5>
            <button
              type='button'
              className='btn-close text-reset'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>

          <div className='offcanvas-body'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${path === store._id ? 'active' : ''}`}
                  to={`/store/${store._id}`}
                >
                  Store
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    path === 'collection' ? 'active' : ''
                  }`}
                  to={`/store/collection/${store._id}`}
                >
                  All Product
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    path === 'review&rating' ? 'active' : ''
                  }`}
                  to={`/store/review&rating/${store._id}`}
                >
                  Rating
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${path === 'about' ? 'active' : ''}`}
                  to={`/store/about/${store._id}`}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default StoreNav
