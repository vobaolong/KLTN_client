import { useSelector } from 'react-redux'
import SellerLayout from '../../components/layout/SellerLayout'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import SellerReturnTable from '../../components/table/SellerReturnTable'

const ReturnPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)
  const { t } = useTranslation()
  const [selectedStatus, setSelectedStatus] = useState('Pending')

  const orderStatus = [
    { label: t('status.pending'), value: 'Pending' },
    { label: t('status.rejected'), value: 'Rejected' },
    { label: t('status.approved'), value: 'Approved' }
  ]

  const paths = [
    { name: t('breadcrumbs.home'), url: `/seller/${store._id}` },
    { name: t('breadcrumbs.orderReturn'), url: `/seller/return/${store._id}` }
  ]

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }

  return (
    <SellerLayout user={user} store={store} paths={paths}>
      <div className='nav nav-tabs bg-body rounded-top-1 box-shadow mb-2'>
        {orderStatus.map((status) => (
          <li
            className='nav-item flex-grow-1 text-center pointer'
            key={status.value}
          >
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
      <SellerReturnTable
        heading={false}
        storeId={store._id}
        isEditable={selectedStatus === 'Pending'}
        status={selectedStatus}
      />
    </SellerLayout>
  )
}

export default ReturnPage
