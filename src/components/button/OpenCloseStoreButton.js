import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { openStore } from '../../apis/store'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import Error from '../ui/Error'

const OpenCloseStoreButton = ({ storeId = '', isOpen = true, onRun }) => {
  const [error, setError] = useState('')
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
          toast.success(
            ` ${
              openFlag
                ? t('toastSuccess.lockStore')
                : t('toastSuccess.unlockStore')
            }`
          )
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
      {isLoading && <Loading size='small' />}
      {error && <Error msg={error} />}

      {isConfirming && (
        <ConfirmDialog
          title={openFlag ? t('title.closeStore') : t('title.openStore')}
          color={openFlag ? 'warning' : 'primary'}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}
      <label className='form-switch'>
        <input
          type='checkbox'
          className='form-check-input'
          checked={!openFlag}
          onChange={handleOpenStore}
        />
        <i></i>
      </label>
    </div>
  )
}

export default OpenCloseStoreButton
