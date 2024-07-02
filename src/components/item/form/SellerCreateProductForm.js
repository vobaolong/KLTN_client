import { useEffect, useState } from 'react'
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
import Error from '../../ui/Error'

const SellerCreateProductForm = ({ storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [error, setError] = useState('')
  const [isConfirmingBack, setIsConfirmingBack] = useState(false)
  const [isConfirmingCreate, setIsConfirmingCreate] = useState(false)
  const { t } = useTranslation()
  const { _id, accessToken } = getToken()
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

  const handleBackClick = (e) => {
    e.preventDefault()
    setIsConfirmingBack(true)
  }

  const handleConfirmBack = () => {
    setIsConfirmingBack(false)
    window.history.back()
  }

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
    if (parseFloat(salePrice) > parseFloat(price)) {
      setError(t('productValid.salePriceCannotBeGreaterThan'))
      return
    }
    setIsConfirmingCreate(true)
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

    setError('')
    setIsLoading(true)
    createProduct(_id, accessToken, formData, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.product.create'))
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirmingCreate && (
        <ConfirmDialog
          title={t('productDetail.createProduct')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirmingCreate(false)}
          message={t('confirmDialog')}
        />
      )}
      {isConfirmingBack && (
        <ConfirmDialog
          title={t('dialog.cancelCreate')}
          onSubmit={handleConfirmBack}
          color='danger'
          onClose={() => setIsConfirmingBack(false)}
          message={t('confirmDialog')}
        />
      )}

      <form
        className='accordion'
        id='accordionPanelsStayOpen'
        onSubmit={handleSubmit}
      >
        <div className='accordion-item'>
          <div className='accordion-header' id='panelsStayOpen-heading-1'>
            <button
              className='accordion-button btn'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={`#panelsStayOpen-collapse-1`}
              aria-expanded='true'
              aria-controls={`panelsStayOpen-collapse-1`}
            >
              <span className=''>1. {t('productDetail.basicInfo')}</span>
            </button>
          </div>
          <div
            id={`panelsStayOpen-collapse-1`}
            className='accordion-collapse collapse show'
            aria-labelledby={`panelsStayOpen-collapse-1`}
          >
            <div className='accordion-body'>
              <div className='col-12'>
                <Input
                  type='text'
                  label={t('productDetail.name')}
                  value={newProduct.name}
                  isValid={newProduct.isValidName}
                  feedback={t('productValid.validName')}
                  validator='anything'
                  required={true}
                  placeholder='Ví dụ: Bàn Chải Điện P/S S100 PRO Trắng Răng Công Nghệ Sóng Âm Đen Nhám Chải Sạch Mảng Bám Tới 10X 1 Bộ'
                  onChange={(value) =>
                    handleChange('name', 'isValidName', value)
                  }
                  onValidate={(flag) => handleValidate('isValidName', flag)}
                />
              </div>
              <div className='col-12 mt-3'>
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
              <div className='col-12 mt-3'>
                <p>{t('productDetail.productImg')}</p>
                <div className='d-flex flex-wrap justify-content-start gap-4 align-items-center'>
                  <InputFile
                    label={t('productDetail.thumbImg')}
                    size='avatar'
                    required={true}
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
                    label={t('productDetail.img1')}
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
                    label={t('productDetail.img2')}
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
                    label={t('productDetail.img3')}
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
                    label={t('productDetail.img4')}
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
                    label={t('productDetail.img5')}
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
                    label={t('productDetail.img6')}
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
              <div className='col-12 mb-3'>
                <TextArea
                  type='text'
                  label={t('productDetail.description')}
                  value={newProduct.description}
                  isValid={newProduct.isValidDescription}
                  required={true}
                  feedback={t('productValid.validDescription')}
                  placeholder='Ví dụ:
									Đặc điểm nổi trội:

									- Công nghệ sóng âm tiên tiến tạo nên các hạt siêu bọt - Microbubble, sạch hiệu quả mà vẫn dịu nhẹ cho nướu

									- Gấp 100 lần nhịp chải so với việc chải răng thông thường

									- Cơ chế chải răng thông minh, giúp chải răng đúng và đủ 2 phút theo khuyến nghị của nha sĩ

									- 3 chế độ chải răng linh hoạt: Sạch Sâu, Chăm Sóc Nướu, Trắng răng

									- 30 ngày sử dụng chỉ với 1 lần sạc. Cổng sạc USB tiện lợi, dễ dàng cắm sạc ở bất cứ đâu

									- 100% chống nước - đạt tiêu chuẩn IPX7

									-----------------------------------------------------

									Hướng dẫn sử dụng:

									1. Gắn đầu chải khớp với phần thân chải

									2. Đặt đầu chải nghiêng gốc 45 độ so với viền nướu và chọn chế độ chải

									3. Chải trong 2 phút. Sau mỗi 30 giây, bàn chải sẽ tạm ngừng rung để bạn di chuyển sang vị trí khác trong khoang miệng

									xuất xứ : Trung Quốc
									-----------------------------------------------------
									Thông tin bảo hành:

									Bảo hành 1 đổi 1 trong vòng 30 ngày sử dụng kể từ ngày mua hàng. '
                  validator='bio'
                  onChange={(value) =>
                    handleChange('description', 'isValidDescription', value)
                  }
                  onValidate={(flag) =>
                    handleValidate('isValidDescription', flag)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className='accordion-item mt-3'>
          <div className='accordion-header' id='panelsStayOpen-heading-2'>
            <button
              className='accordion-button btn'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={`#panelsStayOpen-collapse-2`}
              aria-expanded='true'
              aria-controls={`panelsStayOpen-collapse-2`}
            >
              <span className=''>2. {t('productDetail.detailInfo')}</span>
            </button>
          </div>
          <div
            id={`panelsStayOpen-collapse-2`}
            className='accordion-collapse collapse show'
            aria-labelledby={`panelsStayOpen-collapse-2`}
          >
            <div className='accordion-body row'>
              <div className='col-md-6 col-sm-12'>
                <Input
                  type='number'
                  label={`${t('productDetail.price')} (₫)`}
                  value={newProduct.price}
                  isValid={newProduct.isValidPrice}
                  feedback={t('productValid.priceValid')}
                  validator='positive|zero'
                  required={true}
                  onChange={(value) => {
                    handleChange('price', 'isValidPrice', value)
                  }}
                  onValidate={(flag) => handleValidate('isValidPrice', flag)}
                />
              </div>

              <div className='col-md-6 col-sm-12'>
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
                  onValidate={(flag) =>
                    handleValidate('isValidSalePrice', flag)
                  }
                />
              </div>

              <div className='col-12'>
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

              <div className='col-12 mt-3'>
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
            </div>
          </div>
        </div>

        {error && (
          <div className='col-12 p-2 text-center'>
            <Error msg={error} />
          </div>
        )}
        <div
          className={`bg-body ${
            isScrolled ? 'shadow' : 'box-shadow'
          } rounded-1 px-4 my-3 p-3`}
          style={{ position: 'sticky', bottom: '0' }}
        >
          <div className='d-flex justify-content-end gap-4 align-items-center'>
            <Link
              to={`/seller/products/${storeId}`}
              className='btn btn-outline-primary ripple rounded-1'
              onClick={handleBackClick}
            >
              {t('button.cancel')}
            </Link>
            <button
              type='submit'
              className='btn btn-primary ripple rounded-1'
              onClick={handleSubmit}
              style={{ width: '200px', maxWidth: '100%' }}
            >
              {t('button.save')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SellerCreateProductForm
