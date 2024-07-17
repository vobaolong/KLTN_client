import { useState } from 'react'
import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserOrdersTable from '../../components/table/UserOrdersTable'
import { useTranslation } from 'react-i18next'
import MetaData from '../../components/layout/meta/MetaData'

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
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myPurchase'), url: '/account/purchase' }
  ]
  return (
    <AccountLayout user={user} paths={paths}>
      <MetaData title={`${t('helmet.myPurchase')} | Zenpii Việt Nam`} />
      <div className='nav nav-tabs bg-body rounded-top-1 box-shadow mb-2'>
        {orderStatus.map((status) => (
          <li
            className='nav-item flex-grow-1 text-center pointer'
            key={status.value}
          >
            <span
              className={`nav-link h-100 text-dark-emphasis ${
                selectedStatus === status.value ? `active` : ``
              }`}
              onClick={() => handleStatusChange(status.value)}
            >
              {status.label}
            </span>
          </li>
        ))}
      </div>

      <UserOrdersTable heading={false} status={selectedStatus} />
    </AccountLayout>
  )
}

export default OrderPage
