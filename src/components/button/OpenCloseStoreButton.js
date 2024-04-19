import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { openStore } from '../../apis/store'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const OpenCloseStoreButton = ({ storeId = '', isOpen = true, onRun }) => {
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
              openFlag
                ? t('toastSuccess.lockStore')
                : t('toastSuccess.unlockStore')
            }`
          )
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Something went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading size='small' />}
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
