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
      <div className='d-flex align-items-center mb-2'>
        <div className='position-relative d-inline-block me-2'>
          <button
            type='button'
            className={`btn ${
              flag ? 'btn-primary' : 'btn-outline-primary'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(true)}
          >
            <i className='fas fa-user-friends'></i>
          </button>

          <small className='cus-tooltip-msg'>
            {t('staffDetail.staffList')}
          </small>
        </div>

        <div className='position-relative d-inline-block'>
          <button
            type='button'
            className={`btn ${
              !flag ? 'btn-primary' : 'btn-outline-primary'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(false)}
          >
            <i className='fas fa-user-shield'></i>
          </button>

          <small className='cus-tooltip-msg'>{t('staffDetail.owner')}</small>
        </div>
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
