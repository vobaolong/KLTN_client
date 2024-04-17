import { useTranslation } from 'react-i18next'

const bgColors = {
  'Not processed': 'warning-rgba',
  Processing: 'orange-rgba',
  Shipped: 'primary-rgba',
  Delivered: 'success-rgba',
  Cancelled: 'danger-rgba'
}
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
      <span
        className={`badge border rounded-1 text-white bg-${bgColors[status]}`}
      >
        {detail && (
          <span className={`text-${colors[status]}`}>
            {t(`orderStatus.${status}`)}
          </span>
        )}
      </span>
    </span>
  )
}

export default OrderStatusLabel
