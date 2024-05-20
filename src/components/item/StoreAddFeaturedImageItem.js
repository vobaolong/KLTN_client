import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import StoreAddFeaturedImageForm from './form/StoreAddFeaturedImageForm'

const StoreAddFeaturedImageItem = ({ count = 6, storeId = '' }) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <div className='cus-tooltip'>
        <button
          type='button'
          disabled={count >= 6 ? true : false}
          className='btn btn-primary ripple text-nowrap rounded-1 btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#add-featured-image-form'
        >
          <i className='fa-light fa-plus'></i>
          <span className='ms-2 res-hide'>{t('button.addFeaturedImg')}</span>
        </button>

        {count < 6 && (
          <Modal
            id='add-featured-image-form'
            hasCloseBtn={false}
            title={t('storeDetail.addFeaturedImg')}
          >
            <StoreAddFeaturedImageForm storeId={storeId} />
          </Modal>
        )}
      </div>
      {count >= 6 && (
        <small className='cus-tooltip-msg'>
          {t('storeDetail.limitFeatured')}
        </small>
      )}
    </div>
  )
}
export default StoreAddFeaturedImageItem
