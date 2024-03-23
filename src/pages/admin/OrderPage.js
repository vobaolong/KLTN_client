import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminOrdersTable from '../../components/table/AdminOrdersTable'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const OrderPage = (props) => {
	const user = useSelector((state) => state.account.user)
	const { t } = useTranslation()
	const [selectedStatus, setSelectedStatus] = useState('Shipped');

	const orderStatus = [
		{ label: t('status.all'), value: 'Not processed|Processing|Shipped|Delivered|Cancelled', className: 'secondary' },
		{ label: t('status.notProcessed'), value: 'Not processed', className: 'golden' },
		{ label: t('status.processing'), value: 'Processing', className: 'primary' },
		{ label: t('status.shipped'), value: 'Shipped', className: 'primary' },
		{ label: t('status.delivered'), value: 'Delivered', className: 'success' },
		{ label: t('status.cancelled'), value: 'Cancelled', className: 'danger' }
	];


	const handleStatusChange = (status) => {
		setSelectedStatus(status);
	};
	return (
		<AdminLayout user={user}>
			<div className='d-flex align-items-center mb-4 justify-content-between'>

				{orderStatus.map((status) => (
					<button
						style={{ flex: 1 }}
						key={status.value}
						type='button'
						className={`btn ${selectedStatus === status.value ? `btn-${status.className}` : `btn-outline-${status.className}`
							} btn-sm ripple cus-tooltip me-2`}
						onClick={() => handleStatusChange(status.value)}
					>
						{status.label}
					</button>
				))}
			</div>

			<AdminOrdersTable
				heading={true}
				isEditable={selectedStatus === 'Not processed' || selectedStatus === 'Processing' || selectedStatus === 'Shipped'}
				status={selectedStatus}
			/>
		</AdminLayout >
	)
}

export default OrderPage
