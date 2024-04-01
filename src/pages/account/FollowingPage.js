import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AccountLayout from '../../components/layout/AccountLayout'
import FollowingProductsCollection from '../../components/collection/FollowingProductsCollection'
import FollowingStoresCollection from '../../components/collection/FollowingStoreCollection'
import { useTranslation } from 'react-i18next'

const FollowingPage = (props) => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)
  return (
    <AccountLayout user={user}>
      <div className='mb-4 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <span className='btn btn-md btn-primary me-2'>
                <i className='fas fa-box'></i>
              </span>
              <span className='res-hide'>{t('favProduct')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <span className='btn btn-md btn-danger me-2'>
                <i className='fas fa-store'></i>
              </span>
              <span className='res-hide'>{t('favStore')}</span>
            </span>
          </li>
        </ul>
      </div>

      {flag ? <FollowingProductsCollection /> : <FollowingStoresCollection />}
    </AccountLayout>
  )
}

export default FollowingPage
