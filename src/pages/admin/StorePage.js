import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminStoresTable from '../../components/table/AdminStoresTable'
import { useTranslation } from 'react-i18next'

const StorePage = () => {
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.store'), url: '/admin/store' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <div className='mb-2 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i
                className={`${
                  flag ? 'fa-solid' : 'fa-light'
                } fa-circle-check me-2`}
              ></i>
              <span className='res-hide'>{t('storeDetail.activeStores')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i
                className={`${flag ? 'fa-light' : 'fa-solid'} fa-ban me-2`}
              ></i>
              <span className='res-hide'>{t('storeDetail.bannedStores')}</span>
            </span>
          </li>
        </ul>
      </div>
      <AdminStoresTable isActive={flag} />
    </AdminLayout>
  )
}

export default StorePage
