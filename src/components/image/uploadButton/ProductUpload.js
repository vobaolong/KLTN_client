import { useState, Fragment } from 'react'
import { getToken } from '../../../apis/auth'
import { updateListImages, removeListImages } from '../../../apis/product'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { toast } from 'react-toastify'

const ProductUpload = ({ storeId = '', productId = '', index = 0, onRun }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)

  const { _id, accessToken } = getToken()

  const handleChange = (e) => {
    if (e.target.files[0] == null) return
    const formData = new FormData()
    formData.set('photo', e.target.files[0])
    setIsLoading(true)
    updateListImages(_id, accessToken, formData, index, productId, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(data.success)
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setIsLoading(false)
        setError(error)
      })
  }

  const handleRemove = () => {
    setIsConfirming(true)
  }

  const onRemoveSubmit = () => {
    setError('')
    toast.success('')
    setIsLoading(true)
    removeListImages(_id, accessToken, index, productId, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else toast.success(data.success)
        setIsLoading(false)
        if (onRun) onRun()
      })
      .catch((error) => {
        setError(error)
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
            title='Remove images'
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
          <i className='fas fa-times'></i>
        </label>
      )}

      <label className='cus-avatar-icon'>
        <i className='fas fa-camera'></i>
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
