import { useTranslation } from 'react-i18next'

const TransactionStatusLabel = ({ isUp = true, detail = true }) => {
  const { t } = useTranslation()

  return (
    <span className='d-inline-block position-relative'>
      <span
        className={`badge ${
          isUp ? 'bg-success' : 'bg-danger'
        } cus-tooltip rounded-1`}
      >
        {isUp ? (
          <span>
            <i className='fa-solid fa-arrow-circle-down'></i>
            {detail && <span className='ms-2'>{t('userDetail.in')}</span>}
          </span>
        ) : (
          <span>
            <i className='fa-solid fa-arrow-circle-up'></i>
            {detail && <span className='ms-2'>{t('userDetail.out')}</span>}
          </span>
        )}
      </span>
      <small className='cus-tooltip-msg'>
        {isUp ? 'transferring to wallet' : 'come out from the wallet'}
      </small>
    </span>
  )
}

export default TransactionStatusLabel
