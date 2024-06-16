import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { addFeaturedImage } from '../../../apis/store'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import InputFile from '../../ui/InputFile'
import Error from '../../ui/Error'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const StoreAddFeaturedImageForm = ({ storeId = '' }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [updateDispatch] = useUpdateDispatch()
  const [featuredImage, setFeaturedImage] = useState({
    image: '',
    isValidImage: true
  })

  const { _id, accessToken } = getToken()

  const handleChange = (name, isValidName, value) => {
    setFeaturedImage({
      ...featuredImage,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setFeaturedImage({
      ...featuredImage,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!featuredImage.image) {
      setFeaturedImage({
        ...featuredImage,
        isValidImage: false
      })
      return
    }

    if (!featuredImage.isValidImage) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('featured_image', featuredImage.image)

    setError('')
    setIsLoading(true)
    addFeaturedImage(_id, accessToken, formData, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('seller', data.store)
          setFeaturedImage({
            image: '',
            isValidImage: true
          })
          toast.success(t('toastSuccess.store.addCarousel'))
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
          title={t('storeDetail.addFeaturedImg')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <InputFile
            label=''
            size='featured'
            value={featuredImage.image}
            defaultSrc={featuredImage.image}
            isValid={featuredImage.isValidImage}
            feedback={t('storeDetailValid.featuredValid')}
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

export default StoreAddFeaturedImageForm
