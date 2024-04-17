import { useTranslation } from 'react-i18next'

const StoreCommissionLabel = ({ commission = {}, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      <span className='badge border bg-dark-rgba rounded-1 cus-tooltip text-muted'>
        {detail && <span>{commission.name}</span>}
      </span>

      {!detail ? (
        <small className='cus-tooltip-msg'>{commission.name}</small>
      ) : (
        <small className='cus-tooltip-msg'>
          {t('storeDetail.commissions')}: {commission.fee?.$numberDecimal}% /
          {t('order')}
        </small>
      )}
    </span>
  )
}
export default StoreCommissionLabel
