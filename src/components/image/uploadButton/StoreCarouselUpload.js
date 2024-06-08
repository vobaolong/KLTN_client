import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { updateFeaturedImage, removeFeaturedImage } from '../../../apis/store'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const StoreCarouselUpload = ({ storeId = '', index = 0 }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const { _id, accessToken } = getToken()
  const [updateDispatch] = useUpdateDispatch()

  const handleUpdateFeaturedImage = (e, index) => {
    if (e.target.files[0] == null) return
    const formData = new FormData()
    formData.set('photo', e.target.files[0])
    setIsLoading(true)
    updateFeaturedImage(_id, accessToken, formData, index, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          updateDispatch('seller', data.store)
          toast.success(t('toastSuccess.store.updateCarousel'))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log('Something went wrong')
      })
  }

  const handleRemove = () => {
    setIsConfirming(true)
  }

  const onRemoveSubmit = () => {
    setIsLoading(true)
    removeFeaturedImage(_id, accessToken, index, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          updateDispatch('seller', data.store)
          toast.success(t('toastSuccess.store.removeCarousel'))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log('Something went wrong')
      })
  }

  return (
    <>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.removeFeatured')}
          onSubmit={onRemoveSubmit}
          message={t('message.delete')}
          color='danger'
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div className='cus-carousel-icon-wrap'>
        <div className='d-flex flex-column'>
          <div className=''>
            <label
              htmlFor={`uploadFeaturedImage-${index}`}
              className='cus-carousel-icon me-2'
            >
              <i className='fa-solid fa-camera'></i>
              <span className='ms-2 res-hide-md'>{t('button.edit')}</span>
              <input
                id={`uploadFeaturedImage-${index}`}
                className='visually-hidden'
                type='file'
                accept='image/png, image/jpeg, image/jpg, image/gif, image/webp'
                onChange={(e) => handleUpdateFeaturedImage(e, index)}
              />
            </label>

            <label
              className='cus-carousel-icon cus-carousel-icon--rm'
              onClick={() => handleRemove(index)}
            >
              <i className='fa-solid fa-trash-alt'></i>
              <span className='ms-2 res-hide-md'>{t('button.delete')}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreCarouselUpload
