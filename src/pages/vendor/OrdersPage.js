import { useSelector } from 'react-redux'
import VendorLayout from '../../components/layout/VendorLayout'
import VendorOrdersTable from '../../components/table/VendorOrdersTable'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const OrdersPage = (props) => {
	const user = useSelector((state) => state.account.user)
	const store = useSelector((state) => state.vendor.store)
	const { t } = useTranslation()
	const [selectedStatus, setSelectedStatus] = useState('Not processed');

	const orderStatus = [
		{ label: t('status.all'), value: 'Not processed|Processing|Shipped|Delivered|Cancelled' },
		{ label: t('status.notProcessed'), value: 'Not processed' },
		{ label: t('status.processing'), value: 'Processing' },
		{ label: t('status.shipped'), value: 'Shipped' },
		{ label: t('status.delivered'), value: 'Delivered' },
		{ label: t('status.cancelled'), value: 'Cancelled' }
	];

	const handleStatusChange = (status) => {
		setSelectedStatus(status)
	}

	return (
		<VendorLayout user={user} store={store}>
			<div className="nav d nav-tabs bg-body rounded-2 p-2 box-shadow w-100 mb-4">
				{orderStatus.map((status) => (
					<li className="nav-item col-2 text-center pointer" key={status.value}>
						<span
							className={`nav-link ${selectedStatus === status.value ? `active` : ``
								}`}
							onClick={() => handleStatusChange(status.value)}
						>
							{status.label}
						</span>
					</li>
				))}
			</div>

			<VendorOrdersTable
				heading={true}
				storeId={store._id}
				isEditable={selectedStatus === 'Not processed' || selectedStatus === 'Processing' || selectedStatus === 'Shipped'}
				status={selectedStatus}
			/>
		</VendorLayout>
	)
}

export default OrdersPage
