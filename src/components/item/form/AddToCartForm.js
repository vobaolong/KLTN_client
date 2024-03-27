import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { addToCart } from '../../../apis/cart'
import Loading from '../../ui/Loading'
import StyleValueSelector from '../../selector/StyleValueSelector'
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
    product.styleValueIds?.forEach((value) => {
      let flag = true
      defaultList.forEach((list) => {
        if (value.styleId._id === list[0].styleId._id) {
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

    const defaultStyleValues = defaultList.map((list) => list[0])
    const defaultStyleValueIds = defaultStyleValues
      .map((value) => value._id)
      .join('|')

    setCartItem({
      storeId: product.storeId && product.storeId._id,
      productId: product._id,
      styleValueIds: defaultStyleValueIds,
      defaultStyleValues: defaultStyleValues,
      count: 1
    })
  }, [product])

  const handleSet = (values) => {
    setCartItem({
      ...cartItem,
      styleValueIds: values.map((value) => value._id).join('|')
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
          toast.success(data.success)
        }
        setTimeout(() => {
          setCartItem({})
        }, 3000)
        setIsLoading(false)
      })
      .catch(() => {
        toast.error('Server Error')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      <form className='add-to-cart-form row'>
        <div className='col-12'>
          <StyleValueSelector
            listValues={product.styleValueIds}
            isEditable={true}
            defaultValue={cartItem.defaultStyleValues}
            onSet={(values) => handleSet(values)}
          />
        </div>
        <div
          className='col-md-12 d-grid mt-4'
          style={{ maxWidth: 'fit-content' }}
        >
          <button
            type='submit'
            className='btn add-to-cart-btn btn-outline-primary ripple btn-lg px-3 py-2 d-flex align-items-center justify-content-center add-to-cart'
            onClick={handleSubmit}
          >
            <i className='fas fa-cart-plus'></i>
            <span className='ms-2 fs-6'>{t('productDetail.addToCart')}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddToCartForm
