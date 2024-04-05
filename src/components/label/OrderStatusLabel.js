const icons = {
  'Not processed': <i className='fa-solid fa-clipboard'></i>,
  Processing: <i className='fa-solid fa-clipboard-check'></i>,
  Shipped: <i className='fa-solid fa-truck'></i>,
  Delivered: <i className='fa-solid fa-check-double'></i>,
  Cancelled: <i className='fa-solid fa-times'></i>
}

const colors = {
  'Not processed': 'warning',
  Processing: 'orange',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'danger'
}

const OrderStatusLabel = ({ status = '', detail = true }) => {
  return (
    <span className='d-inline-block position-relative'>
      <span
        className={`badge rounded-1 text-white bg-${colors[status]} cus-tooltip`}
      >
        {icons[status]}
        {detail && <span className='ms-2'>{status}</span>}
      </span>
      {/* <small className='cus-tooltip-msg'>{status}</small> */}
    </span>
  )
}

export default OrderStatusLabel
