import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createProduct } from '../../../apis/product'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import InputFile from '../../ui/InputFile'
import TextArea from '../../ui/TextArea'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import CategorySelector from '../../selector/CategorySelector'
import VariantSelector from '../../selector/VariantSelector'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const VendorCreateProductForm = ({ storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    categoryId: '',
    image0: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    description: '',
    quantity: 0,
    price: 0,
    salePrice: 0,
    variantValueIds: '',
    isValidName: true,
    isValidImage0: true,
    isValidImage1: true,
    isValidImage2: true,
    isValidImage3: true,
    isValidImage4: true,
    isValidImage5: true,
    isValidImage6: true,
    isValidDescription: true,
    isValidQuantity: true,
    isValidPrice: true,
    isValidSalePrice: true
  })
  const { t } = useTranslation()
  const { _id, accessToken } = getToken()
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

    const {
      name,
      categoryId,
      image0,
      description,
      quantity,
      price,
      salePrice
    } = newProduct
    if (
      !name ||
      !categoryId ||
      !image0 ||
      !description ||
      !quantity ||
      !price ||
      !salePrice
    ) {
      setNewProduct({
        ...newProduct,
        isValidName: regexTest('anything', name),
        isValidImage0: !!image0,
        isValidDescription: regexTest('bio', description),
        isValidQuantity: numberTest('positive|zero', quantity),
        isValidPrice: numberTest('positive|zero', price),
        salePrice: numberTest('positive|zero', salePrice)
      })
      return
    }

    const {
      isValidName,
      isValidImage0,
      isValidDescription,
      isValidQuantity,
      isValidPrice,
      isValidSalePrice
    } = newProduct
    if (
      !isValidName ||
      !isValidImage0 ||
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
    formData.set('image0', newProduct.image0)
    formData.set('categoryId', newProduct.categoryId)
    if (newProduct.variantValueIds && newProduct.variantValueIds.length > 0)
      formData.set('variantValueIds', newProduct.variantValueIds.join('|'))
    if (newProduct.image1) formData.set('image1', newProduct.image1)
    if (newProduct.image2) formData.set('image2', newProduct.image2)
    if (newProduct.image3) formData.set('image3', newProduct.image3)
    if (newProduct.image4) formData.set('image4', newProduct.image4)
    if (newProduct.image5) formData.set('image5', newProduct.image5)
    if (newProduct.image6) formData.set('image6', newProduct.image6)

    setIsLoading(true)
    createProduct(_id, accessToken, formData, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.product.create'))
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='container-fluid'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('productDetail.createProduct')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border bg-body rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary rounded-top-1 px-4 py-3'>
          <h1 className='text-white fs-5 m-0'>
            {t('productDetail.createProduct')}
          </h1>
        </div>

        <div className='col-12 px-4'>
          <Input
            type='text'
            label={t('productDetail.name')}
            value={newProduct.name}
            isValid={newProduct.isValidName}
            feedback={t('productValid.nameValid')}
            validator='anything'
            required={true}
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <div className='d-flex flex-wrap justify-content-between align-items-center'>
            <InputFile
              label={t('productDetail.thumbImg')}
              size='avatar'
              noRadius={false}
              value={newProduct.image0}
              isValid={newProduct.isValidImage0}
              feedback={t('productValid.avatarValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('image0', 'isValidImage0', value)
              }
              onValidate={(flag) => handleValidate('isValidImage0', flag)}
            />
            <InputFile
              label={t('productDetail.otherImg')}
              size='avatar'
              noRadius={false}
              value={newProduct.image1}
              isValid={newProduct.isValidImage1}
              feedback={t('productValid.otherValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('image1', 'isValidImage1', value)
              }
              onValidate={(flag) => handleValidate('isValidImage1', flag)}
            />

            <InputFile
              label=''
              size='avatar'
              noRadius={false}
              value={newProduct.image2}
              isValid={newProduct.isValidImage2}
              feedback={t('productValid.otherValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('image2', 'isValidImage2', value)
              }
              onValidate={(flag) => handleValidate('isValidImage2', flag)}
            />

            <InputFile
              label=''
              size='avatar'
              noRadius={false}
              value={newProduct.image3}
              isValid={newProduct.isValidImage3}
              feedback={t('productValid.otherValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('image3', 'isValidImage3', value)
              }
              onValidate={(flag) => handleValidate('isValidImage3', flag)}
            />

            <InputFile
              label=''
              size='avatar'
              noRadius={false}
              value={newProduct.image4}
              isValid={newProduct.isValidImage4}
              feedback={t('productValid.otherValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('image4', 'isValidImage4', value)
              }
              onValidate={(flag) => handleValidate('isValidImage4', flag)}
            />

            <InputFile
              label=''
              size='avatar'
              noRadius={false}
              value={newProduct.image5}
              isValid={newProduct.isValidImage5}
              feedback={t('productValid.otherValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('image5', 'isValidImage5', value)
              }
              onValidate={(flag) => handleValidate('isValidImage5', flag)}
            />

            <InputFile
              label=''
              size='avatar'
              noRadius={false}
              value={newProduct.image6}
              isValid={newProduct.isValidImage6}
              feedback={t('productValid.otherValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('image6', 'isValidImage6', value)
              }
              onValidate={(flag) => handleValidate('isValidImage6', flag)}
            />
          </div>
        </div>

        <div className='col-12 px-4'>
          <TextArea
            type='text'
            label={t('productDetail.description')}
            value={newProduct.description}
            isValid={newProduct.isValidDescription}
            required={true}
            feedback={t('productValid.descriptionValid')}
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
            feedback={t('productValid.priceValid')}
            validator='positive|zero'
            required={true}
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
            feedback={t('productValid.salePriceValid')}
            validator='positive|zero'
            required={true}
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
            feedback={t('productValid.quantityValid')}
            required={true}
            validator='positive|zero'
            onChange={(value) =>
              handleChange('quantity', 'isValidQuantity', value)
            }
            onValidate={(flag) => handleValidate('isValidQuantity', flag)}
          />
        </div>

        <div className='col-12 mt-5 px-4'>
          <p className=''>
            {t('productDetail.chooseCategory')}{' '}
            <span className='text-danger'>*</span>{' '}
          </p>
          <CategorySelector
            label={t('productDetail.selectedCategory')}
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
          <span className='px-2'>
            {t('productDetail.chooseStyles')}{' '}
            <small className='text-muted'>
              {t('productDetail.chooseCateFirst')}
            </small>
          </span>
          <VariantSelector
            label='Chosen variants'
            categoryId={newProduct.categoryId}
            onSet={(variantValues) => {
              setNewProduct({
                ...newProduct,
                variantValueIds: variantValues.map((value) => value._id)
              })
            }}
          />
        </div>

        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to={`/vendor/products/${storeId}`}
            className='text-decoration-none cus-link-hover res-w-100-md my-2'
          >
            <i className='fa-solid fa-angle-left'></i> {t('button.back')}
          </Link>
          <button
            type='submit'
            className='btn btn-primary ripple res-w-100-md rounded-1'
            onClick={handleSubmit}
            style={{ width: '300px', maxWidth: '100%' }}
          >
            {t('button.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default VendorCreateProductForm
