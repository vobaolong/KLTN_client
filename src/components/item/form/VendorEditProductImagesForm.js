/* eslint-disable array-callback-return */
import Avatar from '../../image/Avatar'
import VendorAddProductImagesItem from '../../item/VendorAddProductImagesItem'

const VendorEditProductImagesForm = ({ product = {}, storeId = '', onRun }) => {
  return (
    <div className='position-relative'>
      <form
        className='border border-primary rounded-3 row'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='col-12 bg-primary p-3'>
          <h1 className='text-white fs-5 m-0'>Edit product images</h1>
        </div>

        <div className='col-12 px-4 mt-4'>
          <p className='mb-1'>Product thumbnail</p>
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
          {product.listImages &&
            product.listImages.map((img, index) => {
              if (index === 0) return
              return (
                <div key={index} className='d-inline-block me-3'>
                  {index === 1 && <p className='mb-1'>Product other images</p>}
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
              count={product.listImages && product.listImages.length}
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
