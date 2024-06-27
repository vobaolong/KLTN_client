import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import SellerAddProductImageForm from './form/SellerAddProductImageForm'

const SellerAddProductImagesItem = ({
  count = 8,
  productId = '',
  storeId = '',
  onRun
}) => {
  const { t } = useTranslation()

  return (
    <div className='position-relative d-inline-block'>
      <div className='cus-tooltip'>
        <button
          type='button'
          disabled={count >= 7 ? true : false}
          className='btn add-value-btn ripple text-nowrap rounded-1'
          data-bs-toggle='modal'
          data-bs-target='#add-product-image-form'
        >
          <small>
            <i className='fa-light fa-plus me-1'></i>
            {t('button.addImg')} {` (${count}/7)`}
          </small>
        </button>
        {count < 8 && (
          <Modal
            id='add-product-image-form'
            hasCloseBtn={false}
            title={t('productDetail.addImg')}
          >
            <SellerAddProductImageForm
              storeId={storeId}
              productId={productId}
              onRun={onRun}
            />
          </Modal>
        )}
      </div>
      {count >= 8 && (
        <small className='cus-tooltip-msg'>{t('productDetail.limitImg')}</small>
      )}
    </div>
  )
}

export default SellerAddProductImagesItem
