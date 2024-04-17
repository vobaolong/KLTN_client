import { useTranslation } from 'react-i18next'

const OrderPaymentLabel = ({ isPaidBefore = false, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      {isPaidBefore ? (
        <span className='badge border rounded-1 bg-primary-rgba'>
          {detail && (
            <span className='text-primary'>
              {t('orderDetail.onlinePayment')}
            </span>
          )}
        </span>
      ) : (
        <span className='badge border rounded-1 bg-danger-rgba'>
          {detail && (
            <span className='text-danger'>{t('orderDetail.cod')}</span>
          )}
        </span>
      )}
    </span>
  )
}

export default OrderPaymentLabel
