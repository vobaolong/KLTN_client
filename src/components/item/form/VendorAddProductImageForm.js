import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { addListImages } from '../../../apis/product'
import InputFile from '../../ui/InputFile'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'

const VendorAddProductImageForm = ({ productId = '', storeId = '', onRun }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    setSuccess('')
    setIsLoading(true)
    addListImages(_id, accessToken, formData, productId, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setNewImages({
            image: '',
            isValidImage: true
          })
          setSuccess(data.success)
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setSuccess('')
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
          title='Add new product image'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <InputFile
            label='Product other image'
            size='avatar'
            noRadius={true}
            value={newImage.image}
            defaultSrc={newImage.image}
            isValid={newImage.isValidImage}
            feedback='Please provide a valid product image.'
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={(value) => handleChange('image', 'isValidImage', value)}
            onValidate={(flag) => handleValidate('isValidImage', flag)}
          />
        </div>

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

        {success && (
          <div className='col-12'>
            <Success msg={success} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default VendorAddProductImageForm
