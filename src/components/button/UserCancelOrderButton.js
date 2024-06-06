import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { userCancelOrder } from '../../apis/order'
import { calcTime } from '../../helper/calcTime'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { socketId } from '../..'

const UserCancelOrderButton = ({
  orderId = '',
  status = '',
  detail = true,
  createdAt = '',
  onRun
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const { _id, accessToken } = getToken()

  const handleCancelOrder = () => {
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setIsLoading(true)
    const value = { status: 'Cancelled' }
    userCancelOrder(_id, accessToken, value, orderId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          socketId.emit('notificationCancel', {
            orderId: data.order._id,
            from: _id,
            to: data.order.storeId._id
          })
          if (onRun) onRun()
          toast.success(t('toastSuccess.order.cancel'))
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
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Cancel Order'
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}
      <div className='d-inline-block cus-tooltip'>
        <button
          type='button'
          className='btn btn-outline-danger ripple rounded-1'
          disabled={status !== 'Not processed' || calcTime(createdAt) >= 1}
          onClick={handleCancelOrder}
        >
          <i className='fa-solid fa-ban'></i>
          {detail && <span className='ms-2'>{t('button.cancel')}</span>}
        </button>
      </div>

      {(!status === 'Not processed' || calcTime(createdAt) >= 1) && (
        <small className='cus-tooltip-msg'>{t('status.cantCancelOrder')}</small>
      )}
    </div>
  )
}

export default UserCancelOrderButton
