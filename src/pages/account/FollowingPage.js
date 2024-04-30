import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AccountLayout from '../../components/layout/AccountLayout'
import FollowingProductsCollection from '../../components/collection/FollowingProductsCollection'
import FollowingStoresCollection from '../../components/collection/FollowingStoreCollection'
import { useTranslation } from 'react-i18next'
import MetaData from '../../components/layout/meta/MetaData'

const FollowingPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.listFavorites'), url: '/account/following' }
  ]
  return (
    <AccountLayout user={user} paths={paths}>
      <MetaData title={`${t('helmet.listFavorites')} | Zenpii Việt Nam`} />
      <div className='mb-2 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i
                className={` ${flag ? 'fa-solid' : 'fa-light'} fa-box me-2`}
              ></i>
              <span className='res-hide'>{t('favProduct')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i
                className={` ${flag ? 'fa-light' : 'fa-solid'} fa-store me-2`}
              ></i>
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
