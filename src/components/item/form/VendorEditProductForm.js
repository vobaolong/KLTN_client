/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { getProductByIdForManager } from '../../../apis/product'
import Loading from '../../ui/Loading'
import VendorEditProductProfileForm from './VendorEditProductProfileForm'
import VendorEditProductImagesForm from './VendorEditProductImagesForm'
import { toast } from 'react-toastify'

const VendorEditProductForm = ({ storeId = '', productId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [run, setRun] = useState(false)
  const [product, setProduct] = useState({})

  useEffect(() => {
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
  }, [productId, storeId, run])

  return (
    <div className='container-fluid position-relative'>
      {isLoading && <Loading />}
      <div className='row bg-body box-shadow rounded-2 p-3 mb-3'>
        <VendorEditProductImagesForm
          product={product}
          storeId={storeId}
          onRun={() => setRun(!run)}
        />
      </div>

      <div className='row mb-3'>
        <VendorEditProductProfileForm product={product} storeId={storeId} />
      </div>
    </div>
  )
}

export default VendorEditProductForm
