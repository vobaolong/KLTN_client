import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { socketId } from '../../..'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { createReturnRequest } from '../../../apis/order'
import { getToken } from '../../../apis/auth'

const ReturnOrderForm = ({ reasons, orderId, userId, storeId }) => {
  const [selectedReason, setSelectedReason] = useState('')
  const { t } = useTranslation()
  const [isConfirming, setIsConfirming] = useState(false)
  const { _id, accessToken } = getToken()

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsConfirming(true)
  }

  const onSubmit = async () => {
    if (selectedReason) {
      try {
        console.log('Submitting report with data:', {
          userId,
          orderId,
          reason: selectedReason
        })
        await createReturnRequest(_id, accessToken, orderId, selectedReason)
        socketId.emit('notificationReturn', {
          objectId: orderId,
          from: userId,
          to: storeId
        })
        toast.success('Gửi yêu cầu thành công')
      } catch (error) {
        console.error('Error reporting:', error)
        toast.error('Error submitting report')
      }
    } else {
      console.error('Please select a reason for reporting.')
      toast.error('Please select a reason for reporting.')
    }
  }

  return (
    <div className='position-relative'>
      {isConfirming && (
        <ConfirmDialog
          title={t('report')}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className='mb-3 d-flex flex-column gap-2'>
          <label className='form-label'>Chọn lý do</label>
          {reasons.map((reason) => (
            <div className='form-check' key={reason.value}>
              <input
                className='form-check-input pointer'
                type='radio'
                name='reportReason'
                id={reason.value}
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={handleReasonChange}
              />
              <label className='form-check-label' htmlFor={reason.value}>
                {reason.label}
              </label>
              <hr className='m-2' />
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='mt-3 btn btn-primary ripple text-nowrap rounded-1 w-50'
            onClick={handleSubmit}
            disabled={!selectedReason}
          >
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReturnOrderForm
