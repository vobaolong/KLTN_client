import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ListReport = ({ onSubmit, reasons }) => {
  const [selectedReason, setSelectedReason] = useState('')
  const [otherReason, setOtherReason] = useState('')
  const { t } = useTranslation()

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value)
  }

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedReason) {
      const reasonToSubmit =
        selectedReason === 'other' ? otherReason : selectedReason
      onSubmit(reasonToSubmit)
    } else {
      alert('Please select a reason for reporting.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3 d-flex flex-column gap-2'>
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
          </div>
        ))}
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
        {selectedReason === 'other' && (
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
          type='submit'
          className='mt-3 btn btn-primary ripple text-nowrap rounded-1 w-50'
        >
          {t('button.submit')}
        </button>
      </div>
    </form>
  )
}

export default ListReport
