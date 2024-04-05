import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import VendorLayout from '../../components/layout/VendorLayout'
import StoreOwnerTable from '../../components/table/StoreOwnerTable'
import StoreStaffsTable from '../../components/table/StoreStaffsTable'
import { useTranslation } from 'react-i18next'

const StaffsPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const [flag, toggleFlag] = useToggle(true)
  const { t } = useTranslation()
  return (
    <VendorLayout user={user} store={store}>
      <div className='mb-4 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i className='fa-solid fa-user-group me-2'></i>
              <span className='res-hide'>{t('staffDetail.staffList')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i className='fa-solid fa-user-shield me-2'></i>
              <span className='res-hide'>{t('staffDetail.owner')}</span>
            </span>
          </li>
        </ul>
      </div>
      {flag ? (
        <StoreStaffsTable
          heading={t('staffDetail.staffList')}
          staffIds={store.staffIds}
          ownerId={store.ownerId}
          storeId={store._id}
        />
      ) : (
        <StoreOwnerTable
          heading={t('staffDetail.owner')}
          ownerId={store.ownerId}
        />
      )}
    </VendorLayout>
  )
}

export default StaffsPage
