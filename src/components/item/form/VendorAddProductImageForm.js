import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { addListImages } from '../../../apis/product'
import InputFile from '../../ui/InputFile'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const VendorAddProductImageForm = ({ productId = '', storeId = '', onRun }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const [newImage, setNewImages] = useState({
    image: '',
    isValidImage: true
  })

  const { _id, accessToken } = getToken()

  const handleChange = (name, isValidName, value) => {
    setNewImages({
      ...newImage,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewImages({
      ...newImage,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newImage.image) {
      setNewImages({
        ...newImage,
        isValidImage: false
      })
      return
    }

    if (!newImage.isValidImage) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('photo', newImage.image)
    setIsLoading(true)
    addListImages(_id, accessToken, formData, productId, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          setNewImages({
            image: '',
            isValidImage: true
          })
          toast.success(t('toastSuccess.product.addImg'))
          if (onRun) onRun()
        }
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
          title={t('productDetail.addImg')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12 text-center'>
          <InputFile
            label={t('productDetail.otherImg')}
            size='avatar'
            noRadius={false}
            value={newImage.image}
            defaultSrc={newImage.image}
            isValid={newImage.isValidImage}
            feedback={t('productValid.otherValid')}
            accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
            onChange={(value) => handleChange('image', 'isValidImage', value)}
            onValidate={(flag) => handleValidate('isValidImage', flag)}
          />
        </div>

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple rounded-1'
            onClick={handleSubmit}
          >
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default VendorAddProductImageForm
