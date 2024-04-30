import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateProduct } from '../../../apis/product'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import TextArea from '../../ui/TextArea'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import CategorySelector from '../../selector/CategorySelector'
import VariantSelector from '../../selector/VariantSelector'
import { t } from 'i18next'
import { toast } from 'react-toastify'

const VendorEditProductProfileForm = ({ product = {}, storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [newProduct, setNewProduct] = useState({})
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setNewProduct({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price?.$numberDecimal,
      salePrice: product.salePrice?.$numberDecimal,
      categoryId: product.categoryId?._id,
      defaultCategory: product.categoryId,
      variantValueIds: product.variantValueIds?.map((v) => v._id),
      defaultVariantValues: product.variantValueIds,
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
    if (newProduct.variantValueIds && newProduct.variantValueIds.length > 0)
      formData.set('variantValueIds', newProduct.variantValueIds.join('|'))
    setIsLoading(true)
    updateProduct(_id, accessToken, formData, product._id, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else toast.success(t('toastSuccess.product.edit'))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('productDetail.editProInfo')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <h5 className='fw-bold'>{t('productDetail.editProInfo')}</h5>
        </div>

        <div className='col-12 px-4'>
          <Input
            type='text'
            label={t('productDetail.name')}
            value={newProduct.name}
            isValid={newProduct.isValidName}
            feedback={t('productValid.validName')}
            required={true}
            validator='anything'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <TextArea
            type='text'
            label={t('productDetail.description')}
            value={newProduct.description}
            isValid={newProduct.isValidDescription}
            feedback='Please provide a valid product description.'
            required={true}
            validator='bio'
            onChange={(value) =>
              handleChange('description', 'isValidDescription', value)
            }
            onValidate={(flag) => handleValidate('isValidDescription', flag)}
          />
        </div>

        <div className='col-md-6 col-sm-12 px-4'>
          <Input
            type='number'
            label={`${t('productDetail.price')} (₫)`}
            value={newProduct.price}
            isValid={newProduct.isValidPrice}
            feedback='Please provide a valid product price.'
            required={true}
            validator='positive|zero'
            onChange={(value) => handleChange('price', 'isValidPrice', value)}
            onValidate={(flag) => handleValidate('isValidPrice', flag)}
          />
        </div>

        <div className='col-md-6 col-sm-12 px-4'>
          <Input
            type='number'
            label={`${t('productDetail.salePrice')} (₫)`}
            value={newProduct.salePrice}
            isValid={newProduct.isValidSalePrice}
            feedback='Please provide a valid product sale price.'
            required={true}
            validator='positive|zero'
            onChange={(value) =>
              handleChange('salePrice', 'isValidSalePrice', value)
            }
            onValidate={(flag) => handleValidate('isValidSalePrice', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <Input
            type='number'
            label={t('productDetail.quantity')}
            value={newProduct.quantity}
            isValid={newProduct.isValidQuantity}
            feedback='Please provide a valid product quantity.'
            required={true}
            validator='positive|zero'
            onChange={(value) =>
              handleChange('quantity', 'isValidQuantity', value)
            }
            onValidate={(flag) => handleValidate('isValidQuantity', flag)}
          />
        </div>

        <div className='col-12 mt-3 px-4'>
          <p className=''>
            {t('productDetail.chooseCategory')}
            <small className='text-danger'> *</small>
          </p>
          <CategorySelector
            label={t('productDetail.selectedCategory')}
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

        <div className='col-12 mt-3 px-4'>
          <p className='px-2'>
            {t('productDetail.chooseStyles')}{' '}
            <small className='text-muted'>
              {t('productDetail.chooseCateFirst')}
            </small>
          </p>
          <VariantSelector
            label='Chosen variants'
            defaultValue={newProduct.defaultVariantValues}
            categoryId={newProduct.categoryId}
            onSet={(variantValues) => {
              setNewProduct({
                ...newProduct,
                variantValueIds: variantValues.map((value) => value._id)
              })
            }}
          />
        </div>
        <div className='col-12 px-4 pb-3 d-flex justify-content-end align-items-center mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple res-w-100-md rounded-1'
            onClick={handleSubmit}
            style={{ width: '30%' }}
          >
            {t('button.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default VendorEditProductProfileForm
