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
      <div className='row p-3 py-4 box-shadow rounded-1 bg-body'>
        {showProfile && <h5>{t('storeDetail.profile')}</h5>}
        <hr />
        <div className='col-12'>
          <p className='text-justify fs-9'>
            <i className='fa-solid fa-quote-right text-muted me-1'></i>
            <span className='text-dark-emphasis fw-bolder'>
              {t('storeDetail.bio')}
            </span>
            : {store.bio}
          </p>
          {showProfile && (
            <p className='text-justify mt-2 fs-9'>
              <i className='fa-solid fa-location-dot text-muted me-1'></i>
              <span className='text-dark-emphasis fw-bolder'>
                {t('storeDetail.address')}
              </span>{' '}
              : {store.address}
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
