import { useState } from 'react'
import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserOrdersTable from '../../components/table/UserOrdersTable'
import { useTranslation } from 'react-i18next'

const OrderPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()

  const [selectedStatus, setSelectedStatus] = useState(
    'Not processed|Processing|Shipped|Delivered|Cancelled'
  )

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
    <AccountLayout user={user}>
      <div className='nav nav-tabs bg-body rounded-top-1 box-shadow mb-4'>
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

      <UserOrdersTable heading={true} status={selectedStatus} />
    </AccountLayout>
  )
}

export default OrderPage
