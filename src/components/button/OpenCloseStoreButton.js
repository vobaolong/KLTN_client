import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { openStore } from '../../apis/store'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'

const OpenCloseStoreButton = ({
  storeId = '',
  isOpen = true,
  detail = true,
  className = '',
  onRun
}) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [openFlag, setOpenFlag] = useState(isOpen)

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setOpenFlag(isOpen)
  }, [isOpen, storeId])

  const handleOpenStore = () => {
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    const value = { isOpen: !openFlag }
    openStore(_id, accessToken, value, storeId)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else {
          setOpenFlag(!openFlag)
          if (onRun) onRun(data.store)
        }
        setIsLoading(false)
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
          title={openFlag ? 'Close this shop' : 'Open this shop'}
          color={openFlag ? 'danger' : 'primary'}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}
      <button
        type='button'
        className={`btn ${
          openFlag ? 'btn-outline-primary' : 'btn-outline-danger'
        } ripple ${className}`}
        onClick={handleOpenStore}
      >
        {openFlag ? (
          <span>
            <i className='fas fa-door-open'></i>
            {detail && <span className='ms-2 res-hide'>open</span>}
          </span>
        ) : (
          <span>
            <i className='fas fa-door-closed'></i>
            {detail && <span className='ms-2 res-hide'>closed</span>}
          </span>
        )}
      </button>
    </div>
  )
}

export default OpenCloseStoreButton
