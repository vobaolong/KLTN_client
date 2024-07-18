import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { reportByUser } from '../../../apis/report'
import { socketId } from '../../..'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../ui/ConfirmDialog'

const ListReport = ({
  reasons,
  objectId,
  reportBy,
  isStore,
  isProduct,
  isReview,
  showOtherReason = false
}) => {
  const [selectedReason, setSelectedReason] = useState('')
  const [otherReason, setOtherReason] = useState('')
  const { t } = useTranslation()
  const [isConfirming, setIsConfirming] = useState(false)

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value)
  }

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsConfirming(true)
  }

  const onSubmit = async () => {
    if (selectedReason) {
      const reasonToSubmit =
        selectedReason === 'other' ? otherReason : selectedReason
      try {
        console.log('Submitting report with data:', {
          objectId,
          reportBy,
          reason: reasonToSubmit,
          isStore,
          isProduct,
          isReview
        })
        await reportByUser({
          objectId: objectId,
          reportBy: reportBy,
          reason: reasonToSubmit,
          isStore: isStore,
          isProduct: isProduct,
          isReview: isReview
        })
        socketId.emit('notificationReport', {
          objectId: objectId,
          from: reportBy,
          to: process.env.ADMIN_ID
        })
        toast.success('Gửi báo cáo thành công')
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
        <div className='mb-3 d-flex flex-column'>
          <label className='form-label'>Chọn lý do báo cáo</label>
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
              <hr className='m-3' />
            </div>
          ))}
          {showOtherReason && (
            <div className='form-check'>
              <input
                className='form-check-input pointer'
                type='radio'
                name='reportReason'
                id='other'
                value='other'
                checked={selectedReason === 'other'}
                onChange={handleReasonChange}
              />
              <label className='form-check-label' htmlFor='other'>
                Khác
              </label>
            </div>
          )}
          {selectedReason === 'other' && showOtherReason && (
            <input
              type='text'
              className='form-control mt-2'
              placeholder='Nhập lý do khác'
              value={otherReason}
              onChange={handleOtherReasonChange}
            />
          )}
        </div>
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='mt-3 btn btn-primary ripple text-nowrap rounded-1 w-50'
            onClick={handleSubmit}
          >
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ListReport
