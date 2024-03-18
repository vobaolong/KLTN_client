import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import VendorAddProductImageForm from './form/VendorAddProductImageForm'

const VendorAddProductImagesItem = ({
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
          className='btn btn-primary ripple text-nowrap rounded-1'
          data-bs-toggle='modal'
          data-bs-target='#add-product-image-form'
        >
          <i className='fas fa-plus-circle'></i>
          <span className='res-hide ms-2'>{t('button.addImg')}</span>
        </button>

        {count < 8 && (
          <Modal
            id='add-product-image-form'
            hasCloseBtn={false}
            title='Add new product image'
          >
            <VendorAddProductImageForm
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

export default VendorAddProductImagesItem
