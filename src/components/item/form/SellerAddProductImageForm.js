import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { addListImages } from '../../../apis/product'
import InputFile from '../../ui/InputFile'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import Error from '../../ui/Error'

const SellerAddProductImageForm = ({ productId = '', storeId = '', onRun }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
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
    setError('')
    setIsLoading(true)
    addListImages(_id, accessToken, formData, productId, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setNewImages({
            image: '',
            isValidImage: true
          })
          if (onRun) onRun()
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
            label=''
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

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

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

export default SellerAddProductImageForm
