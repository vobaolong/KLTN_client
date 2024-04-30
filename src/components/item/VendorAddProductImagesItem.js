import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import VendorAddProductImageForm from './form/VendorAddProductImageForm'
import addImg from '../../assets/new.svg'

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
          <img style={{ width: '30px' }} src={addImg} alt='' />
          <span className='res-hide ms-2'>{t('button.addImg')}</span>
          <span>{` (${count}/7)`}</span>
        </button>
        {count < 8 && (
          <Modal
            id='add-product-image-form'
            hasCloseBtn={false}
            title={t('productDetail.addImg')}
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
