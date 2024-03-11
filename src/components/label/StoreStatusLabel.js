import { useTranslation } from 'react-i18next'

const StoreStatusLabel = ({ isOpen = true, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='d-inline-block position-relative'>
      <span
        className={`badge rounded-1 p-1 ${
          isOpen ? 'bg-success' : 'bg-danger'
        } cus-tooltip`}
      >
        {isOpen ? (
          <span className='px-1'>
            <i className='fas fa-door-open'></i>
            {detail && <span className='ms-1'>{t('shopDetail.open')}</span>}
          </span>
        ) : (
          <span className='px-1'>
            <i className='fas fa-door-closed'></i>
            {detail && <span className='ms-1'>{t('shopDetail.close')}</span>}
          </span>
        )}
      </span>
      {/* <small className='cus-tooltip-msg'>
      {isOpen
        ? 'This store is open, can order in this time.'
        : "This store is closed, can't order in this time"}
    </small> */}
    </span>
  )
}
export default StoreStatusLabel
