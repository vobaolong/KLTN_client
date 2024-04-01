import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminOrdersTable from '../../components/table/AdminOrdersTable'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const OrderPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const [selectedStatus, setSelectedStatus] = useState('Shipped')

  const orderStatus = [
    {
      label: t('status.all'),
      value: 'Not processed|Processing|Shipped|Delivered|Cancelled'
    },
    { label: t('status.notProcessed'), value: 'Not processed' },
    { label: t('status.processing'), value: 'Processing' },
    { label: t('status.shipped'), value: 'Shipped' },
    { label: t('status.delivered'), value: 'Delivered' },
    { label: t('status.cancelled'), value: 'Cancelled' }
  ]

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }

  return (
    <AdminLayout user={user}>
      <div className='nav d nav-tabs bg-body rounded-2 p-2 box-shadow w-100 mb-4'>
        {orderStatus.map((status) => (
          <li className='nav-item col-2 text-center pointer' key={status.value}>
            <span
              className={`nav-link ${
                selectedStatus === status.value ? `active` : ``
              }`}
              onClick={() => handleStatusChange(status.value)}
            >
              {status.label}
            </span>
          </li>
        ))}
      </div>

      <AdminOrdersTable
        heading={true}
        isEditable={
          selectedStatus === 'Not processed' ||
          selectedStatus === 'Processing' ||
          selectedStatus === 'Shipped'
        }
        status={selectedStatus}
      />
    </AdminLayout>
  )
}

export default OrderPage
