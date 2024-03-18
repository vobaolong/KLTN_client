/* eslint-disable array-callback-return */
import { t } from 'i18next'
import Avatar from '../../image/Avatar'
import VendorAddProductImagesItem from '../../item/VendorAddProductImagesItem'

const VendorEditProductImagesForm = ({ product = {}, storeId = '', onRun }) => {
  return (
    <div className='position-relative'>
      <form
        className='border rounded-1 row'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='col-12 bg-primary rounded-top-1  p-3'>
          <h1 className='text-white fs-5 m-0'>
            {t('productDetail.editProImg')}
          </h1>
        </div>

        <div className='col-12 px-4 mt-4'>
          <p className='mb-1'>{t('productDetail.thumbImg')}</p>
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

        <div className='col-12 px-4 my-4 d-flex flex-wrap justify-content-start align-items-end'>
          {product.listImages?.map((img, index) => {
            if (index === 0) return
            return (
              <div key={index} className='d-inline-block me-3'>
                {index === 1 && (
                  <p className='mb-1'>{t('productDetail.otherImg')}</p>
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
