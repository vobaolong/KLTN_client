import { useTranslation } from 'react-i18next'
import StoreEditProfileItem from '../item/StoreEditProfileItem'

const StoreProfileInfo = ({ store = {}, isEditable = false }) => {
  const { t } = useTranslation()
  return (
    <div className='container-fluid'>
      <div className='row py-2 border rounded-1'>
        <div className='col-12'>
          <p className='text-justify' style={{ fontSize: '0.9rem' }}>
            {t('storeDetail.bio')}: {store.bio}
          </p>
          {/* <p className='text-justify' style={{ fontSize: '0.9rem' }}>
          {store.address}
        </p> */}
        </div>
        {isEditable && (
          <div className='col-12 d-flex justify-content-end'>
            <StoreEditProfileItem store={store} />
          </div>
        )}
      </div>
    </div>
  )
}
export default StoreProfileInfo
