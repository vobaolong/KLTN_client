/* eslint-disable array-callback-return */
import { t } from 'i18next'
import Avatar from '../../image/Avatar'
import VendorAddProductImagesItem from '../../item/VendorAddProductImagesItem'

const VendorEditProductImagesForm = ({ product = {}, storeId = '', onRun }) => {
  return (
    <div className='position-relative'>
      <form className='row' onSubmit={(e) => e.preventDefault()}>
        <div className='col-12'>
          <h5 className='fw-bold'>{t('productDetail.editProImg')}</h5>
        </div>
        <div className='col-12 px-4 my-3 d-flex flex-wrap justify-content-start align-items-end'>
          <div className='me-3'>
            <p className='mb-1' style={{ fontSize: '0.9rem' }}>
              {t('productDetail.thumbImg')}
            </p>
            <Avatar
              avatar={product.listImages && product.listImages[0]}
              alt={product.name}
              storeId={storeId}
              productId={product._id}
              productIndex={0}
              isEditable='product'
              noRadius={true}
              onRun={onRun}
            />
          </div>
          {product.listImages?.map((img, index) => {
            if (index === 0) return
            return (
              <div key={index} className='d-inline-block me-3'>
                {index === 1 && (
                  <p className='mb-1' style={{ fontSize: '0.9rem' }}>
                    {t('productDetail.otherImg')}
                  </p>
                )}
                <Avatar
                  avatar={img}
                  alt={product.name}
                  storeId={storeId}
                  productId={product._id}
                  productIndex={index}
                  isEditable='product'
                  noRadius={true}
                  onRun={onRun}
                />
              </div>
            )
          })}

          <div className='my-2'>
            <VendorAddProductImagesItem
              count={product.listImages?.length}
              productId={product._id}
              storeId={storeId}
              onRun={onRun}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default VendorEditProductImagesForm
