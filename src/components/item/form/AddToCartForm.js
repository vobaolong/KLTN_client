import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { addToCart } from '../../../apis/cart'
import Loading from '../../ui/Loading'
import VariantValueSelector from '../../selector/VariantValueSelector'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AddToCartForm = ({ product = {} }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [updateDispatch] = useUpdateDispatch()
  const [cartItem, setCartItem] = useState({})

  useEffect(() => {
    let defaultList = []
    product.variantValueIds?.forEach((value) => {
      let flag = true
      defaultList.forEach((list) => {
        if (value.variantId._id === list[0].variantId._id) {
          list.push(value)
          flag = false
        }

        list.sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        })
      })

      if (flag) defaultList.push([value])
    })

    const defaultVariantValues = defaultList.map((list) => list[0])
    const defaultVariantValueIds = defaultVariantValues
      .map((value) => value._id)
      .join('|')

    setCartItem({
      storeId: product.storeId && product.storeId._id,
      productId: product._id,
      variantValueIds: defaultVariantValueIds,
      defaultVariantValues: defaultVariantValues,
      count: 1
    })
  }, [product])

  const handleSet = (values) => {
    setCartItem({
      ...cartItem,
      variantValueIds: values.map((value) => value._id).join('|')
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }
  const onSubmit = () => {
    const { _id, accessToken } = getToken()
    setIsLoading(true)
    addToCart(_id, accessToken, cartItem)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          updateDispatch('account', data.user)
          toast.success(t('toastSuccess.cart.add'))
        }
        setTimeout(() => {
          setCartItem({})
        }, 3000)
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      <form className='row'>
        <div className='col-12'>
          <VariantValueSelector
            listValues={product.variantValueIds}
            isEditable={true}
            defaultValue={cartItem.defaultVariantValues}
            onSet={(values) => handleSet(values)}
          />
        </div>
        <div
          className='col-md-12 d-grid mt-2'
          style={{ maxWidth: 'fit-content' }}
        >
          <button
            type='submit'
            className='btn add-to-cart-btn btn-outline-primary ripple btn-lg px-3 py-2 d-flex align-items-center justify-content-center add-to-cart'
            onClick={handleSubmit}
          >
            <i className='fa-solid fa-cart-plus'></i>
            <span className='ms-2 fs-6'>{t('productDetail.addToCart')}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddToCartForm
