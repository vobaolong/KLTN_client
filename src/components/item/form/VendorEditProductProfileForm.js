import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateProduct } from '../../../apis/product'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import TextArea from '../../ui/TextArea'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import CategorySelector from '../../selector/CategorySelector'
import StyleSelector from '../../selector/StyleSelector'

const VendorEditProductProfileForm = ({ product = {}, storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [newProduct, setNewProduct] = useState({})

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setNewProduct({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price && product.price.$numberDecimal,
      salePrice: product.salePrice && product.salePrice.$numberDecimal,
      categoryId: product.categoryId && product.categoryId._id,
      defaultCategory: product.categoryId,
      styleValueIds:
        product.styleValueIds && product.styleValueIds.map((v) => v._id),
      defaultStyleValues: product.styleValueIds,
      isValidName: true,
      isValidDescription: true,
      isValidQuantity: true,
      isValidPrice: true,
      isValidSalePrice: true
    })
  }, [product, storeId])

  const handleChange = (name, isValidName, value) => {
    setNewProduct({
      ...newProduct,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewProduct({
      ...newProduct,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, description, quantity, price, salePrice, categoryId } =
      newProduct
    if (
      !name ||
      !description ||
      !quantity ||
      !price ||
      !salePrice ||
      !categoryId
    ) {
      setNewProduct({
        ...newProduct,
        isValidName: regexTest('anything', name),
        isValidDescription: regexTest('bio', description),
        isValidQuantity: numberTest('positive|zero', quantity),
        isValidPrice: numberTest('positive|zero', price),
        salePrice: numberTest('positive|zero', salePrice)
      })
      return
    }

    const {
      isValidName,
      isValidDescription,
      isValidQuantity,
      isValidPrice,
      isValidSalePrice
    } = newProduct
    if (
      !isValidName ||
      !isValidDescription ||
      !isValidQuantity ||
      !isValidPrice ||
      !isValidSalePrice
    )
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('name', newProduct.name)
    formData.set('description', newProduct.description)
    formData.set('quantity', newProduct.quantity)
    formData.set('price', newProduct.price)
    formData.set('salePrice', newProduct.salePrice)
    formData.set('categoryId', newProduct.categoryId)
    if (newProduct.styleValueIds && newProduct.styleValueIds.length > 0)
      formData.set('styleValueIds', newProduct.styleValueIds.join('|'))

    setError('')
    setSuccess('')
    setIsLoading(true)
    updateProduct(_id, accessToken, formData, product._id, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else setSuccess(data.success)
        setIsLoading(false)
        setTimeout(() => {
          setSuccess('')
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Sever error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Edit product information'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-3 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <h1 className='text-white fs-5 m-0'>Edit product information</h1>
        </div>

        <div className='col-12 px-4'>
          <Input
            type='text'
            label='Product name'
            value={newProduct.name}
            isValid={newProduct.isValidName}
            feedback='Please provide a valid product name.'
            validator='anything'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <TextArea
            type='text'
            label='Description'
            value={newProduct.description}
            isValid={newProduct.isValidDescription}
            feedback='Please provide a valid product description.'
            validator='bio'
            onChange={(value) =>
              handleChange('description', 'isValidDescription', value)
            }
            onValidate={(flag) => handleValidate('isValidDescription', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <Input
            type='number'
            label='Quantity'
            value={newProduct.quantity}
            isValid={newProduct.isValidQuantity}
            feedback='Please provide a valid product quantity.'
            validator='positive|zero'
            onChange={(value) =>
              handleChange('quantity', 'isValidQuantity', value)
            }
            onValidate={(flag) => handleValidate('isValidQuantity', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <Input
            type='number'
            label='Price (₫)'
            value={newProduct.price}
            isValid={newProduct.isValidPrice}
            feedback='Please provide a valid product price.'
            validator='positive|zero'
            onChange={(value) => handleChange('price', 'isValidPrice', value)}
            onValidate={(flag) => handleValidate('isValidPrice', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <Input
            type='number'
            label='Sale price (₫)'
            value={newProduct.salePrice}
            isValid={newProduct.isValidSalePrice}
            feedback='Please provide a valid product sale price.'
            validator='positive|zero'
            onChange={(value) =>
              handleChange('salePrice', 'isValidSalePrice', value)
            }
            onValidate={(flag) => handleValidate('isValidSalePrice', flag)}
          />
        </div>

        <div className='col-12 mt-5 px-4'>
          <p className=''>Choose category</p>
          <CategorySelector
            label='Chosen category'
            defaultValue={newProduct.defaultCategory}
            isActive={true}
            isRequired={true}
            onSet={(category) =>
              setNewProduct({
                ...newProduct,
                categoryId: category._id
              })
            }
          />
        </div>

        <div className='col-12 mt-5 px-4'>
          <p className='px-2'>
            Choose styles{' '}
            <small className='text-muted'>
              *need to choose category before
            </small>
          </p>
          <StyleSelector
            label='Chosen styles'
            defaultValue={newProduct.defaultStyleValues}
            categoryId={newProduct.categoryId}
            onSet={(styleValues) => {
              setNewProduct({
                ...newProduct,
                styleValueIds: styleValues.map((value) => value._id)
              })
            }}
          />
        </div>

        {error && (
          <div className='col-12 px-4'>
            <Error msg={error} />
          </div>
        )}

        {success && (
          <div className='col-12 px-4'>
            <Success msg={success} />
          </div>
        )}
        <div className='col-12 px-4 pb-3 d-flex justify-content-end align-items-center mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple res-w-100-md'
            onClick={handleSubmit}
            style={{ width: '40%' }}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  )
}

export default VendorEditProductProfileForm
