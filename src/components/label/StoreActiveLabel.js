import { useTranslation } from 'react-i18next'

const StoreActiveLabel = ({ isActive = false, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      {isActive ? (
        <span className='badge bg-success cus-tooltip rounded-1 default'>
          <i className='fa-solid fa-circle-check'></i>
          {detail && <span className='ms-2'>{t('status.active')}</span>}
        </span>
      ) : (
        <span className='badge bg-danger cus-tooltip rounded-1 default'>
          <i className='fa-solid fa-ban'></i>
          {detail && <span className='ms-2'>{t('status.banned')}</span>}
        </span>
      )}
      {isActive ? (
        <small className='cus-tooltip-msg'>{t('storeDetail.active')}</small>
      ) : (
        <small className='cus-tooltip-msg'>{t('storeDetail.banned')}</small>
      )}
    </span>
  )
}
export default StoreActiveLabel
