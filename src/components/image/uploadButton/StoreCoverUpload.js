import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { updateCover } from '../../../apis/store'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const StoreCoverUpload = ({ storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { _id, accessToken } = getToken()
  const [updateDispatch] = useUpdateDispatch()
  const { t } = useTranslation()
  const handleChange = (e) => {
    if (e.target.files[0] == null) return
    const formData = new FormData()
    formData.set('photo', e.target.files[0])
    setIsLoading(true)
    updateCover(_id, accessToken, formData, storeId)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          updateDispatch('vendor', data.store)
          toast.success(t('toastSuccess.addCover'))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Something went wrong')
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading && <Loading />}
      <label className='cus-cover-icon'>
        <i className='fa-solid fa-camera'></i>
        {error && <Error msg={error} />}
        <input
          className='visually-hidden'
          type='file'
          accept='image/png, image/jpeg, image/jpg, image/gif, image/webp'
          onChange={handleChange}
        />
      </label>
    </>
  )
}

export default StoreCoverUpload
