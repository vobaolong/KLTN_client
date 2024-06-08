/* eslint-disable array-callback-return */
import { t } from 'i18next'
import Avatar from '../../image/Avatar'
import SellerAddProductImagesItem from '../../item/SellerAddProductImagesItem'

const SellerEditProductImagesForm = ({ product = {}, storeId = '', onRun }) => {
  return (
    <div className='position-relative'>
      <form className='row' onSubmit={(e) => e.preventDefault()}>
        <div className='col-12'>
          <h5 className='fw-bold'>{t('productDetail.editProImg')}</h5>
        </div>
        <div className='col-12 px-4 my-3 d-flex flex-wrap justify-content-start align-items-end'>
          <div className='d-grid me-3'>
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
            <small className='mt-2 text-center'>
              {t('productDetail.thumbImg')}
            </small>
          </div>
          {product.listImages?.map((img, index) => {
            if (index === 0) return
            return (
              <div key={index} className='d-grid me-3'>
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
                {index >= 1 && (
                  <small className='mt-2 text-center'>{`${t(
                    'productDetail.img'
                  )} ${index}`}</small>
                )}
              </div>
            )
          })}

          <div className='mb-4'>
            <SellerAddProductImagesItem
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

export default SellerEditProductImagesForm
