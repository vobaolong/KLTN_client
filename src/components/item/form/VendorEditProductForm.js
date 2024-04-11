/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { getProductByIdForManager } from '../../../apis/product'
import Loading from '../../ui/Loading'
import VendorEditProductProfileForm from './VendorEditProductProfileForm'
import VendorEditProductImagesForm from './VendorEditProductImagesForm'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const VendorEditProductForm = ({ storeId = '', productId = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [run, setRun] = useState(false)
  const [product, setProduct] = useState({})

  const init = () => {
    const { _id, accessToken } = getToken()
    setIsLoading(true)
    getProductByIdForManager(_id, accessToken, productId, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else setProduct(data.product)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [productId, storeId, run])

  return (
    <div className='bg-white rounded-2 container-fluid position-relative'>
      {isLoading && <Loading />}
      <div className='row bg-primary rounded-top-2 p-3 mb-3'>
        <h5 className='text-white m-0'>{t('productDetail.edit')}</h5>
      </div>
      <div className='mb-4'>
        <VendorEditProductImagesForm
          product={product}
          storeId={storeId}
          onRun={() => setRun(!run)}
        />
      </div>

      <div className='mb-4'>
        <VendorEditProductProfileForm product={product} storeId={storeId} />
      </div>

      <div className='pb-2 px-2'>
        <Link
          to={`/vendor/products/${storeId}`}
          className='text-decoration-none cus-link-hover'
        >
          <i className='fa-solid fa-angle-left'></i> {t('button.back')}
        </Link>
      </div>
    </div>
  )
}

export default VendorEditProductForm
