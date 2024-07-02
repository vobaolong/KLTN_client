import { useTranslation } from 'react-i18next'
import StoreEditProfileItem from '../item/StoreEditProfileItem'

const StoreProfileInfo = ({
  store = {},
  isEditable = false,
  showProfile = true
}) => {
  const { t } = useTranslation()

  return (
    <div className='container-fluid'>
      <div className='row p-3 py-4 box-shadow rounded-1 bg-body'>
        {showProfile && <h5>{t('storeDetail.profile')}</h5>}
        {showProfile && <hr />}
        <div className='col-12 d-flex flex-column justify-content-center gap-2'>
          {showProfile && (
            <p className='text-justify fs-9'>
              <i className='fa-solid fa-store text-muted me-1'></i>
              <span className='text-dark-emphasis fw-bolder'>
                {t('storeDetail.storeName')}
              </span>
              : {store.name}
            </p>
          )}
          <p className='text-justify fs-9'>
            <i className='fa-solid fa-quote-right text-muted me-1'></i>
            <span className='text-dark-emphasis fw-bolder'>
              {t('storeDetail.bio')}
            </span>
            : {store.bio}
          </p>
          {showProfile && (
            <p className='text-justify fs-9'>
              <i className='fa-solid fa-location-arrow text-muted me-1'></i>
              <span className='text-dark-emphasis fw-bolder'>
                {t('storeDetail.pickupAddress')}
              </span>
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
      {showProfile && (
        <div className='row mt-3 p-3 py-4 box-shadow rounded-1 bg-body'>
          <h5>{t('storeDetail.contractNPoint')}</h5>
          <hr />
          <div className='col-12 d-flex flex-column justify-content-center gap-2'>
            <p className='text-justify fs-9'>
              <i className='fa-solid fa-store text-muted me-1'></i>
              <span className='text-dark-emphasis fw-bolder'>
                {t('storeDetail.typeOfStall')}
              </span>
              : {store.commissionId?.name}
            </p>

            <p className='text-justify fs-9'>
              <i className='fa-solid fa-shield-halved text-muted me-1'></i>
              <span className='text-dark-emphasis fw-bolder'>
                {t('storeDetail.point')}
              </span>
              : {store.point}
            </p>

            <p className='text-justify fs-9'>
              <i className='fa-solid fa-location-dot text-muted me-1'></i>
              <span className='text-dark-emphasis fw-bolder'>
                {t('storeDetail.contactPerson')}
              </span>
              : {store.ownerId?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default StoreProfileInfo
