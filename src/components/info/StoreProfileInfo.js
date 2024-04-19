import { useTranslation } from 'react-i18next'
import StoreEditProfileItem from '../item/StoreEditProfileItem'

const StoreProfileInfo = ({
  store = {},
  isEditable = false,
  showProfile = false
}) => {
  const { t } = useTranslation()
  return (
    <div className='container-fluid'>
      <div className='row p-2 box-shadow rounded-1 bg-body'>
        {showProfile && <h5>{t('storeDetail.profile')}</h5>}
        <div className='col-12'>
          <p className='text-justify' style={{ fontSize: '0.9rem' }}>
            <i className='fa-solid fa-quote-left text-muted me-1'></i>
            {t('storeDetail.bio')}: {store.bio}
          </p>
          {showProfile && (
            <p className='text-justify mt-2' style={{ fontSize: '0.9rem' }}>
              <i className='fa-light fa-location-dot text-muted me-1'></i>
              {t('storeDetail.address')}: {store.address}
            </p>
          )}
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
