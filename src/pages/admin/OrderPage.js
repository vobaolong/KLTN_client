import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminOrdersTable from '../../components/table/AdminOrdersTable'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const OrderPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const [selectedStatus, setSelectedStatus] = useState(
    'Not processed|Processing|Shipped|Delivered|Cancelled|Returned'
  )

  const orderStatus = [
    {
      label: t('status.all'),
      value: 'Not processed|Processing|Shipped|Delivered|Cancelled|Returned'
    },
    { label: t('status.notProcessed'), value: 'Not processed' },
    { label: t('status.processing'), value: 'Processing' },
    { label: t('status.shipped'), value: 'Shipped' },
    { label: t('status.delivered'), value: 'Delivered' },
    { label: t('status.cancelled'), value: 'Cancelled' },
    { label: t('status.returned'), value: 'Returned' }
  ]

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.order'), url: '/admin/order' }
  ]

  return (
    <AdminLayout user={user} paths={paths}>
      <div className='nav nav-tabs bg-body rounded-top-1 box-shadow mb-2'>
        {orderStatus.map((status) => (
          <li className='nav-item col-2 text-center pointer' key={status.value}>
            <span
              className={`nav-link h-100 ${
                selectedStatus === status.value ? `active` : ``
              }`}
              onClick={() => handleStatusChange(status.value)}
            >
              {status.label}
            </span>
          </li>
        ))}
      </div>

      <AdminOrdersTable heading={false} status={selectedStatus} />
    </AdminLayout>
  )
}

export default OrderPage
