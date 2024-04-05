import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminStoresTable from '../../components/table/AdminStoresTable'
import { useTranslation } from 'react-i18next'

const StorePage = () => {
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)
  const { t } = useTranslation()

  return (
    <AdminLayout user={user}>
      <div className='mb-4 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`text-success nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i className='fa-solid fa-circle-check me-2'></i>
              <span className='res-hide'>{t('storeDetail.activeStores')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`text-danger nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i className='fa-solid fa-circle-xmark  me-2'></i>
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
