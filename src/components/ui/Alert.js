import React, { memo } from 'react'

const Alert = memo(({ icon, msg1, alert, msg2, onClose }) => {
  return (
    <div className='bg-primary-rgba p-1 px-3 rounded-1 border-rgba d-flex align-items-center justify-content-between my-2'>
      <span>{icon}</span>
      <span className='d-flex gap-1 fs-9 flex-grow-1 ms-2'>
        <b>{msg1}:</b>
        {alert}
        <b>{msg2}</b>
      </span>
      <small className='pointer text-primary' onClick={onClose}>
        Đã hiểu
      </small>
    </div>
  )
})

export default Alert
