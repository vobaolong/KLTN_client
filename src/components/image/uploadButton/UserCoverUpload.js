import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { updateCover } from '../../../apis/user'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import { useTranslation } from 'react-i18next'

const UserCoverUpload = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()
  const { t } = useTranslation()
  const handleChange = (e) => {
    if (e.target.files[0] == null) return
    const formData = new FormData()
    formData.set('photo', e.target.files[0])
    setError('')
    setIsLoading(true)
    updateCover(_id, accessToken, formData)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else updateDispatch('account', data.user)
        setIsLoading(false)
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

export default UserCoverUpload
