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
import { Link, useHistory } from 'react-router-dom'
import Error from '../../ui/Error'

const SellerEditProductProfileForm = ({ product = {}, storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmingBack, setIsConfirmingBack] = useState(false)
  const [isConfirmingUpdate, setIsConfirmingUpdate] = useState(false)
  const [newProduct, setNewProduct] = useState({})
  const { _id, accessToken } = getToken()
  const [isScrolled, setIsScrolled] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  useEffect(() => {
    const checkScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      setIsScrolled(!isBottom)
    }
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

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
  const handleBackClick = (e) => {
    e.preventDefault()
    setIsConfirmingBack(true)
  }

  const handleConfirmBack = () => {
    setIsConfirmingBack(false)
    history.push(`/seller/products/${storeId}`)
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
    if (parseFloat(salePrice) > parseFloat(price)) {
      setError(t('productValid.salePriceCannotBeGreaterThan'))
      return
    }
    setIsConfirmingUpdate(true)
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
    setError('')
    updateProduct(_id, accessToken, formData, product._id, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else toast.success(t('toastSuccess.product.edit'))
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Sever Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirmingBack && (
        <ConfirmDialog
          title={t('dialog.cancelUpdate')}
          onSubmit={handleConfirmBack}
          onClose={() => setIsConfirmingBack(false)}
        />
      )}
      {isConfirmingUpdate && (
        <ConfirmDialog
          title={t('productDetail.editProInfo')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirmingUpdate(false)}
        />
      )}

      <form className='mb-2' onSubmit={handleSubmit}>
        <div className='bg-body box-shadow rounded-2 p-3 row'>
          <div className='col-12'>
            <h5 className='fw-bold'>{t('productDetail.editProInfo')}</h5>
          </div>

          <div className='col-12'>
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

          <div className='col-12 mt-3'>
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

          <div className='col-12 mt-3'>
            <TextArea
              type='text'
              label={t('productDetail.description')}
              value={newProduct.description}
              isValid={newProduct.isValidDescription}
              feedback={t('productValid.validDescription')}
              required={true}
              validator='bio'
              onChange={(value) =>
                handleChange('description', 'isValidDescription', value)
              }
              onValidate={(flag) => handleValidate('isValidDescription', flag)}
            />
          </div>

          <div className='col-md-6 col-sm-12 px-4 mt-3'>
            <Input
              type='number'
              label={`${t('productDetail.price')} (₫)`}
              value={newProduct.price}
              isValid={newProduct.isValidPrice}
              feedback={t('productValid.priceValid')}
              required={true}
              validator='positive|zero'
              onChange={(value) => handleChange('price', 'isValidPrice', value)}
              onValidate={(flag) => handleValidate('isValidPrice', flag)}
            />
          </div>

          <div className='col-md-6 col-sm-12 px-4 mt-3'>
            <Input
              type='number'
              label={`${t('productDetail.salePrice')} (₫)`}
              value={newProduct.salePrice}
              isValid={newProduct.isValidSalePrice}
              feedback={t('productValid.salePriceValid')}
              required={true}
              validator='positive|zero'
              onChange={(value) =>
                handleChange('salePrice', 'isValidSalePrice', value)
              }
              onValidate={(flag) => handleValidate('isValidSalePrice', flag)}
            />
          </div>

          <div className='col-12 px-4 mt-3'>
            <Input
              type='number'
              label={t('productDetail.quantity')}
              value={newProduct.quantity}
              isValid={newProduct.isValidQuantity}
              feedback={t('productValid.quantityValid')}
              required={true}
              validator='positive|zero'
              onChange={(value) =>
                handleChange('quantity', 'isValidQuantity', value)
              }
              onValidate={(flag) => handleValidate('isValidQuantity', flag)}
            />
          </div>

          <div className='col-12 mt-3 px-4 mt-3'>
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
          {error && (
            <div className='col-12 px-4'>
              <Error msg={error} />
            </div>
          )}
        </div>
        <div
          className={`bg-body ${
            isScrolled ? 'shadow' : 'box-shadow'
          } rounded-1 row px-4 my-3 p-3`}
          style={{ position: 'sticky', bottom: '0' }}
        >
          <div className='d-flex justify-content-between align-items-center'>
            <Link
              to={`/seller/products/${storeId}`}
              className='text-decoration-none cus-link-hover'
              onClick={handleBackClick}
            >
              <i className='fa-solid fa-angle-left'></i> {t('button.back')}
            </Link>
            <button
              type='submit'
              className='btn btn-primary ripple res-w-100-md rounded-1'
              onClick={handleSubmit}
              style={{ maxWidth: '200px', width: '100%' }}
            >
              {t('button.save')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SellerEditProductProfileForm
