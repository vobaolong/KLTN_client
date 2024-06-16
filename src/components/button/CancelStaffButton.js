import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { cancelStaff } from '../../apis/store'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import Error from '../ui/Error'
import { toast } from 'react-toastify'

const CancelStaffsButton = ({ storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState(false)
  const { _id, accessToken } = getToken()
  const history = useHistory()

  const handleCancelStaff = () => {
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    cancelStaff(_id, accessToken, storeId)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else {
          toast.success(t('Rời thành công'))
          history.go(0)
        }
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }
  const { t } = useTranslation()
  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('staffDetail.leave')}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <button
        type='button'
        className='btn btn-outline-danger rounded-1 ripple'
        style={{ width: 'max-content' }}
        onClick={handleCancelStaff}
      >
        <i className='fa-solid fa-ban'></i>
        <span className='ms-2 res-hide'>{t('staffDetail.leave')}</span>
      </button>
    </div>
  )
}
export default CancelStaffsButton
