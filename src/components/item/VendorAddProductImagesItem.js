import Modal from '../ui/Modal'
import VendorAddProductImageForm from './form/VendorAddProductImageForm'

const VendorAddProductImagesItem = ({
  count = 7,
  productId = '',
  storeId = '',
  onRun
}) => (
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
        <span className='res-hide ms-2'>Add image</span>
      </button>

      {count < 7 && (
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
    {count >= 8 && <small className='cus-tooltip-msg'>Limit is 7 images</small>}
  </div>
)

export default VendorAddProductImagesItem
