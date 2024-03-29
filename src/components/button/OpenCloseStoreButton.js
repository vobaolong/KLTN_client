import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { openStore } from '../../apis/store'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const OpenCloseStoreButton = ({
  storeId = '',
  isOpen = true,
  detail = true,
  className = '',
  onRun
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [openFlag, setOpenFlag] = useState(isOpen)
  const { _id, accessToken } = getToken()
  const { t } = useTranslation()

  useEffect(() => {
    setOpenFlag(isOpen)
  }, [isOpen, storeId])

  const handleOpenStore = () => {
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setIsLoading(true)
    const value = { isOpen: !openFlag }
    openStore(_id, accessToken, value, storeId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          setOpenFlag(!openFlag)
          if (onRun) onRun(data.store)
          toast.success(
            ` ${
              openFlag ? 'Close store successfully' : 'Open store successfully'
            }`
          )
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={openFlag ? 'Close this store' : 'Open this store'}
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
            {detail && (
              <span className='ms-2 res-hide'>{t('storeDetail.open')}</span>
            )}
          </span>
        ) : (
          <span>
            <i className='fas fa-door-closed'></i>
            {detail && (
              <span className='ms-2 res-hide'>{t('storeDetail.close')}</span>
            )}
          </span>
        )}
      </button>
    </div>
  )
}

export default OpenCloseStoreButton
