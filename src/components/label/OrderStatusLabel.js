import { useTranslation } from 'react-i18next'

const colors = {
  'Not processed': 'warning',
  Processing: 'orange',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'danger'
}

const OrderStatusLabel = ({ status = '', detail = true }) => {
  const { t } = useTranslation()

  return (
    <span className='d-inline-block position-relative'>
      <span className={`badge rounded-1 text-white bg-${colors[status]}`}>
        {detail && <span>{t(`orderStatus.${status}`)}</span>}
      </span>
    </span>
  )
}

export default OrderStatusLabel
