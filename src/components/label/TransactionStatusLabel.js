import { useTranslation } from 'react-i18next'

const TransactionStatusLabel = ({ isUp = true, detail = true }) => {
  const { t } = useTranslation()

  return (
    <span className='d-inline-block position-relative'>
      <span
        className={`badge border ${
          isUp ? 'bg-success-rgba' : 'bg-danger-rgba'
        } cus-tooltip rounded-1`}
      >
        {isUp ? (
          <span className='text-success'>
            <i className='fa-solid fa-arrow-circle-down'></i>
            {detail && (
              <span className='ms-2 text-success'>{t('userDetail.in')}</span>
            )}
          </span>
        ) : (
          <span className='text-danger'>
            <i className='fa-solid fa-arrow-circle-up'></i>
            {detail && <span className='ms-2'>{t('userDetail.out')}</span>}
          </span>
        )}
      </span>
      {/* <small className='cus-tooltip-msg'>
        {isUp ? 'transferring to wallet' : 'come out from the wallet'}
      </small> */}
    </span>
  )
}

export default TransactionStatusLabel
