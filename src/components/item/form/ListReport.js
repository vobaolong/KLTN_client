import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ListReport = ({ onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('')
  const { t } = useTranslation()

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedReason) {
      onSubmit(selectedReason)
    } else {
      alert('Please select a reason for reporting.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3 d-flex flex-column gap-2'>
        <label className='form-label'>Chọn lý do báo cáo</label>
        <div className='form-check'>
          <input
            className='form-check-input pointer'
            type='radio'
            name='reportReason'
            id='fakeProducts'
            value='fakeProducts'
            checked={selectedReason === 'fakeProducts'}
            onChange={handleReasonChange}
          />
          <label className='form-check-label' htmlFor='fakeProducts'>
            Sản phẩm giả mạo
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input pointer'
            type='radio'
            name='reportReason'
            id='fraud'
            value='fraud'
            checked={selectedReason === 'fraud'}
            onChange={handleReasonChange}
          />
          <label className='form-check-label' htmlFor='fraud'>
            Gian lận
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input pointer'
            type='radio'
            name='reportReason'
            id='inappropriateContent'
            value='inappropriateContent'
            checked={selectedReason === 'inappropriateContent'}
            onChange={handleReasonChange}
          />
          <label className='form-check-label' htmlFor='inappropriateContent'>
            Nội dung không phù hợp
          </label>
        </div>
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
