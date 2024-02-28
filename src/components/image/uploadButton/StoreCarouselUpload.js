import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { updateFeaturedImage, removeFeaturedImage } from '../../../apis/store'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'

const StoreCarouselUpload = ({ storeId = '', index = 0 }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)

  const { _id, accessToken } = getToken()
  const [updateDispatch] = useUpdateDispatch()

  const handleUpdateFeaturedImage = (e, index) => {
    if (e.target.files[0] == null) return
    const formData = new FormData()
    formData.set('photo', e.target.files[0])

    setError('')
    setSuccess('')
    setIsLoading(true)
    updateFeaturedImage(_id, accessToken, formData, index, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('vendor', data.store)
          setSuccess(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setIsLoading(false)
        setError('Server Error')
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  const handleRemove = () => {
    setIsConfirming(true)
  }

  const onRemoveSubmit = () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    removeFeaturedImage(_id, accessToken, index, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('vendor', data.store)
          setSuccess(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setIsLoading(false)
        setError('Server Error')
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Remove featured photo'
          onSubmit={onRemoveSubmit}
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
              <i className='fas fa-camera'></i>
              <span className='ms-2 res-hide-md'>Edit</span>
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
              <i className='fas fa-trash-alt'></i>
              <span className='ms-2 res-hide-md'>Remove</span>
            </label>
          </div>

          {success && (
            <div className='bg-body mt-1 px-1 rounded'>
              <Success msg={success} />
            </div>
          )}
          {error && (
            <div className='bg-body mt-1 px-1 rounded'>
              <Error msg={error} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StoreCarouselUpload
