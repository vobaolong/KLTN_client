const icons = {
	'Not processed': <i className='fas fa-clipboard'></i>,
	Processing: <i className='fas fa-clipboard-check'></i>,
	Shipped: <i className='fas fa-truck'></i>,
	Delivered: <i className='fas fa-check-double'></i>,
	Cancelled: <i className='fas fa-times'></i>
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
