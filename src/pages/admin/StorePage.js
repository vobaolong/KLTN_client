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
      <div className='mb-4'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <span className='btn btn-md btn-primary me-2'>
                <i className='fas fa-check-circle'></i>
              </span>
              <span className='res-hide'>{t('storeDetail.activeStores')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <span className='btn btn-md btn-danger me-2'>
                <i className='fa-solid fa-circle-xmark'></i>
              </span>
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
