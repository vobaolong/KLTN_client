import { useState, Fragment } from 'react'
import { getToken } from '../../../apis/auth'
import { updateListImages, removeListImages } from '../../../apis/product'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import Error from '../../ui/Error'

const ProductUpload = ({ storeId = '', productId = '', index = 0, onRun }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const { t } = useTranslation()
  const { _id, accessToken } = getToken()

  const handleChange = (e) => {
    if (e.target.files[0] == null) return
    const formData = new FormData()
    formData.set('photo', e.target.files[0])

    setError('')
    setIsLoading(true)
    updateListImages(_id, accessToken, formData, index, productId, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
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
    setIsLoading(true)
    removeListImages(_id, accessToken, index, productId, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        setIsLoading(false)
        if (onRun) onRun()
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
    <Fragment>
      {isLoading && <Loading />}
      {isConfirming && (
        <div className='text-start'>
          <ConfirmDialog
            title={t('dialog.removeImg')}
            message={t('confirmDialog')}
            color='danger'
            onSubmit={onRemoveSubmit}
            onClose={() => setIsConfirming(false)}
          />
        </div>
      )}

      {index > 0 && (
        <label
          className='cus-avatar-icon cus-avatar-icon--rm'
          onClick={handleRemove}
        >
          <i className='fa-solid fa-times'></i>
        </label>
      )}

      <label className='cus-avatar-icon'>
        <i className='fa-solid fa-camera'></i>
        {error && (
          <span>
            <Error msg={error} />
          </span>
        )}
        <input
          className='visually-hidden'
          type='file'
          accept='image/png, image/jpeg, image/jpg, image/gif, image/webp'
          onChange={handleChange}
        />
      </label>
    </Fragment>
  )
}

export default ProductUpload
