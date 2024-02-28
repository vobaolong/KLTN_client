import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { cancelStaff } from '../../apis/store'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'

const CancelStaffsButton = ({ storeId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)

  const { _id, accessToken } = getToken()
  const history = useHistory()

  const handlecancelStaff = () => {
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

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title='Leave store'
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <button
        type='button'
        className='btn btn-outline-danger ripple'
        onClick={handlecancelStaff}
      >
        <i className='fas fa-ban'></i>
        <span className='ms-2 res-hide'>Leave store</span>
      </button>
    </div>
  )
}
export default CancelStaffsButton
