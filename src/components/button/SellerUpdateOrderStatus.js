import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { sellerUpdateStatusOrder } from '../../apis/order'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import DropDownMenu from '../ui/DropDownMenu'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import Error from '../ui/Error'
import { socketId } from '../..'

const SellerUpdateOrderStatus = ({
  storeId = '',
  orderId = '',
  status = '',
  onRun
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const [statusValue, setStatusValue] = useState(status)
  const { _id, accessToken } = getToken()
  const { t } = useTranslation()

  useEffect(() => {
    setStatusValue(status)
  }, [status])

  const handleUpdate = (value) => {
    setStatusValue(value)
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    const value = { status: statusValue }
    sellerUpdateStatusOrder(_id, accessToken, value, orderId, storeId)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else {
          if (statusValue === 'Delivered') {
            socketId.emit('notificationDelivered', {
              objectId: data.order._id,
              from: _id,
              to: data.order.userId._id ?? data.order.userId
            })
          }
          toast.success(t('toastSuccess.order.update'))
        }

        if (onRun) onRun()
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

  const getStatusOptions = () => {
    const options = [
      { label: t('status.notProcessed'), value: 'Not processed' },
      { label: t('status.processing'), value: 'Processing' },
      { label: t('status.shipped'), value: 'Shipped' },
      { label: t('status.delivered'), value: 'Delivered' },
      { label: t('status.cancel'), value: 'Cancelled' }
    ]
    switch (statusValue) {
      case 'Not processed':
        return options.filter(
          (option) =>
            !['Shipped', 'Delivered', 'Not processed'].includes(option.value)
        )
      case 'Processing':
        return options.filter(
          (option) =>
            !['Not processed', 'Delivered', 'Processing'].includes(option.value)
        )
      case 'Shipped':
        return options.filter(
          (option) =>
            !['Not processed', 'Processing', 'Shipped', 'Cancelled'].includes(
              option.value
            )
        )
      case 'Delivered':
      case 'Cancelled':
        return options.filter((option) => option.value === statusValue)
      default:
        return options
    }
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.updateOrder')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <DropDownMenu
        listItem={getStatusOptions()}
        size='lg'
        value={statusValue}
        setValue={(value) => handleUpdate(value)}
        borderBtn={false}
      />
    </div>
  )
}

export default SellerUpdateOrderStatus
