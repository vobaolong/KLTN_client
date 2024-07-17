import { useTranslation } from 'react-i18next'

const bgColors = {
  Pending: 'primary-rgba',
  Approved: 'success-rgba',
  Rejected: 'danger-rgba'
}
const colors = {
  Pending: 'primary',
  Approved: 'success',
  Rejected: 'danger'
}

const OrderReturnStatusLabel = ({ status = '', detail = true }) => {
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

export default OrderReturnStatusLabel
